package com.example.Hackathon.service;

import com.example.Hackathon.dto.*;
import com.example.Hackathon.entity.*;
import com.example.Hackathon.enums.*;
import com.example.Hackathon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private IngestionService ingestionService;

    @Autowired
    private SlaService slaService;

    @Autowired
    private RoutingService routingService;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private AiGatewayService aiGatewayService;

    @Transactional
    public ComplaintResponseDTO create(ComplaintCreateDTO dto) {
        // 1. Find or create customer (Customer 360)
        Customer customer = ingestionService.findOrCreateCustomer(dto);

        // 2. Auto-assign severity if not provided (random for now, AI later)
        Severity severity = dto.getSeverity();
        if (severity == null) {
            Severity[] values = Severity.values();
            severity = values[new Random().nextInt(values.length)];
        }

        // 3. Build complaint — channel is always DASHBOARD
        Complaint complaint = Complaint.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .productType(dto.getProductType())
                .issueType(dto.getIssueType())
                .severity(severity)
                .channel(Channel.DASHBOARD)
                .status(ComplaintStatus.OPEN)
                .customer(customer)
                .regulatoryFlag(false)
                .isDuplicate(false)
                .build();

        // 3. Generate ticket number
        complaint.setTicketNumber(ingestionService.generateTicketNumber());

        // 4. Check for duplicates
        if (ingestionService.isDuplicate(customer, dto.getProductType())) {
            complaint.setIsDuplicate(true);
        }

        // 5. Save first to get createdAt via @PrePersist
        complaint = complaintRepository.save(complaint);

        // 6. Calculate SLA deadline
        complaint.setSlaDeadline(slaService.calculateDeadline(complaint));

        // 7. Auto-assign agent
        Complaint finalComplaint = complaint;
        routingService.autoAssign(complaint).ifPresent(agent -> {
            finalComplaint.setAssignedAgent(agent);
            finalComplaint.setStatus(ComplaintStatus.IN_PROGRESS);
        });

        complaint = complaintRepository.save(complaint);

        // 8. Audit log
        auditLogService.log(complaint, "Complaint created", "SYSTEM", null, "OPEN");

        return toResponseDTO(complaint);
    }

    public Page<ComplaintResponseDTO> getAll(ComplaintFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(
                filter.getPage(), filter.getSize(),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        LocalDateTime fromDate = null;
        LocalDateTime toDate = null;
        if (filter.getFromDate() != null && !filter.getFromDate().isBlank()) {
            fromDate = LocalDate.parse(filter.getFromDate()).atStartOfDay();
        }
        if (filter.getToDate() != null && !filter.getToDate().isBlank()) {
            toDate = LocalDate.parse(filter.getToDate()).atTime(23, 59, 59);
        }

        Page<Complaint> page = complaintRepository.findWithFilters(
                filter.getStatus(),
                filter.getProductType(),
                filter.getSeverity(),
                filter.getAgentId(),
                fromDate,
                toDate,
                pageRequest);

        return page.map(this::toResponseDTO);
    }

    public ComplaintResponseDTO getById(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found: " + id));
        return toResponseDTO(complaint);
    }

    public Page<ComplaintResponseDTO> getByCustomer(Long customerId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return complaintRepository.findByCustomerId(customerId, pageRequest).map(this::toResponseDTO);
    }

    public Page<ComplaintResponseDTO> getByAgent(Long agentId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return complaintRepository.findByAssignedAgentId(agentId, pageRequest).map(this::toResponseDTO);
    }

    @Transactional
    public ComplaintResponseDTO updateStatus(Long id, StatusUpdateDTO dto, String updatedBy) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found: " + id));

        String oldStatus = complaint.getStatus().name();
        complaint.setStatus(dto.getStatus());

        if (dto.getStatus() == ComplaintStatus.RESOLVED || dto.getStatus() == ComplaintStatus.CLOSED) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        auditLogService.log(complaint, "Status updated", updatedBy, oldStatus, dto.getStatus().name());

        if (dto.getNote() != null && !dto.getNote().isBlank()) {
            ComplaintComment comment = ComplaintComment.builder()
                    .complaint(complaint)
                    .content(dto.getNote())
                    .authorName("SYSTEM")
                    .authorRole("SYSTEM")
                    .isInternal(true)
                    .build();
            if (complaint.getComments() == null) {
                complaint.setComments(new ArrayList<>());
            }
            complaint.getComments().add(comment);
        }

        complaint = complaintRepository.save(complaint);
        return toResponseDTO(complaint);
    }

    @Transactional
    public ComplaintResponseDTO assignAgent(Long id, Long agentId, String assignedBy) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found: " + id));
        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found: " + agentId));

        String oldAgent = complaint.getAssignedAgent() != null ? complaint.getAssignedAgent().getName() : "none";
        complaint.setAssignedAgent(agent);

        if (complaint.getStatus() == ComplaintStatus.OPEN) {
            complaint.setStatus(ComplaintStatus.IN_PROGRESS);
        }

        auditLogService.log(complaint, "Assigned to " + agent.getName(), assignedBy, oldAgent, agent.getName());

        complaint = complaintRepository.save(complaint);
        return toResponseDTO(complaint);
    }

    @Transactional
    public ComplaintCommentDTO addComment(Long id, CommentCreateDTO dto) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found: " + id));

        ComplaintComment comment = ComplaintComment.builder()
                .complaint(complaint)
                .content(dto.getContent())
                .authorName(dto.getAuthorName())
                .authorRole(dto.getAuthorRole() != null ? dto.getAuthorRole() : "AGENT")
                .isInternal(dto.getIsInternal() != null ? dto.getIsInternal() : false)
                .build();

        if (complaint.getComments() == null) {
            complaint.setComments(new ArrayList<>());
        }
        complaint.getComments().add(comment);
        complaintRepository.save(complaint);

        return toCommentDTO(comment);
    }

    @Transactional
    public ComplaintResponseDTO classify(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found: " + id));

        AiClassificationDTO classification = aiGatewayService.classify(complaint.getDescription());

        complaint.setSentimentLabel(classification.getSentimentLabel());
        complaint.setSentimentScore(classification.getSentimentScore());
        complaint.setRegulatoryFlag(classification.getRegulatoryFlag());
        complaint.setAiSuggestedResponse(classification.getSuggestedResponse());
        complaint.setExtractedEntities(classification.getExtractedEntities());

        auditLogService.log(complaint, "AI classification applied", "SYSTEM", null,
                "Sentiment: " + classification.getSentimentLabel());

        complaint = complaintRepository.save(complaint);
        return toResponseDTO(complaint);
    }

    // =================== Mapping Helpers ===================

    private ComplaintResponseDTO toResponseDTO(Complaint c) {
        SlaStatusDTO slaStatus = null;
        try {
            slaStatus = slaService.getStatus(c);
        } catch (Exception e) {
            // SLA rule may not exist yet
        }

        return ComplaintResponseDTO.builder()
                .id(c.getId())
                .ticketNumber(c.getTicketNumber())
                .title(c.getTitle())
                .description(c.getDescription())
                .productType(c.getProductType())
                .issueType(c.getIssueType())
                .status(c.getStatus())
                .severity(c.getSeverity())
                .channel(c.getChannel())
                .regulatoryFlag(c.getRegulatoryFlag())
                .isDuplicate(c.getIsDuplicate())
                .duplicateOfId(c.getDuplicateOfId())
                .sentimentLabel(c.getSentimentLabel())
                .sentimentScore(c.getSentimentScore())
                .aiSuggestedResponse(c.getAiSuggestedResponse())
                .createdAt(c.getCreatedAt())
                .slaDeadline(c.getSlaDeadline())
                .resolvedAt(c.getResolvedAt())
                .customer(c.getCustomer() != null ? toCustomerDTO(c.getCustomer()) : null)
                .assignedAgent(c.getAssignedAgent() != null ? toAgentDTO(c.getAssignedAgent()) : null)
                .slaStatus(slaStatus)
                .comments(c.getComments() != null
                        ? c.getComments().stream().map(this::toCommentDTO).collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }

    private CustomerSummaryDTO toCustomerDTO(Customer c) {
        return CustomerSummaryDTO.builder()
                .id(c.getId())
                .customerNumber(c.getCustomerNumber())
                .fullName(c.getFullName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .accountNumber(c.getAccountNumber())
                .build();
    }

    private AgentSummaryDTO toAgentDTO(Agent a) {
        return AgentSummaryDTO.builder()
                .id(a.getId())
                .name(a.getName())
                .email(a.getEmail())
                .role(a.getRole())
                .build();
    }

    private ComplaintCommentDTO toCommentDTO(ComplaintComment cc) {
        return ComplaintCommentDTO.builder()
                .id(cc.getId())
                .content(cc.getContent())
                .authorName(cc.getAuthorName())
                .authorRole(cc.getAuthorRole())
                .isInternal(cc.getIsInternal())
                .createdAt(cc.getCreatedAt())
                .build();
    }
}

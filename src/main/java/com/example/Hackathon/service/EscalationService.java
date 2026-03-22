package com.example.Hackathon.service;

import com.example.Hackathon.dto.SlaStatusDTO;
import com.example.Hackathon.entity.Complaint;
import com.example.Hackathon.entity.EscalationRule;
import com.example.Hackathon.enums.ComplaintStatus;
import com.example.Hackathon.repository.ComplaintRepository;
import com.example.Hackathon.repository.EscalationRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EscalationService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private EscalationRuleRepository escalationRuleRepository;

    @Autowired
    private SlaService slaService;

    @Autowired
    private AuditLogService auditLogService;

    @Transactional
    public void checkAndEscalate(Complaint complaint) {
        if (complaint.getStatus() == ComplaintStatus.RESOLVED
                || complaint.getStatus() == ComplaintStatus.CLOSED) {
            return;
        }

        SlaStatusDTO sla = slaService.getStatus(complaint);
        String severity = complaint.getSeverity() != null ? complaint.getSeverity().name() : "P4";
        List<EscalationRule> rules = escalationRuleRepository.findBySeverity(severity);

        for (EscalationRule rule : rules) {
            if (sla.getPercentElapsed() != null
                    && sla.getPercentElapsed() >= rule.getTriggerAtPercent()
                    && complaint.getStatus() != ComplaintStatus.ESCALATED) {

                complaint.setStatus(ComplaintStatus.ESCALATED);
                complaintRepository.save(complaint);

                auditLogService.log(complaint,
                        "Auto-escalated to " + rule.getEscalateTo() +
                                " (SLA at " + String.format("%.0f", sla.getPercentElapsed()) + "%)",
                        "SYSTEM", "OPEN", "ESCALATED");
                break;
            }
        }
    }

    @Transactional
    public void checkAllOpen() {
        List<Complaint> openComplaints = complaintRepository.findByStatusNot(ComplaintStatus.RESOLVED);
        for (Complaint complaint : openComplaints) {
            if (complaint.getStatus() != ComplaintStatus.CLOSED) {
                checkAndEscalate(complaint);
            }
        }
    }
}

package com.example.Hackathon.dto;

import com.example.Hackathon.enums.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponseDTO {

    private Long id;
    private String ticketNumber;
    private String title;
    private String description;
    private ProductType productType;
    private IssueType issueType;
    private ComplaintStatus status;
    private Severity severity;
    private Channel channel;
    private Boolean regulatoryFlag;
    private Boolean isDuplicate;
    private Long duplicateOfId;

    private String sentimentLabel;
    private Double sentimentScore;
    private String aiSuggestedResponse;

    private LocalDateTime createdAt;
    private LocalDateTime slaDeadline;
    private LocalDateTime resolvedAt;

    private CustomerSummaryDTO customer;
    private AgentSummaryDTO assignedAgent;
    private SlaStatusDTO slaStatus;
    private List<ComplaintCommentDTO> comments;
}

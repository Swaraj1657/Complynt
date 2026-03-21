package com.example.Hackathon.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiClassificationDTO {
    private String productType;
    private String issueType;
    private String severity;
    private String sentimentLabel;
    private Double sentimentScore;
    private Boolean regulatoryFlag;
    private String suggestedResponse;
    private String extractedEntities;
}

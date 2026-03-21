package com.example.Hackathon.service;

import com.example.Hackathon.dto.AiClassificationDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AiGatewayService {

    private final RestTemplate restTemplate;

    @Value("${app.ai-service-url}")
    private String aiUrl;

    public AiGatewayService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public AiClassificationDTO classify(String description) {
        try {
            var response = restTemplate.postForObject(
                    aiUrl + "/classify",
                    Map.of("description", description),
                    AiClassificationDTO.class
            );
            return response != null ? response : getStubResponse();
        } catch (Exception e) {
            // Python service not running — return stub
            return getStubResponse();
        }
    }

    private AiClassificationDTO getStubResponse() {
        return AiClassificationDTO.builder()
                .productType("OTHER")
                .issueType("GENERAL_INQUIRY")
                .severity("P3")
                .sentimentLabel("NEUTRAL")
                .sentimentScore(0.5)
                .regulatoryFlag(false)
                .suggestedResponse("Thank you for reaching out. We have received your complaint " +
                        "and our team is reviewing it. We will get back to you within " +
                        "the specified SLA timeline.")
                .extractedEntities("{}")
                .build();
    }
}

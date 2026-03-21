package com.example.Hackathon.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerSummaryDTO {
    private Long id;
    private String customerNumber;
    private String fullName;
    private String email;
    private String phone;
    private String accountNumber;
}

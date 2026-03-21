package com.example.Hackathon.dto;

import com.example.Hackathon.enums.ComplaintStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusUpdateDTO {
    @NotNull
    private ComplaintStatus status;
    private String note;
}

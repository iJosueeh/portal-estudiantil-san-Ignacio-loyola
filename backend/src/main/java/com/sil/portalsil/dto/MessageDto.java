package com.sil.portalsil.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private Long id;
    private Long senderId;    // Reference to Sender User's ID
    private Long recipientId; // Reference to Recipient User's ID
    private String subject;
    private String body;
    private LocalDateTime sentDate;
    private Boolean isRead;
}

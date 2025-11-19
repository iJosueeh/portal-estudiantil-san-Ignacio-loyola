package com.sil.portalsil.dto;

import com.sil.portalsil.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private Notification.NotificationType type;
    private Boolean isRead;
    private LocalDateTime readAt;
    private LocalDateTime createdAt;
    private String relatedEntityType;
    private Long relatedEntityId;
    private Notification.NotificationPriority priority;
}

package com.sil.portalsil.dto;

import com.sil.portalsil.enums.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime date;
    private Long authorId; // Reference to User's ID
    private Role targetRole;
    private Long courseId; // Optional reference to Course's ID
}

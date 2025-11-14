package com.sil.portalsil.dto;

import com.sil.portalsil.entity.FileAttachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileAttachmentDto {
    
    private Long id;
    private String fileName;
    private String originalFileName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private FileAttachment.EntityType entityType;
    private Long entityId;
    private Long uploadedById;
    private String uploadedByName;
    private LocalDateTime uploadedAt;
    private String description;
}

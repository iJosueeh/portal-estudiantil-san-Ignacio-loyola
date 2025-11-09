package com.sil.portalsil.dto;

import com.sil.portalsil.entity.TaskSubmission;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskSubmissionDto {
    private Long id;
    private Long taskId;    // Reference to Task's ID
    private Long studentId; // Reference to Student's ID
    private LocalDateTime submissionDate;
    private String submissionContent;
    private TaskSubmission.SubmissionStatus status;
    private Integer grade;
    private String comments;
}

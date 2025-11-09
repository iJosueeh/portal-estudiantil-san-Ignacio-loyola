package com.sil.portalsil.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "task_submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private LocalDateTime submissionDate;

    @Column(columnDefinition = "TEXT")
    private String submissionContent; // e.g., text, link to file

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubmissionStatus status; // e.g., PENDING_REVIEW, REVIEWED, LATE_SUBMISSION

    private Integer grade; // Nullable until reviewed

    @Column(columnDefinition = "TEXT")
    private String comments;

    public enum SubmissionStatus {
        PENDING_REVIEW,
        REVIEWED,
        LATE_SUBMISSION,
        DRAFT // If students can save drafts
    }
}

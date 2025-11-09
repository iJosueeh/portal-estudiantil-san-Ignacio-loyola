package com.sil.portalsil.dto;

import com.sil.portalsil.entity.Enrollment;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private Long id;
    private Long studentId; // Reference to Student's ID
    private Long courseId;  // Reference to Course's ID
    private LocalDate enrollmentDate;
    private Enrollment.EnrollmentStatus status;
}

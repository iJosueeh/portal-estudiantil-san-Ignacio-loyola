package com.sil.portalsil.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeDto {
    private Long id;
    private String evaluationName;
    private Double gradeValue;
    private Double weight;
    private String period;
    private Long studentId; // Reference to Student's ID
    private Long courseId;  // Reference to Course's ID
    private Long teacherId; // Reference to Teacher's ID
}

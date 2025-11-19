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
    private Long studentId;
    private Long courseId;
    private Long teacherId;
}

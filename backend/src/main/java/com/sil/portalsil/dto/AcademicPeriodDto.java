package com.sil.portalsil.dto;

import com.sil.portalsil.entity.AcademicPeriod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicPeriodDto {
    
    private Long id;
    private String name;
    private String description;
    private AcademicPeriod.PeriodType periodType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive;
    private Boolean isCurrent;
    private Integer academicYear;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

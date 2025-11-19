package com.sil.portalsil.dto;

import com.sil.portalsil.entity.Attendance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDto {
    
    private Long id;
    private Long studentId;
    private String studentName;
    private Long courseId;
    private String courseName;
    private LocalDate date;
    private Attendance.AttendanceStatus status;
    private String notes;
    private Long recordedById;
    private String recordedByName;
    private LocalDateTime createdAt;
}

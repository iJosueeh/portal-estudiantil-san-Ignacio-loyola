package com.sil.portalsil.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private Long id;
    private Long userId; // Reference to UserDto's ID
    private String studentCode;
    private String grade;
    private String section;
    private String profilePictureUrl;
    private LocalDate birthDate;
}

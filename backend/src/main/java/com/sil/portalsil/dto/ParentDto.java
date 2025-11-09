package com.sil.portalsil.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentDto {
    private Long id;
    private Long userId; // Reference to UserDto's ID
    private String contactNumber;
}

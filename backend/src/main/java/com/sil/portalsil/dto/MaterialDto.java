package com.sil.portalsil.dto;

import com.sil.portalsil.entity.Material;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialDto {
    private Long id;
    private String name;
    private String description;
    private Material.MaterialType type;
    private String url;
    private LocalDate uploadDate;
    private Integer week;
    private Long courseId; // Reference to Course's ID
}

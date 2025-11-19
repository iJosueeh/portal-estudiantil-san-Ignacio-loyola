package com.sil.portalsil.dto;

import com.sil.portalsil.entity.Event;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate fullDate;
    private LocalTime time;
    private String location;
    private String color;
    private Event.EventType type;
    private Long courseId;
}

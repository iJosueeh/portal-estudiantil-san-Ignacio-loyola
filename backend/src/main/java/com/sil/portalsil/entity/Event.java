package com.sil.portalsil.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate fullDate;

    private LocalTime time; // Optional time for the event

    private String location;

    private String color; // e.g., "#FF5733" for display in calendar

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType type; // CLASS, MEETING, EXAM, HOLIDAY, etc.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id") // Optional: can be null if not course-specific
    private Course course;

    public enum EventType {
        CLASS,
        MEETING,
        EXAM,
        HOLIDAY,
        OTHER
    }
}

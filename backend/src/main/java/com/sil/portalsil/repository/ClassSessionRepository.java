package com.sil.portalsil.repository;

import com.sil.portalsil.entity.ClassSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface ClassSessionRepository extends JpaRepository<ClassSession, Long> {
    
    List<ClassSession> findByCourseId(Long courseId);
    
    List<ClassSession> findByCourseIdAndIsActive(Long courseId, Boolean isActive);
    
    List<ClassSession> findByDayOfWeek(DayOfWeek dayOfWeek);
    
    List<ClassSession> findByRoom(String room);
}

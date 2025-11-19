package com.sil.portalsil.repository;

import com.sil.portalsil.entity.Attendance;
import com.sil.portalsil.entity.Student;
import com.sil.portalsil.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    List<Attendance> findByStudentId(Long studentId);
    
    List<Attendance> findByCourseId(Long courseId);
    
    List<Attendance> findByStudentAndCourse(Student student, Course course);
    
    List<Attendance> findByDate(LocalDate date);
    
    List<Attendance> findByStudentIdAndDateBetween(Long studentId, LocalDate startDate, LocalDate endDate);
    
    List<Attendance> findByCourseIdAndDate(Long courseId, LocalDate date);
}

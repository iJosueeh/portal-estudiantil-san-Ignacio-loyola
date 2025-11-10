package com.sil.portalsil.repository;

import com.sil.portalsil.entity.Teacher;
import com.sil.portalsil.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUser(User user);
    Optional<Teacher> findByEmployeeId(String employeeId);
}
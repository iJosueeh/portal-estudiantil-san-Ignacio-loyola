package com.sil.portalsil.repository;

import com.sil.portalsil.entity.Student;
import com.sil.portalsil.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser(User user);
    Optional<Student> findByStudentCode(String studentCode);
}
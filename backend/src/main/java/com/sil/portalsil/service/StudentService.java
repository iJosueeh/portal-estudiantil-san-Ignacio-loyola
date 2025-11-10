package com.sil.portalsil.service;

import com.sil.portalsil.dto.StudentDto;
import com.sil.portalsil.entity.Student;
import com.sil.portalsil.entity.User;
import com.sil.portalsil.repository.StudentRepository;
import com.sil.portalsil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    private StudentDto convertToDto(Student student) {
        if (student == null) {
            return null;
        }
        return new StudentDto(
                student.getId(),
                student.getUser() != null ? student.getUser().getId() : null,
                student.getStudentCode(),
                student.getGrade(),
                student.getSection(),
                student.getProfilePictureUrl(),
                student.getBirthDate()
        );
    }

    private Student convertToEntity(StudentDto studentDto) {
        if (studentDto == null) {
            return null;
        }
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setStudentCode(studentDto.getStudentCode());
        student.setGrade(studentDto.getGrade());
        student.setSection(studentDto.getSection());
        student.setProfilePictureUrl(studentDto.getProfilePictureUrl());
        student.setBirthDate(studentDto.getBirthDate());

        if (studentDto.getUserId() != null) {
            userRepository.findById(studentDto.getUserId()).ifPresent(student::setUser);
        }
        return student;
    }

    @Transactional
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = convertToEntity(studentDto);
        Student savedStudent = studentRepository.save(student);
        return convertToDto(savedStudent);
    }

    @Transactional(readOnly = true)
    public Optional<StudentDto> getStudentById(Long id) {
        return studentRepository.findById(id).map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<StudentDto> updateStudent(Long id, StudentDto studentDto) {
        return studentRepository.findById(id).map(existingStudent -> {
            existingStudent.setStudentCode(studentDto.getStudentCode());
            existingStudent.setGrade(studentDto.getGrade());
            existingStudent.setSection(studentDto.getSection());
            existingStudent.setProfilePictureUrl(studentDto.getProfilePictureUrl());
            existingStudent.setBirthDate(studentDto.getBirthDate());

            if (studentDto.getUserId() != null) {
                userRepository.findById(studentDto.getUserId()).ifPresent(existingStudent::setUser);
            }
            return convertToDto(studentRepository.save(existingStudent));
        });
    }

    @Transactional
    public boolean deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
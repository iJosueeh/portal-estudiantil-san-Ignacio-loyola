package com.sil.portalsil.service;

import com.sil.portalsil.dto.TeacherDto;
import com.sil.portalsil.entity.Teacher;
import com.sil.portalsil.entity.User;
import com.sil.portalsil.exception.ResourceNotFoundException;
import com.sil.portalsil.repository.TeacherRepository;
import com.sil.portalsil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, UserRepository userRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    public TeacherDto convertToDto(Teacher teacher) {
        if (teacher == null) {
            return null;
        }
        return new TeacherDto(
                teacher.getId(),
                teacher.getUser() != null ? teacher.getUser().getId() : null,
                teacher.getEmployeeId(),
                teacher.getDepartment(),
                teacher.getProfilePictureUrl()
        );
    }

    public Teacher convertToEntity(TeacherDto teacherDto) {
        if (teacherDto == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(teacherDto.getId());
        teacher.setEmployeeId(teacherDto.getEmployeeId());
        teacher.setDepartment(teacherDto.getDepartment());
        teacher.setProfilePictureUrl(teacherDto.getProfilePictureUrl());
        if (teacherDto.getUserId() != null) {
            User user = userRepository.findById(teacherDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + teacherDto.getUserId()));
            teacher.setUser(user);
        }
        return teacher;
    }

    @Transactional
    public TeacherDto createTeacher(TeacherDto teacherDto) {
        // Ensure the user exists and is not already associated with a teacher
        if (teacherDto.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required to create a teacher.");
        }
        User user = userRepository.findById(teacherDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + teacherDto.getUserId()));

        // Check if a teacher already exists for this user
        if (teacherRepository.findByUser(user).isPresent()) {
            throw new IllegalArgumentException("A teacher record already exists for user ID: " + teacherDto.getUserId());
        }
        // Check if employeeId is unique
        if (teacherRepository.findByEmployeeId(teacherDto.getEmployeeId()).isPresent()) {
            throw new IllegalArgumentException("Teacher with employee ID " + teacherDto.getEmployeeId() + " already exists.");
        }

        Teacher teacher = convertToEntity(teacherDto);
        teacher.setUser(user); // Link the user
        Teacher savedTeacher = teacherRepository.save(teacher);
        return convertToDto(savedTeacher);
    }

    @Transactional(readOnly = true)
    public Optional<TeacherDto> getTeacherById(Long id) {
        return teacherRepository.findById(id).map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public List<TeacherDto> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<TeacherDto> updateTeacher(Long id, TeacherDto teacherDto) {
        return teacherRepository.findById(id)
                .map(existingTeacher -> {
                    // Update fields
                    existingTeacher.setDepartment(teacherDto.getDepartment());
                    existingTeacher.setProfilePictureUrl(teacherDto.getProfilePictureUrl());

                    // If employeeId is provided and different, check uniqueness
                    if (teacherDto.getEmployeeId() != null && !teacherDto.getEmployeeId().equals(existingTeacher.getEmployeeId())) {
                        if (teacherRepository.findByEmployeeId(teacherDto.getEmployeeId()).isPresent()) {
                            throw new IllegalArgumentException("Teacher with employee ID " + teacherDto.getEmployeeId() + " already exists.");
                        }
                        existingTeacher.setEmployeeId(teacherDto.getEmployeeId());
                    }

                    // If userId is provided and different, update the associated user
                    if (teacherDto.getUserId() != null && !teacherDto.getUserId().equals(existingTeacher.getUser().getId())) {
                        User newUser = userRepository.findById(teacherDto.getUserId())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + teacherDto.getUserId()));
                        existingTeacher.setUser(newUser);
                    }

                    Teacher updatedTeacher = teacherRepository.save(existingTeacher);
                    return convertToDto(updatedTeacher);
                });
    }

    @Transactional
    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new ResourceNotFoundException("Teacher not found with ID: " + id);
        }
        teacherRepository.deleteById(id);
    }
}

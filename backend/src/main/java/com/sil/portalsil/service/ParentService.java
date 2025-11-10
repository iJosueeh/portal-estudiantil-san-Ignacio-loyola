package com.sil.portalsil.service;

import com.sil.portalsil.dto.ParentDto;
import com.sil.portalsil.entity.Parent;
import com.sil.portalsil.entity.User;
import com.sil.portalsil.exception.ResourceNotFoundException; // Assuming a generic ResourceNotFoundException
import com.sil.portalsil.repository.ParentRepository;
import com.sil.portalsil.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParentService {

    private final ParentRepository parentRepository;
    private final UserRepository userRepository;

    @Autowired
    public ParentService(ParentRepository parentRepository, UserRepository userRepository) {
        this.parentRepository = parentRepository;
        this.userRepository = userRepository;
    }

    public ParentDto convertToDto(Parent parent) {
        if (parent == null) {
            return null;
        }
        return new ParentDto(
                parent.getId(),
                parent.getUser() != null ? parent.getUser().getId() : null,
                parent.getContactNumber()
        );
    }

    public Parent convertToEntity(ParentDto parentDto) {
        if (parentDto == null) {
            return null;
        }
        Parent parent = new Parent();
        parent.setId(parentDto.getId());
        parent.setContactNumber(parentDto.getContactNumber());
        if (parentDto.getUserId() != null) {
            User user = userRepository.findById(parentDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + parentDto.getUserId()));
            parent.setUser(user);
        }
        return parent;
    }

    @Transactional
    public ParentDto createParent(ParentDto parentDto) {
        // Ensure the user exists and is not already associated with a parent
        if (parentDto.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required to create a parent.");
        }
        User user = userRepository.findById(parentDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + parentDto.getUserId()));

        // Check if a parent already exists for this user
        // This requires a findByUser method in ParentRepository
        if (parentRepository.findByUser(user).isPresent()) {
            throw new IllegalArgumentException("A parent record already exists for user ID: " + parentDto.getUserId());
        }

        Parent parent = convertToEntity(parentDto);
        parent.setUser(user); // Link the user
        Parent savedParent = parentRepository.save(parent);
        return convertToDto(savedParent);
    }

    @Transactional(readOnly = true)
    public Optional<ParentDto> getParentById(Long id) {
        return parentRepository.findById(id).map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public List<ParentDto> getAllParents() {
        return parentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<ParentDto> updateParent(Long id, ParentDto parentDto) {
        return parentRepository.findById(id)
                .map(existingParent -> {
                    existingParent.setContactNumber(parentDto.getContactNumber());
                    // If userId is provided and different, update the associated user
                    if (parentDto.getUserId() != null && !parentDto.getUserId().equals(existingParent.getUser().getId())) {
                        User newUser = userRepository.findById(parentDto.getUserId())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + parentDto.getUserId()));
                        existingParent.setUser(newUser);
                    }
                    Parent updatedParent = parentRepository.save(existingParent);
                    return convertToDto(updatedParent);
                });
    }

    @Transactional
    public void deleteParent(Long id) {
        if (!parentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Parent not found with ID: " + id);
        }
        parentRepository.deleteById(id);
    }
}

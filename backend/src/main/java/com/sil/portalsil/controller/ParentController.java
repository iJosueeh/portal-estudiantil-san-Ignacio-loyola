package com.sil.portalsil.controller;

import com.sil.portalsil.dto.ParentDto;
import com.sil.portalsil.exception.ResourceNotFoundException;
import com.sil.portalsil.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
public class ParentController {

    private final ParentService parentService;

    @Autowired
    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping
    public ResponseEntity<ParentDto> createParent(@RequestBody ParentDto parentDto) {
        try {
            ParentDto createdParent = parentService.createParent(parentDto);
            return new ResponseEntity<>(createdParent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentDto> getParentById(@PathVariable Long id) {
        return parentService.getParentById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with ID: " + id));
    }

    @GetMapping
    public ResponseEntity<List<ParentDto>> getAllParents() {
        List<ParentDto> parents = parentService.getAllParents();
        return ResponseEntity.ok(parents);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParentDto> updateParent(@PathVariable Long id, @RequestBody ParentDto parentDto) {
        return parentService.updateParent(id, parentDto)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with ID: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParent(@PathVariable Long id) {
        try {
            parentService.deleteParent(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

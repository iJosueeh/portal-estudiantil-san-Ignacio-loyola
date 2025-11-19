package com.sil.portalsil.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sil.portalsil.config.SecurityConfig;
import com.sil.portalsil.dto.UserDto;
import com.sil.portalsil.enums.Role;
import com.sil.portalsil.exception.UserNotFoundException;
import com.sil.portalsil.service.MyUserDetailsService;
import com.sil.portalsil.service.UserService;
import com.sil.portalsil.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class) // Import the main SecurityConfig
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private MyUserDetailsService myUserDetailsService;

    @MockBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDto createUserDto() {
        return new UserDto(
                1L,
                "test@example.com",
                null, // Password is not exposed in DTOs for read operations
                "Test",
                "User",
                Role.STUDENT,
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testCreateUser() throws Exception {
        UserDto userDto = createUserDto();
        when(userService.createUser(any(UserDto.class))).thenReturn(userDto);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.username").value("test@example.com"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testCreateUser_UsernameExists() throws Exception {
        UserDto userDto = createUserDto();
        when(userService.createUser(any(UserDto.class))).thenThrow(new IllegalArgumentException("Username already exists"));

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void testGetUserById() throws Exception {
        UserDto userDto = createUserDto();
        when(userService.getUserById(1L)).thenReturn(userDto);

        mockMvc.perform(get("/api/users/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.username").value("test@example.com"));
    }

    @Test
    @WithMockUser
    void testGetUserById_NotFound() throws Exception {
        when(userService.getUserById(1L)).thenThrow(new UserNotFoundException("User not found"));

        mockMvc.perform(get("/api/users/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testGetAllUsers() throws Exception {
        List<UserDto> users = Arrays.asList(
            createUserDto(),
            new UserDto(2L, "test2@example.com", null, "Test2", "User2", Role.TEACHER, true, LocalDateTime.now(), LocalDateTime.now())
        );
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username", is("test@example.com")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdateUser() throws Exception {
        UserDto updatedUserDto = new UserDto(
                1L,
                "updated@example.com",
                null, // Password is not exposed in DTOs for read operations
                "Updated",
                "User",
                Role.ADMIN,
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        when(userService.updateUser(eq(1L), any(UserDto.class)))
            .thenReturn(Optional.of(updatedUserDto));
    
        mockMvc.perform(put("/api/users/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.username").value("updated@example.com"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdateUser_NotFound() throws Exception {
        UserDto userDto = createUserDto();
        when(userService.updateUser(eq(1L), any(UserDto.class)))
            .thenReturn(Optional.empty());

        mockMvc.perform(put("/api/users/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testDeleteUser() throws Exception {
        doNothing().when(userService).deleteUser(1L);

        mockMvc.perform(delete("/api/users/{id}", 1L))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testDeleteUser_NotFound() throws Exception {
        doThrow(new UserNotFoundException("User not found")).when(userService).deleteUser(1L);

        mockMvc.perform(delete("/api/users/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdatePassword() throws Exception {
        doNothing().when(userService).updatePassword(eq(1L), any(String.class));

        mockMvc.perform(put("/api/users/{id}/password", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("\"newSecurePassword\""))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdatePassword_NotFound() throws Exception {
        doThrow(new UserNotFoundException("User not found")).when(userService).updatePassword(eq(1L), any(String.class));

        mockMvc.perform(put("/api/users/{id}/password", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("\"newSecurePassword\""))
                .andExpect(status().isNotFound());
    }
}

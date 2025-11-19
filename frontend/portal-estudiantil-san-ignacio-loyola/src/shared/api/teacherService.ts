import axios from 'axios';
import type { TeacherDto, TeacherCreationDto, TeacherUpdateDto } from '../types/teacher.types';

const API_URL = 'http://localhost:8080/api';

const teacherService = {
    getAllTeachers: async (): Promise<TeacherDto[]> => {
        const response = await axios.get(`${API_URL}/teachers`);
        return response.data;
    },

    getTeacherById: async (id: number): Promise<TeacherDto> => {
        const response = await axios.get(`${API_URL}/teachers/${id}`);
        return response.data;
    },

    createTeacher: async (teacher: TeacherCreationDto): Promise<TeacherDto> => {
        const response = await axios.post(`${API_URL}/teachers`, teacher);
        return response.data;
    },

    updateTeacher: async (id: number, teacher: TeacherUpdateDto): Promise<TeacherDto> => {
        const response = await axios.put(`${API_URL}/teachers/${id}`, teacher);
        return response.data;
    },

    deleteTeacher: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/teachers/${id}`);
    }
};

export default teacherService;
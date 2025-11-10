import axios from 'axios';
import type { ParentDto, ParentCreationDto, ParentUpdateDto } from '../types/parent.types';

const API_URL = 'http://localhost:8080/api';

const parentService = {
    getAllParents: async (): Promise<ParentDto[]> => {
        const response = await axios.get(`${API_URL}/parents`);
        return response.data;
    },

    getParentById: async (id: number): Promise<ParentDto> => {
        const response = await axios.get(`${API_URL}/parents/${id}`);
        return response.data;
    },

    createParent: async (parent: ParentCreationDto): Promise<ParentDto> => {
        const response = await axios.post(`${API_URL}/parents`, parent);
        return response.data;
    },

    updateParent: async (id: number, parent: ParentUpdateDto): Promise<ParentDto> => {
        const response = await axios.put(`${API_URL}/parents/${id}`, parent);
        return response.data;
    },

    deleteParent: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/parents/${id}`);
    }
};

export default parentService;
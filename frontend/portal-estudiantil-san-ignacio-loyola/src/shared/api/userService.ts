import axios from 'axios';
import type { UserDto, UserCreationDto, UserUpdateDto } from '../types/user.types';

const API_URL = 'http://localhost:8080/api';

const userService = {
    /**
     * Fetches all users from the API.
     * @returns A promise that resolves to an array of UserDto.
     */
    getAllUsers: async (): Promise<UserDto[]> => {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    },

    /**
     * Fetches a single user by their ID.
     * @param id The ID of the user to fetch.
     * @returns A promise that resolves to a UserDto.
     */
    getUserById: async (id: number): Promise<UserDto> => {
        const response = await axios.get(`${API_URL}/users/${id}`);
        return response.data;
    },

    /**
     * Creates a new user.
     * @param user The UserCreationDto object containing user details.
     * @returns A promise that resolves to the created UserDto.
     */
    createUser: async (user: UserCreationDto): Promise<UserDto> => {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    },

    /**
     * Updates an existing user.
     * @param id The ID of the user to update.
     * @param user The UserUpdateDto object containing updated user details.
     * @returns A promise that resolves to the updated UserDto.
     */
    updateUser: async (id: number, user: UserUpdateDto): Promise<UserDto> => {
        const response = await axios.put(`${API_URL}/users/${id}`, user);
        return response.data;
    },

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @returns A promise that resolves when the user is successfully deleted.
     */
    deleteUser: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/users/${id}`);
    },

    /**
     * Updates the password for a specific user.
     * @param id The ID of the user whose password is to be updated.
     * @param newPassword The new password string.
     * @returns A promise that resolves when the password is successfully updated.
     */
    updatePassword: async (id: number, newPassword: string): Promise<void> => {
        await axios.put(`${API_URL}/users/${id}/password`, newPassword, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }
};

export default userService;
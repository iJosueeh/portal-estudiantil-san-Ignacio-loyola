export type UserRole = 'ADMIN' | 'PARENT' | 'STUDENT' | 'TEACHER';

export interface UserDto {
    id?: number; 
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserCreationDto extends Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> {
    password?: string;
    isActive?: boolean; 
}

export type UserUpdateDto = Partial<Omit<UserDto, 'createdAt' | 'updatedAt'>>
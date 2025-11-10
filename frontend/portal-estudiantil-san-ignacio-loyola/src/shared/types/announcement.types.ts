import type { UserDto } from "./user.types";

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: UserDto;
    createdAt: string;
    audience: 'all' | 'students' | 'admins' | 'teachers';
}
import type { User } from "./user.types";

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
    audience: 'all' | 'students' | 'admins' | 'teachers';
}
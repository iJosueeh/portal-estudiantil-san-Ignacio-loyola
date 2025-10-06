export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'student' | 'teacher';
    avatarUrl?: string
}
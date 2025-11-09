import { useNavigate } from 'react-router-dom';

// Mock authentication functions
export const login = (username: string, password: string, role: string): boolean => {
  // In a real app, this would involve API calls and token validation
  if (username === 'estudiante@sanignacio.edu.pe' && password === 'password' && role === 'student') {
    localStorage.setItem('authToken', 'mock-student-token');
    localStorage.setItem('userRole', 'student');
    return true;
  }
  if (username === 'padre@sanignacio.edu.pe' && password === 'password' && role === 'parent') {
    localStorage.setItem('authToken', 'mock-parent-token');
    localStorage.setItem('userRole', 'parent');
    return true;
  }
  if (username === 'docente@sanignacio.edu.pe' && password === 'password' && role === 'teacher') {
    localStorage.setItem('authToken', 'mock-teacher-token');
    localStorage.setItem('userRole', 'teacher');
    return true;
  }
  if (username === 'admin@sanignacio.edu.pe' && password === 'password' && role === 'admin') {
    localStorage.setItem('authToken', 'mock-admin-token');
    localStorage.setItem('userRole', 'admin');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  // The component calling logout should handle navigation, e.g., useNavigate('/login')
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

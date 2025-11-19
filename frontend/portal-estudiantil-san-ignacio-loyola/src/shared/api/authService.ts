import { api } from "./api";

interface AuthResponse {
    jwt: string;
    userId: number;
    username: string;
    role: string;
}

const TOKEN_KEY = "jwt_token";
const USER_ID_KEY = "user_id";
const USERNAME_KEY = "username";
const USER_ROLE_KEY = "user_role";

export const authService = {
    async login(username: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>("/api/auth/login", { username, password });
            const { jwt, userId, username: user, role } = response.data;

            localStorage.setItem(TOKEN_KEY, jwt);
            localStorage.setItem(USER_ID_KEY, userId.toString());
            localStorage.setItem(USERNAME_KEY, user);
            localStorage.setItem(USER_ROLE_KEY, role);

            return response.data;
        } catch (error) {
            throw new Error("Credenciales inválidas");
        }
    },

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(USER_ROLE_KEY);
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUserId(): number | null {
        const userId = localStorage.getItem(USER_ID_KEY);
        return userId ? parseInt(userId, 10) : null;
    },

    getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    },

    getUserRole(): string | null {
        return localStorage.getItem(USER_ROLE_KEY);
    },

    // Checks if the user has any of the required roles
    hasRole(requiredRoles: string[]): boolean {
        const userRole = authService.getUserRole();
        if (!userRole) {
            return false;
        }
        return requiredRoles.includes(userRole);
    },
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../api/userService';
import type { UserDto, UserCreationDto, UserUpdateDto } from '../types/user.types';

const USER_QUERY_KEY = 'users';

interface UseUsersResult {
    users: UserDto[] | undefined;
    user: UserDto | undefined;
    isLoadingUsers: boolean;
    isErrorUsers: boolean;
    usersError: Error | null;
    isLoadingUser: boolean;
    isErrorUser: boolean;
    userError: Error | null;
    createUserMutation: ReturnType<typeof useMutation<UserDto, Error, UserCreationDto>>;
    updateUserMutation: ReturnType<typeof useMutation<UserDto, Error, { id: number; user: UserUpdateDto }>>;
    deleteUserMutation: ReturnType<typeof useMutation<void, Error, number>>;
    updateUserPasswordMutation: ReturnType<typeof useMutation<void, Error, { id: number; newPassword: string }>>;
}

const useUsers = (userId?: number): UseUsersResult => {
    const queryClient = useQueryClient();

    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers,
        error: usersError,
    } = useQuery<UserDto[], Error>({
        queryKey: [USER_QUERY_KEY],
        queryFn: userService.getAllUsers,
    });

    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isErrorUser,
        error: userError,
    } = useQuery<UserDto, Error>({
        queryKey: [USER_QUERY_KEY, userId],
        queryFn: () => userId ? userService.getUserById(userId) : Promise.reject(new Error("User ID is required")),
        enabled: !!userId,
    });

    const createUserMutation = useMutation<UserDto, Error, UserCreationDto>({
        mutationFn: userService.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
        },
    });

    const updateUserMutation = useMutation<UserDto, Error, { id: number; user: UserUpdateDto }>({
        mutationFn: ({ id, user }) => userService.updateUser(id, user),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY, variables.id] });
            queryClient.setQueryData([USER_QUERY_KEY, variables.id], data);
        },
    });

    const deleteUserMutation = useMutation<void, Error, number>({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
        },
    });

    const updateUserPasswordMutation = useMutation<void, Error, { id: number; newPassword: string }>({
        mutationFn: ({ id, newPassword }) => userService.updatePassword(id, newPassword),
    });

    return {
        users,
        user,
        isLoadingUsers,
        isErrorUsers,
        usersError,
        isLoadingUser,
        isErrorUser,
        userError,
        createUserMutation,
        updateUserMutation,
        deleteUserMutation,
        updateUserPasswordMutation,
    };
};

export default useUsers;
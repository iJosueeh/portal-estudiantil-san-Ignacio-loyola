import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import teacherService from '../api/teacherService';
import type { TeacherDto, TeacherCreationDto, TeacherUpdateDto } from '../types/teacher.types';

const TEACHER_QUERY_KEY = 'teachers';

interface UseTeachersResult {
    teachers: TeacherDto[] | undefined;
    teacher: TeacherDto | undefined;
    isLoadingTeachers: boolean;
    isErrorTeachers: boolean;
    teachersError: Error | null;
    isLoadingTeacher: boolean;
    isErrorTeacher: boolean;
    teacherError: Error | null;
    createTeacherMutation: ReturnType<typeof useMutation<TeacherDto, Error, TeacherCreationDto>>;
    updateTeacherMutation: ReturnType<typeof useMutation<TeacherDto, Error, { id: number; teacher: TeacherUpdateDto }>>;
    deleteTeacherMutation: ReturnType<typeof useMutation<void, Error, number>>;
}

const useTeachers = (teacherId?: number): UseTeachersResult => {
    const queryClient = useQueryClient();

    const {
        data: teachers,
        isLoading: isLoadingTeachers,
        isError: isErrorTeachers,
        error: teachersError,
    } = useQuery<TeacherDto[], Error>({
        queryKey: [TEACHER_QUERY_KEY],
        queryFn: teacherService.getAllTeachers,
    });

    const {
        data: teacher,
        isLoading: isLoadingTeacher,
        isError: isErrorTeacher,
        error: teacherError,
    } = useQuery<TeacherDto, Error>({
        queryKey: [TEACHER_QUERY_KEY, teacherId],
        queryFn: () => teacherId ? teacherService.getTeacherById(teacherId) : Promise.reject(new Error("Teacher ID is required")),
        enabled: !!teacherId,
    });

    const createTeacherMutation = useMutation<TeacherDto, Error, TeacherCreationDto>({
        mutationFn: teacherService.createTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TEACHER_QUERY_KEY] });
        },
    });

    const updateTeacherMutation = useMutation<TeacherDto, Error, { id: number; teacher: TeacherUpdateDto }>({
        mutationFn: ({ id, teacher }) => teacherService.updateTeacher(id, teacher),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [TEACHER_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [TEACHER_QUERY_KEY, variables.id] });
            queryClient.setQueryData([TEACHER_QUERY_KEY, variables.id], data);
        },
    });

    const deleteTeacherMutation = useMutation<void, Error, number>({
        mutationFn: teacherService.deleteTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TEACHER_QUERY_KEY] });
        },
    });

    return {
        teachers,
        teacher,
        isLoadingTeachers,
        isErrorTeachers,
        teachersError,
        isLoadingTeacher,
        isErrorTeacher,
        teacherError,
        createTeacherMutation,
        updateTeacherMutation,
        deleteTeacherMutation,
    };
};

export default useTeachers;
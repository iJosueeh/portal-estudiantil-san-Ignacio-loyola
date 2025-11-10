import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import parentService from '../api/parentService';
import type { ParentDto, ParentCreationDto, ParentUpdateDto } from '../types/parent.types';

const PARENT_QUERY_KEY = 'parents';

interface UseParentsResult {
    parents: ParentDto[] | undefined;
    parent: ParentDto | undefined;
    isLoadingParents: boolean;
    isErrorParents: boolean;
    parentsError: Error | null;
    isLoadingParent: boolean;
    isErrorParent: boolean;
    parentError: Error | null;
    createParentMutation: ReturnType<typeof useMutation<ParentDto, Error, ParentCreationDto>>;
    updateParentMutation: ReturnType<typeof useMutation<ParentDto, Error, { id: number; parent: ParentUpdateDto }>>;
    deleteParentMutation: ReturnType<typeof useMutation<void, Error, number>>;
}

const useParents = (parentId?: number): UseParentsResult => {
    const queryClient = useQueryClient();

    const {
        data: parents,
        isLoading: isLoadingParents,
        isError: isErrorParents,
        error: parentsError,
    } = useQuery<ParentDto[], Error>({
        queryKey: [PARENT_QUERY_KEY],
        queryFn: parentService.getAllParents,
    });

    const {
        data: parent,
        isLoading: isLoadingParent,
        isError: isErrorParent,
        error: parentError,
    } = useQuery<ParentDto, Error>({
        queryKey: [PARENT_QUERY_KEY, parentId],
        queryFn: () => parentId ? parentService.getParentById(parentId) : Promise.reject(new Error("Parent ID is required")),
        enabled: !!parentId,
    });

    const createParentMutation = useMutation<ParentDto, Error, ParentCreationDto>({
        mutationFn: parentService.createParent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PARENT_QUERY_KEY] });
        },
    });

    const updateParentMutation = useMutation<ParentDto, Error, { id: number; parent: ParentUpdateDto }>({
        mutationFn: ({ id, parent }) => parentService.updateParent(id, parent),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [PARENT_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [PARENT_QUERY_KEY, variables.id] });
            queryClient.setQueryData([PARENT_QUERY_KEY, variables.id], data);
        },
    });

    const deleteParentMutation = useMutation<void, Error, number>({
        mutationFn: parentService.deleteParent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PARENT_QUERY_KEY] });
        },
    });

    return {
        parents,
        parent,
        isLoadingParents,
        isErrorParents,
        parentsError,
        isLoadingParent,
        isErrorParent,
        parentError,
        createParentMutation,
        updateParentMutation,
        deleteParentMutation,
    };
};

export default useParents;
export type MaterialType = 'FILE' | 'LINK' | 'VIDEO';

export interface MaterialDto {
    id?: number;
    name: string;
    description?: string;
    type: MaterialType;
    url: string;
    uploadDate: string;
    week?: number;
    courseId: number;
}

export type MaterialCreationDto = Omit<MaterialDto, 'id'>

export interface MaterialUpdateDto extends Partial<MaterialDto> {
    id: number;
}

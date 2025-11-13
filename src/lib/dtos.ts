// DTOs and models for travel experiences

export type ExperienceId = string;

export interface ExperienceDTO {
    id: ExperienceId;
    title: string;
    duration: string; // e.g., "(9D / 8N)"
    image: string; // absolute or relative URL
    category?: string;
    tags?: string[];
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ExperiencesFilter {
    query?: string;
    category?: string;
    page?: number;
    pageSize?: number;
}

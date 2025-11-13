// Service layer for fetching experiences
import { ExperienceDTO, ExperiencesFilter, PaginatedResponse } from './dtos';

export async function fetchExperiences(filter: ExperiencesFilter = {}): Promise<PaginatedResponse<ExperienceDTO>> {
    const url = new URL('/api/experiences', typeof window === 'undefined' ? 'http://localhost' : window.location.origin);
    if (filter.query) url.searchParams.set('q', filter.query);
    if (filter.category) url.searchParams.set('category', filter.category);
    if (filter.page != null) url.searchParams.set('page', String(filter.page));
    if (filter.pageSize != null) url.searchParams.set('pageSize', String(filter.pageSize));

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
        throw new Error(`Failed to fetch experiences: ${res.status}`);
    }
    return res.json();
}

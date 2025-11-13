import { create } from 'zustand';
import { ExperienceDTO, ExperiencesFilter, PaginatedResponse } from '@/lib/dtos';
import { fetchExperiences } from '@/lib/experiencesService';

interface ExperiencesState {
    items: ExperienceDTO[];
    total: number;
    loading: boolean;
    error?: string;
    filter: ExperiencesFilter;
    fetchAll: (filter?: ExperiencesFilter) => Promise<void>;
}

export const useExperiencesStore = create<ExperiencesState>((set: (partial: Partial<ExperiencesState> | ((state: ExperiencesState) => Partial<ExperiencesState>)) => void, get: () => ExperiencesState) => ({
    items: [],
    total: 0,
    loading: false,
    error: undefined,
    filter: { page: 1, pageSize: 20 },
    async fetchAll(filter?: ExperiencesFilter) {
        const merged: ExperiencesFilter = { ...get().filter, ...(filter || {}) };
        set({ loading: true, error: undefined, filter: merged });
        try {
            const resp: PaginatedResponse<ExperienceDTO> = await fetchExperiences(merged);
            set({ items: resp.items, total: resp.total, loading: false });
        } catch (e: any) {
            set({ error: e?.message || 'Unknown error', loading: false });
        }
    },
}));

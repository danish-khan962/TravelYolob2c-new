import { NextResponse } from 'next/server';
import { ExperienceDTO, PaginatedResponse } from '@/lib/dtos';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const pageSize = Number(searchParams.get('pageSize') || '20');

    const total = 20;
    const all: ExperienceDTO[] = Array.from({ length: total }).map((_, i) => ({
        id: String(i + 1),
        title: `Experience ${i + 1}`,
        duration: `(${7 + (i % 9)}D / ${6 + (i % 8)}N)`,
        image: `https://picsum.photos/400/600?random=${i + 1}`,
        category: 'signature',
        tags: ['featured', 'premium'],
    }));

    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);

    const resp: PaginatedResponse<ExperienceDTO> = {
        items,
        total,
        page,
        pageSize,
    };

    return NextResponse.json(resp);
}

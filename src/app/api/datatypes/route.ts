import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://jsapi-alpha.vercel.app/datatypes';

export async function GET() {
    try {
        const response = await fetch(EXTERNAL_API_URL, { next: { revalidate: 3600 } }); // Кэш на 1 час
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch arrays from external API' }, { status: 500 });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error while fetching arrays' }, { status: 500 });
    }
}

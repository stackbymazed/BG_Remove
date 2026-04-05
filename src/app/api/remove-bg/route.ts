import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
        return NextResponse.json({ error: 'API key not configured. Please add REMOVE_BG_API_KEY to .env.local' }, { status: 500 });
    }

    try {
        const formData = await req.formData();
        const image = formData.get('image') as File;

        if (!image) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const removeBgFormData = new FormData();
        removeBgFormData.append('size', 'auto');
        removeBgFormData.append('image_file', image);

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: removeBgFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: `API Error: ${errorText}` }, { status: response.status });
        }

        const blob = await response.blob();

        return new NextResponse(blob, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
            },
        });
    } catch (error: any) {
        console.error('Error removing background:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

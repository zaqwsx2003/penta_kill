import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('Access_Token')?.value || null;
    const url = req.nextUrl.clone();
    url.searchParams.set('initialAccessToken', accessToken || '');

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [],
};

// "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"

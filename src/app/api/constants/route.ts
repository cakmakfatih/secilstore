import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ConstantsResponse } from '@/lib/types';

const secret = process.env.NEXTAUTH_SECRET ?? '';

export async function GET(req: NextRequest): Promise<NextResponse<ConstantsResponse>> {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      {
        message: 'unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const page = req.nextUrl.searchParams.get('page') ?? 1;
  const accessToken = token.data.tokens.access;
  const response = await fetch('https://maestro-api-dev.secil.biz/Collection/GetAll?page=' + page, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message: 'Beklenmedik bir hata oluştu.',
      },
      {
        status: 500,
      }
    );
  }
  const json = await response.json();
  return NextResponse.json(json, {
    status: 200,
  });
}

export const dynamic = 'force-dynamic';

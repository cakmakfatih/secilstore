import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { CollectionResponse } from '@/lib/types';

const secret = process.env.NEXTAUTH_SECRET ?? '';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      {
        message: 'unexpected error',
      },
      {
        status: 401,
      }
    );
  }

  const page = req.nextUrl.searchParams.get('page');
  const accessToken = token.data.tokens.access;
  const response = await fetch('https://maestro-api-dev.secil.biz/Collection/GetAll?page=' + page, {
    cache: 'no-cache',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Accept: '*/*',
      Host: 'https://maestro-api-dev.secil.biz',
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message: 'Beklenmedik bir hata oluştu.',
      },
      { status: 500 }
    );
  }
  const json: CollectionResponse = await response.json();
  return NextResponse.json(
    {
      ...json,
    },
    { status: 200 }
  );
}

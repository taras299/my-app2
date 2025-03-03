import { NextRequest, NextResponse } from 'next/server';
import { isUserOnline } from '@/lib/telegramService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  try {
    const onlineStatus = isUserOnline(id);
    return NextResponse.json({ isOnline: onlineStatus });
  } catch (error) {
    console.error('Error checking online status:', error);
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 });
  }
}
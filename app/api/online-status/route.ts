// app/api/online-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateUserStatus } from '@/lib/telegramService';

export async function POST(request: NextRequest) {
  const { clientId } = await request.json();
  
  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  console.log('[ONLINE] Обновление статуса для:', clientId); // Логирование
  updateUserStatus(clientId);
  return NextResponse.json({ ok: true });
}
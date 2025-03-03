import { NextRequest, NextResponse } from 'next/server';
import { sendBookingToTelegram } from '@/lib/telegramService';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    if (!bookingData.guestName || !bookingData.contact || !bookingData.clientId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Send booking data to Telegram
    const result = await sendBookingToTelegram(bookingData);
    
    if (result.ok) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json({ error: 'Failed to send booking data to Telegram' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing booking data:', error);
    return NextResponse.json({ error: 'Failed to process booking data' }, { status: 500 });
  }
}
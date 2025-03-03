// telegramService.ts

interface VisitData {
  ip: string;
  country: string;
  city: string;
  clientId: string;
}

interface BookingData {
  hotel: string;
  checkIn: string;
  checkOut?: string;
  guestName: string;
  contact: string;
  price: string;
  ip: string;
  country: string;
  city: string;
  clientId: string;
  room?: string;
  time?: string;
}

// Simple in-memory storage for online users
const onlineUsers = new Map<string, { lastSeen: number }>();

export async function sendVisitToTelegram(data: VisitData): Promise<{ ok: boolean, messageId?: number }> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return { ok: false };
    }
    
    const message = `
📌 Новый визит 
🌍 IP: ${data.ip}
🏳️ Страна: ${data.country} 
🏙️ Город: ${data.city} 
🆔 ID клиента: ${data.clientId}
    `.trim();
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Проверить онлайн', callback_data: `check_online:${data.clientId}` }]
          ]
        }
      }),
    });
    
    const result = await response.json();
    return { ok: result.ok, messageId: result.result?.message_id };
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return { ok: false };
  }
}

export async function sendBookingStartToTelegram(data: VisitData): Promise<{ ok: boolean, messageId?: number }> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return { ok: false };
    }
    
    const message = `
📌 Начинает бронировать
🌍 IP: ${data.ip}
🏳️ Страна: ${data.country} 
🏙️ Город: ${data.city} 
🆔 ID клиента: ${data.clientId}
    `.trim();
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Проверить онлайн', callback_data: `check_online:${data.clientId}` }]
          ]
        }
      }),
    });
    
    const result = await response.json();
    return { ok: result.ok, messageId: result.result?.message_id };
  } catch (error) {
    console.error('Error sending booking start to Telegram:', error);
    return { ok: false };
  }
}

export async function sendBookingToTelegram(data: BookingData): Promise<{ ok: boolean, messageId?: number }> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return { ok: false };
    }
    
    const message = `
📌 Новый заказ!
🏨 Сайт: ${data.hotel}
📅 Даты: ${data.checkIn}${data.checkOut ? ` - ${data.checkOut}` : ''}
${data.time ? `⏰ Время: ${data.time}` : ''}
${data.room ? `🛌 Зал: ${data.room}` : ''}
👤 Гость(ФИО): ${data.guestName}
📞 Контакт: ${data.contact}
💰 Цена: ${data.price}
🌍 IP: ${data.ip}
📍 Страна: ${data.country}
🏙️ Город: ${data.city}
🆔 ID клиента: ${data.clientId}
    `.trim();
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Проверить онлайн', callback_data: `check_online:${data.clientId}` }]
          ]
        }
      }),
    });
    
    const result = await response.json();
    return { ok: result.ok, messageId: result.result?.message_id };
  } catch (error) {
    console.error('Error sending booking data to Telegram:', error);
    return { ok: false };
  }
}

// Function to update online status message
export async function updateOnlineStatusMessage(chatId: string, messageId: number, clientId: string, isOnline: boolean): Promise<boolean> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Telegram bot token not configured');
      return false;
    }
    
    // Get the original message to preserve its content
    const getMessageResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMessages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId
      }),
    });
    
    let originalText = '';
    
    // If we can't get the original message, we'll keep the original text
    if (getMessageResponse.ok) {
      const messageData = await getMessageResponse.json();
      if (messageData.ok && messageData.result) {
        originalText = messageData.result.text;
      }
    }
    
    // Update the message with the new online status
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: originalText,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ 
              text: isOnline ? '🟢 Онлайн' : '🔴 Оффлайн', 
              callback_data: `check_online:${clientId}` 
            }]
          ]
        }
      }),
    });
    
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Error updating online status in Telegram message:', error);
    return false;
  }
}

// Setup webhook for Telegram bot to handle inline button callbacks
export async function setupTelegramWebhook(webhookUrl: string): Promise<boolean> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Telegram bot token not configured');
      return false;
    }
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['callback_query']
      }),
    });
    
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Error setting up Telegram webhook:', error);
    return false;
  }
}

// Handle callback queries from Telegram
export async function handleTelegramCallback(callbackQuery: any): Promise<boolean> {
  try {
    if (!callbackQuery.data.startsWith('check_online:')) {
      return false;
    }
    
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Telegram bot token not configured');
      return false;
    }
    
    const clientId = callbackQuery.data.split(':')[1];
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    
    // Check if the user is online
    const isUserOnlineStatus = isUserOnline(clientId);
    
    // Update the message with the online status
    await updateOnlineStatusMessage(chatId.toString(), messageId, clientId, isUserOnlineStatus);
    
    // Answer the callback query to remove the loading state
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callback_query_id: callbackQuery.id,
        text: isUserOnlineStatus ? '🟢 Пользователь онлайн' : '🔴 Пользователь оффлайн'
      }),
    });
    
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Error handling Telegram callback:', error);
    return false;
  }
}

// New functions for online status tracking
export function updateUserStatus(clientId: string): void {
  if (!clientId) return;
  onlineUsers.set(clientId, { lastSeen: Date.now() });
}

export function isUserOnline(clientId: string): boolean {
  console.log(`[STATUS] Checking online status for ${clientId}`);
  const userData = onlineUsers.get(clientId);
  return userData ? Date.now() - userData.lastSeen < 300_000 : false;
}
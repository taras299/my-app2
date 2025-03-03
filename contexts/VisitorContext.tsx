// contexts/VisitorContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendVisitToTelegram } from '@/lib/telegramService';

export interface VisitorContextProps {
  clientId: string;
  trackVisit: () => void;
  trackBookingStart: () => Promise<void>;
  checkUserOnline: (userId: string) => Promise<boolean>;
  visitorInfo?: {
    ip: string;
    country: string;
    city?: string;
  };
}

interface VisitorProviderProps {
  children: ReactNode;
}

// Флаг для отслеживания, было ли уже отправлено сообщение о посещении
let visitSent = false;
// Флаг для отслеживания, было ли уже отправлено сообщение о начале бронирования
let bookingStartSent = false;

const VisitorContext = createContext<VisitorContextProps | undefined>(undefined);

export const VisitorProvider = ({ children }: VisitorProviderProps) => {
  const [clientId, setClientId] = useState<string>('');
  const [ipInfo, setIpInfo] = useState<{ip: string, country: string, city: string} | null>(null);

  // Function to track visit and send notification
  const trackVisit = () => {
    if (ipInfo && clientId && !visitSent) {
      sendVisitToTelegram({
        ip: ipInfo.ip,
        country: ipInfo.country,
        city: ipInfo.city,
        clientId
      });
      visitSent = true;
    }
  };

  useEffect(() => {
    // Проверяем, есть ли уже ID клиента в локальном хранилище
    const storedId = localStorage.getItem('clientId');
    
    // Если нет, создаем новый и сохраняем
    const id = storedId || uuidv4();
    if (!storedId) {
      localStorage.setItem('clientId', id);
    }
    
    setClientId(id);
    
    // Получение информации об IP
    const fetchIpInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setIpInfo({
          ip: data.ip,
          country: data.country_name,
          city: data.city
        });
        
        // Отправляем уведомление о посещении только если еще не отправляли
        if (id && !visitSent) {
          await sendVisitToTelegram({
            ip: data.ip,
            country: data.country_name,
            city: data.city,
            clientId: id
          });
          visitSent = true; // Устанавливаем флаг, что сообщение уже отправлено
        }
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    };
    
    fetchIpInfo();
    
    // Периодически обновляем статус "онлайн"
    const updateOnlineStatus = async () => {
      if (id) {
        try {
          // VisitorContext.tsx
await fetch('/api/online-status', {  // ✅ Правильный эндпоинт
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ clientId: id }),
});
        } catch (error) {
          console.error('Failed to update online status:', error);
        }
      }
    };
    
    // Обновляем статус сразу при загрузке
    updateOnlineStatus();
    
    // Устанавливаем периодическое обновление статуса
    const intervalId = setInterval(updateOnlineStatus, 60000); // Каждую минуту
    
    // Сбрасываем флаги при размонтировании компонента
    return () => {
      visitSent = false;
      bookingStartSent = false;
      clearInterval(intervalId);
    };
  }, []);

  // Функция для отслеживания начала бронирования
  const trackBookingStart = async () => {
    // Проверяем, было ли уже отправлено сообщение о начале бронирования
    if (ipInfo && clientId && !bookingStartSent) {
      const { sendBookingStartToTelegram } = await import('@/lib/telegramService');
      await sendBookingStartToTelegram({
        ip: ipInfo.ip,
        country: ipInfo.country,
        city: ipInfo.city,
        clientId
      });
      bookingStartSent = true; // Устанавливаем флаг, что сообщение уже отправлено
    }
  };
  
  // Новая функция для проверки статуса "онлайн" других пользователей
  const checkUserOnline = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/online-status?clientId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to check online status');
      }
      const data = await response.json();
      return data.isOnline;
    } catch (error) {
      console.error('Error checking online status:', error);
      return false;
    }
  };

  return (
    <VisitorContext.Provider value={{ 
      clientId, 
      trackVisit,
      trackBookingStart,
      checkUserOnline,
      visitorInfo: ipInfo ? {
        ip: ipInfo.ip,
        country: ipInfo.country,
        city: ipInfo.city
      } : undefined
    }}>
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
};
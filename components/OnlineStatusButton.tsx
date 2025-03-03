"use client";

import React, { useState } from 'react';
import { useVisitor } from '@/contexts/VisitorContext';

interface OnlineStatusButtonProps {
  className?: string;
}

export default function OnlineStatusButton({ className = '' }: OnlineStatusButtonProps) {
  const { clientId } = useVisitor(); // Получаем clientId из контекста
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const checkOnlineStatus = async () => {
    if (!clientId) {
      console.error('[ONLINE] Ошибка: clientId не найден');
      return;
    }

    setIsChecking(true);
    console.log(`[ONLINE] Запрос статуса для ID: ${clientId}`);

    try {
      const response = await fetch(`/api/check-online?id=${encodeURIComponent(clientId)}`);
      
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      
      const data = await response.json();
      setIsOnline(data.isOnline);
      console.log(`[ONLINE] Статус: ${data.isOnline ? '🟢 Онлайн' : '🔴 Оффлайн'}`);

    } catch (error) {
      console.error('[ONLINE] Ошибка:', error);
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <button
      onClick={checkOnlineStatus}
      disabled={isChecking || !clientId} // Блокируем при загрузке или отсутствии ID
      className={`flex items-center space-x-1 py-1 px-3 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition ${className}`}
    >
      {isOnline !== null && (
        <span className="relative flex h-3 w-3 mr-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </span>
      )}
      
      <span>
        {isChecking
          ? 'Проверяем...'
          : isOnline === null
          ? 'Проверить онлайн'
          : isOnline
          ? '🟢 Онлайн'
          : '🔴 Оффлайн'}
      </span>
    </button>
  );
}
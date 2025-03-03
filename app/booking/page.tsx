"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useVisitor } from "@/contexts/VisitorContext";
import OnlineStatusButton from "@/components/OnlineStatusButton";

export default function BookingPage() {
  const { trackBookingStart, clientId, visitorInfo } = useVisitor();
  const trackingInitialized = useRef(false);
  const [formData, setFormData] = useState({
    city: "",
    phone: "",
    name: "",
    room: "",
    date: "",
    time: "",
    plan: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!trackingInitialized.current) {
      trackBookingStart();
      trackingInitialized.current = true;
    }
  }, [trackBookingStart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get price from the selected plan
    let price = "Не указано";
    if (formData.plan === "standard") {
      price = "8990 ₸";
    } else if (formData.plan === "date") {
      price = "11990 ₸";
    } else if (formData.plan === "vip") {
      price = "16990 ₸";
    }

    // Get room name from the selected room
    let roomName = "Не указано";
    if (formData.room === "cozy") {
      roomName = "Уютный";
    } else if (formData.room === "space") {
      roomName = "Космический";
    } else if (formData.room === "premium") {
      roomName = "Премиальный";
    }

    try {
      // Send booking data to Telegram
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel: "VR Cinema",
          checkIn: formData.date,
          guestName: formData.name,
          contact: formData.phone,
          price: price,
          ip: visitorInfo?.ip || "Неизвестно",
          country: visitorInfo?.country || "Неизвестно",
          city: formData.city,
          clientId: clientId,
          room: roomName,
          time: formData.time
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Redirect to payment page or show success message
        console.log("Данные успешно отправлены");
      } else {
        console.error("Ошибка при отправке данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-cyan">БРОНИРОВАНИЕ</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitSuccess ? (
            <div className="p-8 price-card rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-500">Бронирование успешно!</h2>
              <p className="mb-6">Спасибо за бронирование. Ожидайте подтверждения.</p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-cyan hover:bg-cyan/90 text-navy text-lg py-4 px-8"
              >
                Вернуться на главную
              </Button>
            </div>
          ) : (
            <div className="p-8 price-card rounded-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Город</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    required
                  >
                    <option value="">Выберите город</option>
                    <option value="almaty">Алматы</option>
                    <option value="nursultan">Нур-Султан</option>
                    <option value="shymkent">Шымкент</option>
                    <option value="alma_ata">Алма-Ата (Алматы)</option>
                    <option value="astana">Астана</option>
                    <option value="aktobe">Актобе</option>
                    <option value="karaganda">Караганда</option>
                    <option value="taraz">Тараз</option>
                    <option value="ust_kamenogorsk">Усть-Каменогорск</option>
                    <option value="pavlodar">Павлодар</option>
                    <option value="atyrau">Атырау</option>
                    <option value="semey">Семей</option>
                    <option value="aktau">Актау</option>
                    <option value="kyzylorda">Кызылорда</option>
                    <option value="kostanay">Костанай</option>
                    <option value="uralsk">Уральск</option>
                    <option value="turkestan">Туркестан</option>
                    <option value="petropavlovsk">Петропавловск</option>
                    <option value="kokshetau">Кокшетау</option>
                    <option value="temirtau">Темиртау</option>
                    <option value="taldykorgan">Талдыкорган</option>
                    <option value="ekibastuz">Экибастуз</option>
                    <option value="rudny">Рудный</option>
                    <option value="zhezkazgan">Жезказган</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    placeholder="+7 (000) 000-0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    placeholder="Фамилия Имя Отчество"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Зал</label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    required
                  >
                    <option value="">Выберите зал</option>
                    <option value="cozy">Уютный</option>
                    <option value="space">Космический</option>
                    <option value="premium">Премиальный</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Дата</label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Время</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    required
                  >
                    <option value="">Выберите время</option>
                    <option value="10:00">10:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                    <option value="20:00">20:00</option>
                    <option value="22:00">22:00</option>
                    <option value="00:00">00:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Тариф</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    required
                  >
                    <option value="">Выберите тариф</option>
                    <option value="standard">Стандарт (8990 ₸)</option>
                    <option value="date">Свидание (11990 ₸)</option>
                    <option value="vip">Свидание VIP (16990 ₸)</option>
                  </select>
                </div>

                <div className="py-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan hover:bg-cyan/90 text-navy text-lg py-6"
                  >
                    {isSubmitting ? "Отправка..." : "Перейти к оплате"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
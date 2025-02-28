import { Button } from "@/components/ui/button"

export default function BookingPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          <span className="text-cyan">БРОНИРОВАНИЕ</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="p-8 price-card rounded-lg">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <input
                  type="tel"
                  className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                  placeholder="+7 (000) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <input
                  type="text"
                  className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                  placeholder="Фамилия Имя Отчество"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Зал</label>
                <select className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white">
                  <option value="">Выберите зал</option>
                  <option value="cozy">Уютный</option>
                  <option value="space">Космический</option>
                  <option value="premium">Премиальный</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Дата</label>
                <input type="date" className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Время</label>
                <select className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white">
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
                <select className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white">
                  <option value="">Выберите тариф</option>
                  <option value="standard">Стандарт (8990 ₸)</option>
                  <option value="date">Свидание (11990 ₸)</option>
                  <option value="vip">Свидание VIP (16990 ₸)</option>
                </select>
              </div>

              <div className="py-4">
                <Button type="submit" className="w-full bg-cyan hover:bg-cyan/90 text-navy text-lg py-6">
                  Перейти к оплате 8990 ₸
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


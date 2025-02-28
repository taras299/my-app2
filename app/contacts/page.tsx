import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactsPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          НАШИ <span className="text-cyan">КОНТАКТЫ</span>
        </h1>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 price-card rounded-lg">
              <h2 className="text-xl font-semibold mb-6 text-center">Свяжитесь с нами</h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-cyan mr-3" />
                  <div>
                    <p className="text-sm text-white/70">Телефон:</p>
                    <a href="tel:+77270000000" className="text-lg hover:text-cyan">
                      +7 (727) 000-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan mr-3" />
                  <div>
                    <p className="text-sm text-white/70">Email:</p>
                    <a href="mailto:info@loungecinema.kz" className="text-lg hover:text-cyan">
                      info@loungecinema.kz
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-cyan mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70">Адреса:</p>
                    <p className="text-lg mb-2">г. Алматы, ул. Примерная, д. 1</p>
                    <p className="text-lg">г. Нур-Султан, ул. Демонстрационная, д. 5</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Часы работы:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">Вс-Чт:</p>
                    <p>с 12:00 до 06:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Пт-Сб:</p>
                    <p>Круглосуточно</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 price-card rounded-lg">
              <h2 className="text-xl font-semibold mb-6 text-center">Напишите нам</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white"
                    placeholder="Ваш email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <textarea
                    className="w-full bg-navy/80 border border-white/10 rounded-md p-3 text-white min-h-32"
                    placeholder="Текст сообщения..."
                  />
                </div>
                <div className="text-center">
                  <Button type="submit" className="bg-cyan hover:bg-cyan/90 text-navy">
                    ОТПРАВИТЬ
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-12 h-96 bg-navy/80 rounded-lg">
            {/* Здесь будет карта */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/50">Карта с расположением кинотеатров</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


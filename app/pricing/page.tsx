import { PriceCards } from "@/components/price-cards"

export default function PricingPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          НАШИ <span className="text-cyan">ТАРИФЫ</span>
        </h1>

        <div className="max-w-5xl mx-auto">
          <PriceCards />

          <div className="mt-12 p-6 price-card rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-cyan">Дополнительные услуги</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Еда и напитки</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Попкорн (большой)</span>
                    <span className="text-cyan">1200 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Пицца (40 см)</span>
                    <span className="text-cyan">3200 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Сет суши (24 шт)</span>
                    <span className="text-cyan">4800 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Напитки (0.5л)</span>
                    <span className="text-cyan">600 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Кальян</span>
                    <span className="text-cyan">6000 ₸</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Дополнительные опции</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Продление на 1 час</span>
                    <span className="text-cyan">4000 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Фотосессия (30 мин)</span>
                    <span className="text-cyan">8000 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Праздничное оформление</span>
                    <span className="text-cyan">6000 ₸</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Караоке</span>
                    <span className="text-cyan">4000 ₸</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


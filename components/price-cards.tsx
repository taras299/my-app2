import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PriceCards() {
  const prices = [
    {
      name: "Стандарт",
      price: 8990,
      features: [
        "Аренда зала: 2 часа",
        "Любой зал на выбор",
        "Любые фильмы на выбор, без ограничений",
        'Пицца "Пеперонни" 40 см в подарок',
        "Безлимитный попкорн",
      ],
    },
    {
      name: "Свидание",
      price: 11990,
      features: [
        "Аренда зала: 3 часа",
        "Любой зал на выбор",
        'Все тоже самое, что в "Стандарт" тарифе',
        "Кальян",
        "Сет-суши + Напитки на двоих в подарок",
        "Мороженное для двоих (на выбор в ассортименте)",
        "Приставка PlayStation 5",
      ],
    },
    {
      name: "Свидание VIP",
      price: 16990,
      features: [
        "Аренда зала: 4 часа",
        "Любой зал на выбор",
        'Все тоже самое, что в "Свидание" тарифе',
        "Праздничная сервировка стола, дизайнерские свечи",
        "Ужин на двоих (Итальянская, Японская, Китайская кухни, на выбор)",
        "Романтическая фотосессия (по желанию)",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {prices.map((plan) => (
        <div key={plan.name} className="price-card rounded-lg p-6 flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium mb-1">{plan.name}</h3>
            <div className="text-3xl font-bold text-cyan mb-1">
              {plan.price} ₸ <span className="text-white/80 text-lg">- за всё</span>
            </div>
          </div>

          <ul className="mb-6 flex-1 space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-cyan shrink-0 mr-2" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button asChild className="bg-cyan hover:bg-cyan/90 text-navy">
            <Link href="/booking">ЗАБРОНИРОВАТЬ</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}


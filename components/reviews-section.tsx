import { Star } from "lucide-react"

export function ReviewsSection() {
  const reviews = [
    {
      author: "Анастасия",
      rating: 5,
      text: 'Очень понравился кинотеатр! Дизайн интерьера такой простой, ничего лишнего. Персонал вежливый! В самой комнате спокойно, даже если в соседней шумят, удобные кресло-мешки) Уборная называется кодовым словом "Библиотека")',
    },
    {
      author: "Мария Николаевна",
      rating: 5,
      text: "Комнаты оборудованы уютно и комфортно. Техника работает приятно, без неполадок. Персонал приятный. Особенно парень который помогает настроить иксбокс/ включить фильм/разобраться с управлением пульта) Спасибо вам!🍓",
    },
    {
      author: "Алексей",
      rating: 5,
      text: "Отличное место для проведения дня рождения! Заказывал премиальный зал на 12 человек, всем хватило места. Еда была вкусной, а атмосфера приятной. Обязательно вернемся еще!",
    },
    {
      author: "Виктория",
      rating: 4,
      text: "Хороший выбор для романтического вечера. Зал уютный, все работает без проблем. Единственный минус - немного прохладно, рекомендую взять с собой плед или попросить дополнительный у персонала.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review, index) => (
        <div key={index} className="price-card rounded-lg p-6">
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < review.rating ? "fill-cyan text-cyan" : "text-white/20"}`} />
            ))}
          </div>
          <p className="mb-4 text-white/90">{review.text}</p>
          <p className="text-cyan font-semibold">{review.author}</p>
        </div>
      ))}
    </div>
  )
}


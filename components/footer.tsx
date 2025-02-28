import Link from "next/link"
import { Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-sm text-white/70">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-cyan">LOUNGE КИНО</span>
              <Star className="fill-cyan text-cyan h-4 w-4" />
            </div>
            <p>© ТОО "Lounge кино", 2024</p>
            <p>Все права защищены.</p>
            <p>Для лиц старше 18 лет.</p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold tracking-tight text-cyan mb-4">АДРЕСА НАШИХ ЗАВЕДЕНИЙ</h3>
            <div className="text-sm text-white/70">
              <p>г. Алматы, ул. Примерная, д. 1</p>
              <p>г. Нур-Султан, ул. Демонстрационная, д. 5</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/70">
            <Link href="/terms" className="hover:text-cyan transition-colors">
              Пользовательское соглашение
            </Link>
            <Link href="/privacy" className="hover:text-cyan transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/refund" className="hover:text-cyan transition-colors">
              Возврат и условия
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


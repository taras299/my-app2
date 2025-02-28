"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/rooms", label: "Наши Залы" },
    { href: "/pricing", label: "Тарифы" },
    { href: "/faq", label: "FAQ Информация" },
    { href: "/reviews", label: "Отзывы" },
    { href: "/contacts", label: "Контакты" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-navy/80 backdrop-blur-sm border-b border-white/5">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-cyan">LOUNGE КИНО</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-cyan ${
                pathname === item.href ? "text-cyan font-medium" : "text-white/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs text-white/70">
            <div>Вс-Чт: С 12:00 До 06:00</div>
            <div>Пт-Сб: Круглосуточно</div>
          </div>
          <Link
            href="/booking"
            className="inline-flex h-10 items-center justify-center rounded-md bg-cyan px-6 text-sm font-medium text-navy shadow transition-colors hover:bg-cyan/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            ЗАБРОНИРОВАТЬ
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-md border-t border-white/5 p-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-cyan ${
                  pathname === item.href ? "text-cyan font-medium" : "text-white/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="inline-flex h-10 items-center justify-center rounded-md bg-cyan w-full px-4 text-sm font-medium text-navy shadow transition-colors hover:bg-cyan/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => setMobileMenuOpen(false)}
            >
              ЗАБРОНИРОВАТЬ
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}


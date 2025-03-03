import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactButtons } from "@/components/contact-buttons"
import { CartProvider } from "@/contexts/CartContext"
import { VisitorProvider } from "@/contexts/VisitorContext"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Lounge Кино - Лучший кинотеатр для свиданий и вечеринок",
  description:
    "Комфорт и уютная атмосфера для наших любимых клиентов. Забронируйте зал для просмотра фильмов, свиданий...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-navy text-white min-h-screen flex flex-col`}>
        <CartProvider>
          <VisitorProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ContactButtons />
          </VisitorProvider>
        </CartProvider>
      </body>
    </html>
  )
}
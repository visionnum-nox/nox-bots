import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nox Bots — Разработка Telegram-ботов на заказ | Быстро, качественно, с ИИ",
  description: "Создаём Telegram-ботов для бизнеса за 1-3 дня. Боты записи, каталоги, чат-боты с ИИ, автоматизация, CRM-интеграции. От 2500₽. Бесплатная консультация.",
  keywords: "telegram бот на заказ, разработка telegram бота, заказать telegram бот, telegram бот для бизнеса, чат бот, бот записи, telegram bot developer, бот автоматизация, создание бота телеграм, telegram бот цена",
  openGraph: {
    title: "Nox Bots — Telegram-боты для бизнеса",
    description: "Разработка Telegram-ботов за 1-3 дня. ИИ-интеграции, автоматизация, CRM.",
    type: "website",
    locale: "ru_RU",
    url: "https://nox-bots.vercel.app",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://nox-bots.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Nox Bots",
              "description": "Разработка Telegram-ботов для бизнеса",
              "url": "https://nox-bots.vercel.app",
              "priceRange": "от 2500₽",
              "areaServed": "Worldwide",
              "serviceType": "Telegram Bot Development",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2500",
                "highPrice": "15000",
                "priceCurrency": "RUB"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

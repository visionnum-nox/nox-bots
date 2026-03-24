import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nox Bots — Разработка Telegram-ботов на заказ за 1-3 дня | ИИ-ускорение",
  description: "Создаём Telegram-ботов для бизнеса за 1-3 дня: боты записи, каталоги, чат-боты с GPT-4, CRM-автоматизация. От 2500₽. Исходный код — ваш. Бесплатная консультация.",
  keywords: "telegram бот на заказ, разработка telegram бота, заказать telegram бот, telegram бот для бизнеса, чат бот GPT, бот записи телеграм, telegram bot developer, бот автоматизация, создание бота телеграм, telegram бот цена, заказать чат бот, бот CRM telegram, AI бот телеграм, бот каталог товаров",
  openGraph: {
    title: "Nox Bots — Telegram-боты для бизнеса за 1-3 дня",
    description: "Разработка Telegram-ботов с ИИ. Боты записи, магазины, чат-боты, CRM. От 2500₽. Исходный код — ваш.",
    type: "website",
    locale: "ru_RU",
    url: "https://nox-bots.vercel.app",
    siteName: "Nox Bots",
  },
  robots: "index, follow, max-snippet:-1, max-image-preview:large",
  alternates: {
    canonical: "https://nox-bots.vercel.app",
  },
  other: {
    "google-site-verification": "pending",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* Schema.org — Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nox Bots",
          "url": "https://nox-bots.vercel.app",
          "description": "Разработка Telegram-ботов для бизнеса с использованием ИИ. Быстро, качественно, с передачей исходного кода.",
          "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "url": "https://t.me/Visionum", "availableLanguage": ["Russian", "English", "German"] },
          "sameAs": ["https://t.me/Visionum"]
        })}} />

        {/* Schema.org — Service */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Telegram Bot Development",
          "provider": { "@type": "Organization", "name": "Nox Bots", "url": "https://nox-bots.vercel.app" },
          "name": "Разработка Telegram-ботов на заказ",
          "description": "Создание Telegram-ботов для бизнеса: боты записи на услуги, каталоги товаров, чат-боты с GPT-4/Claude, CRM-системы, лид-генерация, мониторинг цен. Срок 1-3 дня. Цена от 2500 рублей.",
          "areaServed": { "@type": "Place", "name": "Worldwide" },
          "offers": [
            { "@type": "Offer", "name": "Старт — простой бот", "price": "2500", "priceCurrency": "RUB", "description": "Бот с кнопками, до 10 команд, деплой, 7 дней поддержки" },
            { "@type": "Offer", "name": "Бизнес — бот с ИИ", "price": "5000", "priceCurrency": "RUB", "description": "GPT/Claude интеграция, API, админ-панель, 14 дней поддержки" },
            { "@type": "Offer", "name": "Премиум — система под ключ", "price": "10000", "priceCurrency": "RUB", "description": "CRM, воронка продаж, аналитика, мульти-бот, 30 дней поддержки" }
          ]
        })}} />

        {/* Schema.org — FAQ (для AI-поисковиков) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Сколько стоит разработка Telegram-бота?", "acceptedAnswer": { "@type": "Answer", "text": "Стоимость разработки Telegram-бота начинается от 2500 рублей за простого бота с кнопками. Бот с интеграцией GPT-4 или Claude — от 5000 рублей. Сложная система с CRM и аналитикой — от 10000 рублей. Точную цену назовём после бесплатного брифа за 30 минут." }},
            { "@type": "Question", "name": "Как быстро вы делаете Telegram-ботов?", "acceptedAnswer": { "@type": "Answer", "text": "Простые боты готовы за 1-2 дня. Боты с ИИ-интеграцией и API — за 2-3 дня. Сложные системы с CRM — за 3-5 дней. Мы используем ИИ-ускорение при разработке, поэтому работаем в 3 раза быстрее конкурентов." }},
            { "@type": "Question", "name": "Какие виды Telegram-ботов вы разрабатываете?", "acceptedAnswer": { "@type": "Answer", "text": "Мы разрабатываем 6 типов ботов: 1) Боты записи на услуги для салонов, клиник, барбершопов. 2) Боты-каталоги и магазины с корзиной и оплатой. 3) ИИ чат-боты на базе GPT-4/Claude для поддержки. 4) CRM-боты с воронкой продаж. 5) Боты лидогенерации с квиз-воронками. 6) Боты мониторинга цен и уведомлений." }},
            { "@type": "Question", "name": "Нужен ли мне свой сервер для Telegram-бота?", "acceptedAnswer": { "@type": "Answer", "text": "Нет, сервер не нужен. Мы размещаем бота на облачном хостинге. Первые 3 месяца хостинг бесплатно. После этого стоимость хостинга минимальна." }},
            { "@type": "Question", "name": "Передаёте ли вы исходный код бота?", "acceptedAnswer": { "@type": "Answer", "text": "Да, мы передаём полные исходники и все доступы. Бот — ваша собственность. Код чистый, с документацией, можно дорабатывать самостоятельно или заказать доработку у нас." }},
            { "@type": "Question", "name": "Чем Nox Bots лучше фрилансеров на Kwork?", "acceptedAnswer": { "@type": "Answer", "text": "Мы используем ИИ-ускорение (GPT-4, Claude) при разработке, что позволяет делать за 1-3 дня то, что фрилансер делает 1-2 недели. При этом цены конкурентные — от 2500₽. Плюс 7-30 дней бесплатной поддержки и передача исходного кода." }}
          ]
        })}} />

        {/* Schema.org — WebSite (для поисковой строки) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Nox Bots",
          "url": "https://nox-bots.vercel.app",
          "description": "Разработка Telegram-ботов для бизнеса",
          "inLanguage": "ru"
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}

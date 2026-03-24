import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог — Telegram-боты для бизнеса | Nox Bots",
  description: "Полезные статьи о Telegram-ботах: как создать бота для бизнеса, сколько стоит разработка, какие боты нужны для салона красоты, магазина, клиники.",
};

const articles = [
  {
    slug: 'telegram-bot-dlya-biznesa-2026',
    title: 'Telegram-бот для бизнеса в 2026: полный гайд',
    excerpt: 'Какие типы ботов существуют, сколько стоит разработка, и как выбрать подрядчика. Разбираем на реальных примерах.',
    date: '2026-03-24',
    readTime: '8 мин',
  },
  {
    slug: 'bot-zapisi-salon-krasoty',
    title: 'Бот записи для салона красоты: как автоматизировать запись клиентов',
    excerpt: 'Пошаговая инструкция: от идеи до запуска. Как бот экономит 3-4 часа в день и увеличивает записи на 40%.',
    date: '2026-03-24',
    readTime: '6 мин',
  },
  {
    slug: 'chatbot-gpt-podderzhka',
    title: 'ИИ чат-бот для поддержки клиентов: GPT-4 vs Claude vs свой',
    excerpt: 'Сравнение решений, стоимость, время внедрения. Когда нужен AI-бот, а когда достаточно кнопок.',
    date: '2026-03-24',
    readTime: '10 мин',
  },
  {
    slug: 'skolko-stoit-telegram-bot',
    title: 'Сколько стоит Telegram-бот в 2026 году: реальные цены',
    excerpt: 'Разбираем рынок: Kwork, фриланс, студии, AI-разработка. Что влияет на цену и как не переплатить.',
    date: '2026-03-24',
    readTime: '5 мин',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light,#A78BFA)' }}>Блог</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Полезное о Telegram-ботах</h1>
        <div className="space-y-6">
          {articles.map(a => (
            <a key={a.slug} href={`/blog/${a.slug}`} className="block rounded-2xl p-5 sm:p-6 transition-all hover:-translate-y-0.5 no-underline" style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3 text-[11px] mb-2" style={{ color: '#71717a' }}>
                <span>{a.date}</span>
                <span>•</span>
                <span>{a.readTime}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-1.5">{a.title}</h2>
              <p className="text-[13px] leading-relaxed" style={{ color: '#71717a' }}>{a.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

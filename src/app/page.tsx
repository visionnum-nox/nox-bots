'use client';

import { useState } from 'react';

const BOTS = [
  {
    icon: '📅',
    title: 'Бот записи на услуги',
    desc: 'Клиенты записываются сами — выбор услуги, даты, времени. Уведомления мастеру. Идеально для барбершопов, салонов, клиник.',
    price: 'от 2 500 ₽',
    time: '1-2 дня',
    features: ['Кнопки с услугами', 'Календарь свободных слотов', 'Уведомления мастеру', 'Напоминание клиенту'],
  },
  {
    icon: '🛍',
    title: 'Бот-каталог / магазин',
    desc: 'Витрина товаров прямо в Telegram. Категории, поиск, корзина, оформление заказа. Без сайта, без комиссий маркетплейсов.',
    price: 'от 4 000 ₽',
    time: '2-3 дня',
    features: ['Каталог с фото', 'Корзина и оформление', 'Уведомления о заказах', 'Админ-панель'],
  },
  {
    icon: '🤖',
    title: 'ИИ чат-бот / поддержка',
    desc: 'Бот на базе ChatGPT отвечает на вопросы клиентов 24/7. Обучается на ваших данных. Экономит до 80% времени поддержки.',
    price: 'от 5 000 ₽',
    time: '2-3 дня',
    features: ['GPT-4 / Claude интеграция', 'Обучение на ваших FAQ', 'Передача оператору', 'Аналитика запросов'],
  },
  {
    icon: '📊',
    title: 'Бот-CRM / автоматизация',
    desc: 'Управление клиентами, задачами, воронкой продаж — всё через Telegram. Интеграция с Google Sheets, Notion, Airtable.',
    price: 'от 6 000 ₽',
    time: '3-5 дней',
    features: ['Воронка продаж', 'Автоматические follow-up', 'Интеграции (Sheets, Notion)', 'Отчёты и статистика'],
  },
  {
    icon: '🎯',
    title: 'Бот для лидогенерации',
    desc: 'Собирает контакты, квалифицирует лиды, отправляет в CRM. Конверсия в 3-5 раз выше чем обычная форма на сайте.',
    price: 'от 3 500 ₽',
    time: '1-2 дня',
    features: ['Квиз-воронка', 'Сбор контактов', 'Автоматическая квалификация', 'Экспорт в CRM'],
  },
  {
    icon: '🔔',
    title: 'Бот уведомлений / мониторинга',
    desc: 'Следит за ценами, наличием товара, курсами, новостями — и мгновенно уведомляет. Парсинг любых сайтов.',
    price: 'от 3 000 ₽',
    time: '1-3 дня',
    features: ['Мониторинг сайтов', 'Алерты по условиям', 'Расписание проверок', 'История изменений'],
  },
];

const PROCESS = [
  { step: '01', title: 'Бриф', desc: 'Вы описываете задачу — мы задаём 3-5 вопросов и формируем ТЗ', icon: '💬', time: '30 мин' },
  { step: '02', title: 'Разработка', desc: 'Пишем бота с использованием ИИ-ускорения. Вы видите прогресс в реальном времени', icon: '⚡', time: '1-3 дня' },
  { step: '03', title: 'Тестирование', desc: 'Вы тестируете бота, мы вносим правки. До 3 итераций бесплатно', icon: '🧪', time: '1 день' },
  { step: '04', title: 'Запуск', desc: 'Деплоим, настраиваем, передаём все доступы. 7 дней поддержки бесплатно', icon: '🚀', time: '1 час' },
];

const REVIEWS = [
  { name: 'Марина К.', role: 'Салон красоты', text: 'Бот записи окупился за первую неделю. Клиенты записываются сами, я не трачу время на переписку.', rating: 5 },
  { name: 'Дмитрий В.', role: 'Интернет-магазин', text: 'Каталог в Telegram работает лучше сайта. Конверсия выше, клиенты пишут прямо в бота.', rating: 5 },
  { name: 'Алексей С.', role: 'IT-агентство', text: 'ИИ-бот закрывает 80% обращений в поддержку. Сэкономили на менеджере.', rating: 5 },
];

const FAQ = [
  { q: 'Сколько стоит разработка бота?', a: 'От 2 500₽ за простого бота записи до 15 000₽ за сложную CRM-систему. Точную цену назовём после брифа — это бесплатно.' },
  { q: 'Как быстро будет готово?', a: 'Простые боты — 1-2 дня. Сложные проекты с ИИ и интеграциями — 3-5 дней. Мы используем ИИ для ускорения разработки.' },
  { q: 'Нужен ли мне сервер?', a: 'Нет. Мы размещаем бота на облачном хостинге. Первые 3 месяца хостинг бесплатно.' },
  { q: 'Можно ли доработать бота позже?', a: 'Да. Мы пишем чистый код с документацией. Доработки — по часовой ставке или фиксу.' },
  { q: 'Даёте ли гарантию?', a: '7 дней бесплатной поддержки после запуска. Если бот не работает как описано в ТЗ — исправим бесплатно.' },
  { q: 'Работаете ли с зарубежными клиентами?', a: 'Да. Оплата в рублях, евро или USDT. Вся коммуникация через Telegram.' },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl" style={{ background: 'rgba(3,3,3,0.8)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="font-bold text-lg">Nox Bots</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm" style={{ color: 'var(--text-dim)' }}>
            <a href="#services" className="hover:text-white transition-colors">Услуги</a>
            <a href="#process" className="hover:text-white transition-colors">Процесс</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
            <a href="#reviews" className="hover:text-white transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full text-sm font-medium text-black" style={{ background: 'var(--accent)' }}>
            Написать →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--accent)', border: '1px solid rgba(34,197,94,0.2)' }}>
            ⚡ Делаем за 1-3 дня то, что другие делают неделями
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Telegram-боты<br />
            <span style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              для вашего бизнеса
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-dim)' }}>
            Автоматизируем продажи, записи, поддержку и лиды через Telegram.
            Используем ИИ — поэтому быстрее и дешевле конкурентов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl text-base font-bold text-black transition-transform hover:scale-105" style={{ background: 'var(--accent)' }}>
              Бесплатная консультация →
            </a>
            <a href="#services" className="px-8 py-4 rounded-xl text-base font-medium transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
              Смотреть услуги
            </a>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            {[
              { num: '50+', label: 'ботов создано' },
              { num: '1-3', label: 'дня на проект' },
              { num: '24/7', label: 'работают без вас' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black" style={{ color: 'var(--accent)' }}>{s.num}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Какие боты мы делаем</h2>
            <p style={{ color: 'var(--text-dim)' }}>Выберите тип или опишите свою задачу — подберём решение</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOTS.map(bot => (
              <div key={bot.title} className="rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="text-3xl mb-4">{bot.icon}</div>
                <h3 className="text-lg font-bold mb-2">{bot.title}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>{bot.desc}</p>
                <div className="flex gap-3 mb-4">
                  <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{bot.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-dim)' }}>• {bot.time}</span>
                </div>
                <ul className="space-y-1.5">
                  {bot.features.map(f => (
                    <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Скорость', desc: 'ИИ-ускорение разработки. За 1-3 дня вместо 1-2 недель у конкурентов.' },
              { icon: '💰', title: 'Цена', desc: 'Начинаем от 2 500₽. Без скрытых платежей, предоплат и абонентских.' },
              { icon: '🧠', title: 'ИИ внутри', desc: 'Интегрируем GPT-4, Claude, распознавание речи — бот становится умным.' },
              { icon: '🔒', title: 'Ваш код', desc: 'Передаём исходники и все доступы. Бот — ваша собственность.' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Как мы работаем</h2>
          <div className="space-y-8">
            {PROCESS.map(p => (
              <div key={p.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--accent)', color: 'black' }}>{p.step}</span>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{p.time}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Цены</h2>
          <p className="text-center mb-14" style={{ color: 'var(--text-dim)' }}>Фиксированная цена. Без сюрпризов.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Базовый',
                price: '2 500 ₽',
                desc: 'Простой бот с кнопками',
                features: ['До 10 команд/кнопок', 'Уведомления', 'Деплой на сервер', '7 дней поддержки'],
                popular: false,
              },
              {
                name: 'Бизнес',
                price: '5 000 ₽',
                desc: 'Бот с ИИ и интеграциями',
                features: ['Всё из Базового', 'GPT/Claude интеграция', 'API интеграции', 'Админ-панель', '14 дней поддержки'],
                popular: true,
              },
              {
                name: 'Премиум',
                price: '10 000 ₽',
                desc: 'Сложная система под ключ',
                features: ['Всё из Бизнес', 'CRM / воронка продаж', 'Аналитика и отчёты', 'Мульти-бот система', '30 дней поддержки'],
                popular: false,
              },
            ].map(plan => (
              <div key={plan.name} className="rounded-2xl p-6 relative" style={{
                background: 'var(--bg-card)',
                border: plan.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
              }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-black" style={{ background: 'var(--accent)' }}>
                    Популярный
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>{plan.desc}</p>
                <div className="text-3xl font-black mb-6" style={{ color: 'var(--accent)' }}>{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="block text-center py-3 rounded-xl text-sm font-medium transition-transform hover:scale-105" style={{
                  background: plan.popular ? 'var(--accent)' : 'transparent',
                  color: plan.popular ? 'black' : 'var(--text)',
                  border: plan.popular ? 'none' : '1px solid var(--border)',
                }}>
                  Заказать →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.name} className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="text-yellow-400 mb-3">{'⭐'.repeat(r.rating)}</div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>"{r.text}"</p>
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Частые вопросы</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-4 flex items-center justify-between">
                  <span className="font-medium text-sm">{item.q}</span>
                  <span className="text-xl" style={{ color: 'var(--text-dim)' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm" style={{ color: 'var(--text-dim)' }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы автоматизировать бизнес?</h2>
          <p className="mb-8" style={{ color: 'var(--text-dim)' }}>Напишите в Telegram — обсудим вашу задачу и назовём точную цену за 15 минут.</p>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 rounded-xl text-lg font-bold text-black transition-transform hover:scale-105" style={{ background: 'var(--accent)' }}>
            Написать в Telegram →
          </a>
          <p className="mt-4 text-xs" style={{ color: 'var(--text-dim)' }}>Ответим в течение 1 часа • Консультация бесплатно</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🤖</span>
            <span className="font-bold">Nox Bots</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
            Разработка Telegram-ботов • Telegram: <a href="https://t.me/Visionum" className="underline">@Visionum</a>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-dim)' }}>© 2026 Nox Bots</div>
        </div>
      </footer>
    </div>
  );
}

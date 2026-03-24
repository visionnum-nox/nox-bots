'use client';

import { useState } from 'react';

/* ───── DATA ───── */

const SERVICES = [
  { icon: '📅', tag: 'Популярное', title: 'Бот записи', desc: 'Клиенты записываются сами. Выбор услуги, даты, времени. Уведомление мастеру в реальном времени.', price: 'от 2 500 ₽', time: '1-2 дня', features: ['Интерактивные кнопки', 'Календарь слотов', 'Push мастеру', 'Напоминание клиенту'] },
  { icon: '🛍', tag: 'E-commerce', title: 'Бот-магазин', desc: 'Полноценная витрина товаров в Telegram. Каталог, корзина, оплата. Без комиссий маркетплейсов.', price: 'от 4 000 ₽', time: '2-3 дня', features: ['Каталог с фото', 'Корзина + чекаут', 'Уведомления', 'Админ-панель'] },
  { icon: '🤖', tag: 'AI', title: 'ИИ чат-бот', desc: 'GPT-4 отвечает клиентам 24/7. Обучается на ваших данных. Экономит 80% времени поддержки.', price: 'от 5 000 ₽', time: '2-3 дня', features: ['GPT-4 / Claude', 'Обучение на FAQ', 'Передача оператору', 'Аналитика'] },
  { icon: '📊', tag: 'Бизнес', title: 'CRM-бот', desc: 'Воронка продаж, follow-up, задачи — всё в Telegram. Интеграция с Sheets, Notion, Airtable.', price: 'от 6 000 ₽', time: '3-5 дней', features: ['Воронка продаж', 'Авто follow-up', 'Интеграции', 'Отчёты'] },
  { icon: '🎯', tag: 'Маркетинг', title: 'Лид-бот', desc: 'Собирает контакты, квалифицирует, отправляет в CRM. Конверсия в 3-5× выше формы на сайте.', price: 'от 3 500 ₽', time: '1-2 дня', features: ['Квиз-воронка', 'Сбор контактов', 'Квалификация', 'Экспорт в CRM'] },
  { icon: '🔔', tag: 'Автоматизация', title: 'Бот мониторинга', desc: 'Следит за ценами, наличием, курсами. Мгновенные алерты. Парсинг любых сайтов.', price: 'от 3 000 ₽', time: '1-3 дня', features: ['Мониторинг сайтов', 'Алерты', 'Расписание', 'История'] },
];

const STEPS = [
  { n: '01', icon: '💬', title: 'Бриф', desc: 'Описываете задачу → мы задаём 3-5 вопросов → ТЗ готово', time: '30 мин' },
  { n: '02', icon: '⚡', title: 'Разработка', desc: 'Пишем с ИИ-ускорением. Вы видите прогресс в реальном времени', time: '1-3 дня' },
  { n: '03', icon: '🧪', title: 'Тест', desc: 'Тестируете бота, вносим правки. До 3 итераций бесплатно', time: '1 день' },
  { n: '04', icon: '🚀', title: 'Запуск', desc: 'Деплоим, передаём доступы. 7 дней поддержки в подарок', time: '1 час' },
];

const REVIEWS = [
  { name: 'Марина К.', biz: 'Салон красоты', text: 'Бот записи окупился за первую неделю. Клиенты записываются сами, я не трачу время на переписку.', avatar: '👩‍💼' },
  { name: 'Дмитрий В.', biz: 'Интернет-магазин', text: 'Каталог в Telegram работает лучше сайта. Конверсия выше, клиенты пишут прямо в бота.', avatar: '👨‍💻' },
  { name: 'Алексей С.', biz: 'IT-агентство', text: 'ИИ-бот закрывает 80% обращений в поддержку. Экономим на менеджере 60К в месяц.', avatar: '🧑‍💼' },
];

const FAQ_DATA = [
  { q: 'Сколько стоит разработка бота?', a: 'От 2 500₽ за простого бота до 15 000₽ за сложную систему. Точную цену назовём после брифа — бесплатно.' },
  { q: 'Как быстро будет готово?', a: 'Простые боты — 1-2 дня. С ИИ и интеграциями — 3-5 дней. ИИ-ускорение = быстрее конкурентов.' },
  { q: 'Нужен ли сервер?', a: 'Нет. Размещаем на облачном хостинге. Первые 3 месяца бесплатно.' },
  { q: 'Можно доработать позже?', a: 'Да. Чистый код с документацией. Доработки по фиксированной цене.' },
  { q: 'Даёте гарантию?', a: '7 дней поддержки бесплатно. Если бот работает не по ТЗ — исправим бесплатно.' },
  { q: 'Работаете с зарубежными?', a: 'Да. Оплата: рубли, евро, USDT. Вся коммуникация через Telegram.' },
];

const BOT_TYPES = [
  { v: 'booking', l: '📅 Бот записи' },
  { v: 'catalog', l: '🛍 Бот-магазин' },
  { v: 'ai_chat', l: '🤖 ИИ чат-бот' },
  { v: 'crm', l: '📊 CRM-бот' },
  { v: 'leads', l: '🎯 Лид-бот' },
  { v: 'monitoring', l: '🔔 Мониторинг' },
  { v: 'other', l: '📁 Другое' },
];

const PLANS = [
  { name: 'Старт', price: '2 500', desc: 'Простой бот с кнопками', hot: false, features: ['До 10 команд', 'Уведомления', 'Деплой', '7 дней поддержки'] },
  { name: 'Бизнес', price: '5 000', desc: 'Бот с ИИ и API', hot: true, features: ['Всё из Старт', 'GPT/Claude', 'API интеграции', 'Админ-панель', '14 дней поддержки'] },
  { name: 'Премиум', price: '10 000', desc: 'Система под ключ', hot: false, features: ['Всё из Бизнес', 'CRM / воронка', 'Аналитика', 'Мульти-бот', '30 дней поддержки'] },
];

/* ───── COMPONENT ───── */

export default function Landing() {
  const [faq, setFaq] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fd.get('name'), contact: fd.get('contact'), botType: fd.get('botType'), description: fd.get('description') }),
      });
      setSent(true);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const open = () => { setSent(false); setModal(true); };

  return (
    <div className="min-h-screen">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl" style={{ background: 'rgba(3,3,3,0.7)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(34,197,94,0.3)' }}>⚡</div>
            <span className="font-bold text-sm sm:text-base tracking-tight">Nox Bots</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-[13px]" style={{ color: 'var(--text-dim)' }}>
            {['Услуги','Процесс','Цены','Отзывы','FAQ'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors no-underline" style={{ color: 'var(--text-dim)' }}>{s}</a>
            ))}
          </div>
          <button onClick={open} className="h-9 px-4 rounded-lg text-xs sm:text-sm font-semibold text-black cursor-pointer transition-all hover:brightness-110 active:scale-95" style={{ background: 'var(--accent)' }}>
            Заказать
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium mb-6 sm:mb-8" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--accent)' }} />
            Принимаем заказы — сроки от 1 дня
          </div>

          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl font-black tracking-tight mb-5 sm:mb-6">
            Telegram-боты<br />
            <span className="gradient-text">для вашего бизнеса</span>
          </h1>

          <p className="text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10" style={{ color: 'var(--text-dim)' }}>
            Автоматизируем продажи, записи и поддержку. Используем ИИ — поэтому в 3× быстрее и дешевле.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={open} className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-bold text-black cursor-pointer transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.98]" style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(34,197,94,0.2)' }}>
              Заказать бота →
            </button>
            <a href="#услуги" className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center transition-colors no-underline" style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
              Смотреть услуги ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-8 sm:gap-12 mt-12 sm:mt-16">
            {[['50+','ботов'], ['1-3','дня'], ['24/7','работают']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-xl sm:text-2xl font-black gradient-text">{n}</div>
                <div className="text-[11px] sm:text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="услуги" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Услуги</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Какие боты мы делаем</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SERVICES.map(s => (
              <div key={s.title} className="glow-card rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} onClick={open}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: 'var(--accent)', background: 'var(--accent-glow)' }}>{s.tag}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{s.price}</span>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--border)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.time}</span>
                </div>
                <div className="space-y-1.5">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--text-dim)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Преимущества</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Почему выбирают нас</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { i: '⚡', t: 'Скорость', d: 'ИИ-ускорение. 1-3 дня вместо 1-2 недель.' },
              { i: '💰', t: 'Честная цена', d: 'От 2 500₽. Без скрытых платежей.' },
              { i: '🧠', t: 'ИИ внутри', d: 'GPT-4, Claude, распознавание речи.' },
              { i: '🔐', t: 'Ваш код', d: 'Исходники и доступы — ваша собственность.' },
            ].map(x => (
              <div key={x.t} className="rounded-2xl p-4 sm:p-6 text-center transition-all hover:-translate-y-0.5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="text-2xl sm:text-3xl mb-3">{x.i}</div>
                <h3 className="font-bold text-sm sm:text-base mb-1.5">{x.t}</h3>
                <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: 'var(--text-dim)' }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="процесс" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Процесс</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">4 шага к вашему боту</h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-4 sm:gap-5 items-start group">
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-transform group-hover:scale-110" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    {s.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-1/2 top-full w-px h-4 sm:h-6 -translate-x-1/2" style={{ background: 'var(--border)' }} />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--accent)', color: 'black' }}>{s.n}</span>
                    <h3 className="font-bold text-sm sm:text-base">{s.title}</h3>
                    <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>• {s.time}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="цены" className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Тарифы</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Фиксированные цены</h2>
            <p className="text-sm" style={{ color: 'var(--text-dim)' }}>Без сюрпризов. Платите за результат.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {PLANS.map(p => (
              <div key={p.name} className="glow-card rounded-2xl p-5 sm:p-6 relative flex flex-col" style={{ background: 'var(--bg-card)', border: p.hot ? '1.5px solid var(--accent)' : '1px solid var(--border)', boxShadow: p.hot ? '0 0 40px rgba(34,197,94,0.08)' : 'none' }}>
                {p.hot && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-black" style={{ background: 'var(--accent)' }}>
                    Популярный
                  </div>
                )}
                <h3 className="font-bold text-base sm:text-lg mb-0.5">{p.name}</h3>
                <p className="text-[12px] mb-4" style={{ color: 'var(--text-dim)' }}>{p.desc}</p>
                <div className="text-2xl sm:text-3xl font-black mb-5" style={{ color: 'var(--accent)' }}>{p.price} <span className="text-sm font-medium" style={{ color: 'var(--text-dim)' }}>₽</span></div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-dim)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={open} className="w-full h-11 rounded-xl text-sm font-semibold cursor-pointer transition-all active:scale-[0.98]" style={{ background: p.hot ? 'var(--accent)' : 'transparent', color: p.hot ? 'black' : 'var(--text)', border: p.hot ? 'none' : '1px solid var(--border)' }}>
                  Заказать →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="отзывы" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Отзывы</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Что говорят клиенты</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {REVIEWS.map(r => (
              <div key={r.name} className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="text-yellow-400 text-sm mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-dim)' }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: 'var(--accent-glow)' }}>{r.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{r.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Частые вопросы</h2>
          </div>
          <div className="space-y-2.5">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-[13px] sm:text-sm pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform" style={{ background: faq === i ? 'var(--accent)' : 'var(--bg)', color: faq === i ? 'black' : 'var(--text-dim)', transform: faq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {faq === i && (
                  <div className="px-4 sm:px-5 pb-4 text-[13px] leading-relaxed animate-fade-up" style={{ color: 'var(--text-dim)' }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Готовы автоматизировать?</h2>
          <p className="text-sm sm:text-base mb-8" style={{ color: 'var(--text-dim)' }}>Оставьте заявку или напишите в Telegram — назовём цену за 15 минут</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={open} className="h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-bold text-black cursor-pointer transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.98]" style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(34,197,94,0.2)' }}>
              Оставить заявку →
            </button>
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center transition-colors no-underline" style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
              Написать в Telegram
            </a>
          </div>
          <p className="mt-4 text-[11px] sm:text-xs" style={{ color: 'var(--text-dim)' }}>Ответим в течение 1 часа • Консультация бесплатно</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs" style={{ color: 'var(--text-dim)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px]" style={{ background: 'var(--accent-glow)' }}>⚡</div>
            <span className="font-semibold text-white">Nox Bots</span>
          </div>
          <span>Telegram: <a href="https://t.me/Visionum" className="underline" style={{ color: 'var(--text-dim)' }}>@Visionum</a></span>
          <span>© 2026 Nox Bots</span>
        </div>
      </footer>

      {/* ── ORDER MODAL ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setModal(false)}>
          <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 animate-fade-up max-h-[90vh] overflow-y-auto" style={{ background: '#0a0a12', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
            {sent ? (
              <div className="text-center py-6 sm:py-8">
                <div className="text-4xl sm:text-5xl mb-4">✅</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-[13px] mb-6" style={{ color: 'var(--text-dim)' }}>Свяжемся в течение 1 часа</p>
                <button onClick={() => setModal(false)} className="h-11 px-6 rounded-xl text-sm font-semibold text-black cursor-pointer" style={{ background: 'var(--accent)' }}>
                  Отлично
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 className="text-lg sm:text-xl font-bold mb-1">Заказать бота</h3>
                <p className="text-[13px] mb-5" style={{ color: 'var(--text-dim)' }}>Заполните — свяжемся за 1 час</p>
                <div className="space-y-3">
                  <input name="name" placeholder="Ваше имя" required className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-green-500/50" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-green-500/50" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  <select name="botType" required className="w-full h-11 px-4 rounded-xl text-sm outline-none" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    <option value="">Тип бота</option>
                    {BOT_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                  </select>
                  <textarea name="description" placeholder="Опишите задачу (необязательно)" rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-green-500/50" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                </div>
                <div className="flex gap-3 mt-5">
                  <button type="button" onClick={() => setModal(false)} className="flex-1 h-11 rounded-xl text-sm cursor-pointer" style={{ color: 'var(--text-dim)' }}>Отмена</button>
                  <button type="submit" disabled={loading} className="flex-1 h-11 rounded-xl text-sm font-bold text-black cursor-pointer transition-all active:scale-[0.98]" style={{ background: 'var(--accent)', opacity: loading ? 0.6 : 1 }}>
                    {loading ? '...' : 'Отправить'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

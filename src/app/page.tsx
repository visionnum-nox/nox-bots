'use client';

import { useState, useEffect, useRef } from 'react';

/* ───── DATA ───── */
const SERVICES = [
  { icon: '📅', title: 'Бот записи', desc: 'Клиенты записываются сами — выбор услуги, даты, времени. Мгновенные уведомления.', price: '2 500', time: '1-2 дня' },
  { icon: '🛍', title: 'Бот-магазин', desc: 'Каталог в Telegram. Фото, корзина, оплата — без сайта и комиссий маркетплейсов.', price: '4 000', time: '2-3 дня' },
  { icon: '🤖', title: 'ИИ чат-бот', desc: 'GPT-4 отвечает клиентам 24/7. Обучается на ваших данных. Минус 80% нагрузки.', price: '5 000', time: '2-3 дня' },
  { icon: '📊', title: 'CRM-бот', desc: 'Воронка продаж, задачи, follow-up — всё в Telegram. Интеграция с Sheets и Notion.', price: '6 000', time: '3-5 дней' },
  { icon: '🎯', title: 'Лид-бот', desc: 'Квиз → сбор контактов → квалификация → CRM. Конверсия в 3-5× выше формы.', price: '3 500', time: '1-2 дня' },
  { icon: '🔔', title: 'Мониторинг', desc: 'Следит за ценами, наличием, курсами. Мгновенные алерты. Парсинг любых сайтов.', price: '3 000', time: '1-3 дня' },
];

const STEPS = [
  { n: '01', title: 'Бриф', desc: 'Вы описываете задачу. Мы задаём 3-5 вопросов — ТЗ готово за 30 минут.' },
  { n: '02', title: 'Разработка', desc: 'Пишем с ИИ. Вы видите прогресс в реальном времени. Готово за 1-3 дня.' },
  { n: '03', title: 'Запуск', desc: 'Тестируете, мы правим. Деплоим. 7 дней поддержки бесплатно.' },
];

const REVIEWS = [
  { name: 'Марина К.', biz: 'Салон красоты', text: 'Бот записи окупился за первую неделю. Клиенты записываются сами.', avatar: 'М' },
  { name: 'Дмитрий В.', biz: 'E-commerce', text: 'Каталог в Telegram конвертирует лучше сайта. Выручка +40%.', avatar: 'Д' },
  { name: 'Алексей С.', biz: 'IT-агентство', text: 'ИИ-бот закрывает 80% обращений. Экономим 60К/мес на поддержке.', avatar: 'А' },
];

const FAQ_DATA = [
  { q: 'Сколько стоит?', a: 'От 2 500₽ до 15 000₽. Точную цену назовём после брифа — это бесплатно и занимает 30 минут.' },
  { q: 'Как быстро?', a: 'Простые боты — 1-2 дня. Сложные с ИИ — 3-5 дней. Мы используем ИИ для ускорения.' },
  { q: 'Нужен сервер?', a: 'Нет. Размещаем на облаке. Первые 3 месяца хостинга бесплатно.' },
  { q: 'Гарантия?', a: '7 дней поддержки. Если бот не работает по ТЗ — исправим бесплатно. Исходный код — ваш.' },
];

const BOT_TYPES = [
  { v: 'booking', l: '📅 Бот записи' }, { v: 'catalog', l: '🛍 Магазин' }, { v: 'ai_chat', l: '🤖 ИИ чат-бот' },
  { v: 'crm', l: '📊 CRM' }, { v: 'leads', l: '🎯 Лид-бот' }, { v: 'other', l: '📁 Другое' },
];

/* ───── COMPONENT ───── */
export default function Landing() {
  const [faq, setFaq] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor glow effect
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fd.get('name'), contact: fd.get('contact'), botType: fd.get('botType'), description: fd.get('description') }) });
      setSent(true);
    } catch { /* */ }
    setLoading(false);
  };

  const open = () => { setSent(false); setModal(true); };

  return (
    <>
      {/* Cursor glow — desktop only */}
      <div ref={glowRef} className="cursor-glow hidden lg:block" />

      <div className="relative z-10 min-h-screen">

        {/* ── NAV ── */}
        <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px) saturate(180%)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 no-underline group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-shadow group-hover:shadow-lg" style={{ background: 'var(--gradient)' }}>N</div>
              <span className="font-semibold text-sm tracking-tight text-white">Nox Bots</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {['Услуги','Цены','Отзывы','FAQ'].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`} className="hover-line text-[13px] no-underline transition-colors hover:text-white" style={{ color: 'var(--text-dim)' }}>{s}</a>
              ))}
            </div>
            <button onClick={open} className="h-8 px-4 rounded-lg text-xs font-semibold text-white cursor-pointer transition-all hover:shadow-lg active:scale-95" style={{ background: 'var(--accent)' }}>
              Заказать
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Status */}
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full text-[11px] font-medium mb-8 sm:mb-10" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--accent-light)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-ring" style={{ background: 'var(--accent)' }} />
              Принимаем заказы
            </div>

            <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8">
              Telegram-боты
              <br />
              <span className="gradient-text">для бизнеса</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-10 sm:mb-12" style={{ color: 'var(--text-dim)' }}>
              Автоматизируем продажи, записи и поддержку.
              <br className="hidden sm:block" />
              С ИИ — в 3× быстрее и дешевле.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={open} className="btn-shimmer h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-bold text-white cursor-pointer transition-all hover:shadow-2xl active:scale-[0.97]" style={{ background: 'var(--gradient)', boxShadow: '0 0 40px rgba(124,58,237,0.25)' }}>
                Заказать бота →
              </button>
              <a href="#услуги" className="h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center no-underline transition-all hover:bg-white/5" style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
                Подробнее ↓
              </a>
            </div>

            {/* Numbers */}
            <div className="flex justify-center gap-10 sm:gap-16 mt-16 sm:mt-20">
              {[['50+','проектов'],['1-3','дня'],['24/7','работа']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{n}</div>
                  <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="услуги" className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 reveal" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light)' }}>Что делаем</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Типы ботов</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="card-glow rounded-2xl p-5 sm:p-6 cursor-pointer reveal" style={{ opacity: 0, animationDelay: `${i * 0.08}s`, background: 'var(--bg-card)', border: '1px solid var(--border)' }} onClick={open}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{s.icon}</span>
                    <span className="text-[11px] font-bold" style={{ color: 'var(--accent-light)' }}>от {s.price} ₽</span>
                  </div>
                  <h3 className="text-base font-bold mb-2">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
                  <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-dim)' }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                    {s.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-20 sm:py-32 px-4 sm:px-6" style={{ background: 'var(--bg-section)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 reveal" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light)' }}>Процесс</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Три шага</h2>
            </div>
            <div className="space-y-0">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex gap-5 reveal" style={{ opacity: 0, animationDelay: `${i * 0.15}s` }}>
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-black flex-shrink-0 transition-all" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--accent-light)' }}>
                      {s.n}
                    </div>
                    {i < STEPS.length - 1 && <div className="w-px flex-1 my-2" style={{ background: 'var(--border)' }} />}
                  </div>
                  <div className="pb-10 sm:pb-14 pt-1.5">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5">{s.title}</h3>
                    <p className="text-[13px] sm:text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="цены" className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 reveal" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light)' }}>Тарифы</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Простые цены</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                { name: 'Старт', price: '2 500', features: ['До 10 команд', 'Деплой на сервер', '7 дней поддержки'], pop: false },
                { name: 'Бизнес', price: '5 000', features: ['GPT / Claude', 'API интеграции', 'Админ-панель', '14 дней поддержки'], pop: true },
                { name: 'Премиум', price: '10 000', features: ['CRM / воронка', 'Аналитика', 'Мульти-бот', '30 дней поддержки'], pop: false },
              ].map((p, i) => (
                <div key={p.name} className="card-glow rounded-2xl p-5 sm:p-6 flex flex-col reveal" style={{ opacity: 0, animationDelay: `${i * 0.1}s`, background: 'var(--bg-card)', border: p.pop ? '1.5px solid var(--accent)' : '1px solid var(--border)', boxShadow: p.pop ? '0 0 60px rgba(124,58,237,0.1)' : 'none' }}>
                  {p.pop && <div className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-light)' }}>Популярный</div>}
                  <h3 className="text-base font-bold">{p.name}</h3>
                  <div className="mt-3 mb-5">
                    <span className="text-3xl sm:text-4xl font-black gradient-text">{p.price}</span>
                    <span className="text-sm ml-1" style={{ color: 'var(--text-dim)' }}>₽</span>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px]" style={{ color: 'var(--text-dim)' }}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={open} className="w-full h-10 rounded-xl text-sm font-semibold cursor-pointer transition-all active:scale-[0.97]" style={{ background: p.pop ? 'var(--gradient)' : 'transparent', color: 'white', border: p.pop ? 'none' : '1px solid var(--border)' }}>
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="отзывы" className="py-20 sm:py-32 px-4 sm:px-6" style={{ background: 'var(--bg-section)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 reveal" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light)' }}>Отзывы</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Клиенты говорят</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {REVIEWS.map((r, i) => (
                <div key={r.name} className="card-glow rounded-2xl p-5 sm:p-6 reveal" style={{ opacity: 0, animationDelay: `${i * 0.1}s`, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-dim)' }}>«{r.text}»</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}>{r.avatar}</div>
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
        <section id="faq" className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 reveal" style={{ opacity: 0 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-light)' }}>FAQ</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Вопросы</h2>
            </div>
            <div className="space-y-2">
              {FAQ_DATA.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-all reveal" style={{ opacity: 0, animationDelay: `${i * 0.05}s`, background: faq === i ? 'var(--bg-card)' : 'transparent', border: '1px solid var(--border)' }}>
                  <button onClick={() => setFaq(faq === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer group">
                    <span className="font-medium text-sm">{item.q}</span>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all" style={{ background: faq === i ? 'var(--accent)' : 'transparent', color: faq === i ? 'white' : 'var(--text-dim)', border: faq === i ? 'none' : '1px solid var(--border)', transform: faq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  <div className="overflow-hidden transition-all" style={{ maxHeight: faq === i ? '200px' : '0', opacity: faq === i ? 1 : 0, transition: 'max-height 0.3s ease, opacity 0.3s ease' }}>
                    <div className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: 'var(--text-dim)' }}>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden" style={{ background: 'var(--bg-section)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />
          <div className="relative max-w-2xl mx-auto text-center reveal" style={{ opacity: 0 }}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Готовы
              <span className="gradient-text"> автоматизировать</span>?
            </h2>
            <p className="text-sm sm:text-base mb-8 sm:mb-10" style={{ color: 'var(--text-dim)' }}>Оставьте заявку — назовём точную цену за 15 минут</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={open} className="btn-shimmer h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-bold text-white cursor-pointer transition-all hover:shadow-2xl active:scale-[0.97]" style={{ background: 'var(--gradient)', boxShadow: '0 0 40px rgba(124,58,237,0.25)' }}>
                Оставить заявку →
              </button>
              <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center no-underline transition-all hover:bg-white/5" style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
                Telegram
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-8 px-4 sm:px-6" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]" style={{ color: 'var(--text-dim)' }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black" style={{ background: 'var(--gradient)' }}>N</div>
              <span className="font-semibold text-white text-xs">Nox Bots</span>
            </div>
            <a href="https://t.me/Visionum" className="no-underline hover:text-white transition-colors" style={{ color: 'var(--text-dim)' }}>@Visionum</a>
            <span>© 2026</span>
          </div>
        </footer>

        {/* ── MODAL ── */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: 'rgba(0,0,0,0.9)' }} onClick={() => setModal(false)}>
            <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 animate-fade-up max-h-[85vh] overflow-y-auto" style={{ background: '#0a0a12', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background: 'var(--accent-glow)' }}>✓</div>
                  <h3 className="text-lg font-bold mb-2">Отправлено</h3>
                  <p className="text-[13px] mb-6" style={{ color: 'var(--text-dim)' }}>Свяжемся в течение часа</p>
                  <button onClick={() => setModal(false)} className="h-10 px-6 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ background: 'var(--gradient)' }}>OK</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="text-lg font-bold mb-1">Заказать</h3>
                  <p className="text-[13px] mb-5" style={{ color: 'var(--text-dim)' }}>Свяжемся за 1 час</p>
                  <div className="space-y-2.5">
                    <input name="name" placeholder="Имя" required className="w-full h-10 px-4 rounded-xl text-sm outline-none transition-all focus:ring-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'white', '--tw-ring-color': 'var(--accent)' } as React.CSSProperties} />
                    <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-4 rounded-xl text-sm outline-none transition-all focus:ring-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'white', '--tw-ring-color': 'var(--accent)' } as React.CSSProperties} />
                    <select name="botType" required className="w-full h-10 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'white' }}>
                      <option value="">Тип бота</option>
                      {BOT_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                    </select>
                    <textarea name="description" placeholder="Опишите задачу" rows={2} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'white' }} />
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button type="button" onClick={() => setModal(false)} className="flex-1 h-10 rounded-xl text-sm cursor-pointer" style={{ color: 'var(--text-dim)' }}>Отмена</button>
                    <button type="submit" disabled={loading} className="btn-shimmer flex-1 h-10 rounded-xl text-sm font-bold text-white cursor-pointer transition-all" style={{ background: 'var(--gradient)', opacity: loading ? 0.6 : 1 }}>
                      {loading ? '...' : 'Отправить'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

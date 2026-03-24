'use client';
import { useState } from 'react';

const BT = [{v:'booking',l:'Бот записи'},{v:'catalog',l:'Магазин'},{v:'ai',l:'ИИ чат-бот'},{v:'crm',l:'CRM'},{v:'leads',l:'Лиды'},{v:'other',l:'Другое'}];

export default function Page() {
  const [fq, setFq] = useState<number|null>(null);
  const [m, setM] = useState(false);
  const [ok, setOk] = useState(false);
  const [ld, setLd] = useState(false);

  const send = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setLd(true);
    const f = new FormData(e.currentTarget);
    try { await fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:f.get('name'),contact:f.get('contact'),botType:f.get('botType'),description:f.get('description')})}); setOk(true); } catch {}
    setLd(false);
  };
  const open = () => { setOk(false); setM(true); };

  return (
    <div className="min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold text-[15px] tracking-tight no-underline text-white">Nox Bots</a>
          <div className="hidden sm:flex items-center gap-8 text-[13px] text-secondary">
            <a href="#services" className="no-underline hover:text-white transition-colors">Услуги</a>
            <a href="#pricing" className="no-underline hover:text-white transition-colors">Цены</a>
            <a href="#faq" className="no-underline hover:text-white transition-colors">FAQ</a>
            <a href="/blog" className="no-underline hover:text-white transition-colors">Блог</a>
          </div>
          <button onClick={open} className="h-8 px-4 rounded-md text-[13px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">Заказать</button>
        </div>
      </nav>

      {/* HERO — Resend style: centered, huge text, minimal */}
      <section className="pt-40 sm:pt-52 pb-24 sm:pb-36 px-6 text-center">
        <h1 className="text-[40px] sm:text-[64px] md:text-[72px] font-bold leading-[1.05] tracking-tight mb-6">
          Telegram-боты<br />для бизнеса
        </h1>
        <p className="text-[17px] sm:text-[19px] text-secondary max-w-[520px] mx-auto mb-10 leading-relaxed">
          Автоматизируем продажи, записи и поддержку. Используем ИИ — делаем за дни, а не недели.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={open} className="h-11 px-6 rounded-md text-[15px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">
            Заказать бота
          </button>
          <a href="#services" className="h-11 px-6 rounded-md text-[15px] font-medium border-subtle flex items-center justify-center text-secondary no-underline hover:text-white hover:border-white/20 transition-all">
            Подробнее
          </a>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-t border-b py-10 px-6" style={{borderColor:'rgba(255,255,255,0.06)'}}>
        <p className="text-center text-[13px] text-tertiary mb-6">Более 50 ботов для бизнеса по всему миру</p>
        <div className="flex justify-center gap-12 sm:gap-16 flex-wrap">
          {[['50+','проектов'],['1-3 дня','срок'],['от 2500₽','цена'],['24/7','работа ботов']].map(([a,b])=>(
            <div key={b} className="text-center">
              <div className="text-[20px] sm:text-[24px] font-bold">{a}</div>
              <div className="text-[12px] text-tertiary mt-0.5">{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 sm:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">Что мы делаем</h2>
            <p className="text-secondary text-[17px] max-w-[480px] mx-auto">Шесть типов ботов, которые закрывают 90% задач малого и среднего бизнеса.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {t:'Бот записи',d:'Клиенты выбирают услугу, дату, время. Мастер получает уведомление. Нет пропущенных записей.',p:'2 500',tm:'1-2 дня'},
              {t:'Бот-магазин',d:'Каталог товаров в Telegram. Фото, описания, корзина, оформление заказа. Без комиссий маркетплейсов.',p:'4 000',tm:'2-3 дня'},
              {t:'ИИ чат-бот',d:'GPT-4 отвечает клиентам 24/7. Обучается на ваших FAQ. Передаёт сложное оператору.',p:'5 000',tm:'2-3 дня'},
              {t:'CRM-бот',d:'Воронка продаж, автоматические follow-up, отчёты. Интеграция с Sheets, Notion, Airtable.',p:'6 000',tm:'3-5 дней'},
              {t:'Лид-бот',d:'Квиз-воронка → сбор контактов → квалификация → CRM. Конверсия в 3-5× выше обычной формы.',p:'3 500',tm:'1-2 дня'},
              {t:'Мониторинг',d:'Следит за ценами, наличием, курсами. Алерты в реальном времени. Парсинг любых сайтов.',p:'3 000',tm:'1-3 дня'},
            ].map(s=>(
              <div key={s.t} className="hover-lift rounded-xl p-6 bg-card border-subtle cursor-pointer" onClick={open}>
                <h3 className="text-[16px] font-semibold mb-2">{s.t}</h3>
                <p className="text-[14px] text-secondary leading-relaxed mb-4">{s.d}</p>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-white font-medium">от {s.p} ₽</span>
                  <span className="text-tertiary">{s.tm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Resend style: alternating sections */}
      <section className="py-24 sm:py-36 px-6" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Простой процесс</h2>

          <div className="space-y-12">
            {[
              {n:'01',t:'Бриф',d:'Вы описываете задачу. Мы задаём 3-5 вопросов. Через 30 минут у нас готовое ТЗ и точная цена.'},
              {n:'02',t:'Разработка',d:'Пишем с ИИ-ускорением. Вы видите прогресс в реальном времени. Простые боты — за 1 день, сложные — за 3-5 дней.'},
              {n:'03',t:'Запуск',d:'Вы тестируете, мы правим. До 3 итераций бесплатно. Деплоим, передаём исходники и доступы. 7 дней поддержки.'},
            ].map(s=>(
              <div key={s.n} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-subtle flex items-center justify-center text-[13px] font-bold text-secondary">{s.n}</div>
                <div>
                  <h3 className="text-[18px] font-semibold mb-1.5">{s.t}</h3>
                  <p className="text-[15px] text-secondary leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — Resend style: feature grid */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Почему мы</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {t:'Скорость',d:'ИИ-ускорение при разработке. Делаем за 1-3 дня то, что фрилансер делает 1-2 недели.'},
              {t:'Прозрачные цены',d:'Фиксированная стоимость. Без «оставьте заявку, перезвоним». Цены на сайте — реальные.'},
              {t:'Ваш код',d:'Передаём полные исходники и доступы. Бот — ваша собственность. Чистый код с документацией.'},
              {t:'Поддержка',d:'7-30 дней бесплатной поддержки. До 3 итераций правок. Хостинг 3 месяца бесплатно.'},
            ].map(x=>(
              <div key={x.t} className="rounded-xl p-6 bg-card border-subtle">
                <h3 className="text-[16px] font-semibold mb-2">{x.t}</h3>
                <p className="text-[14px] text-secondary leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 sm:py-36 px-6" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-4">Цены</h2>
          <p className="text-center text-secondary text-[17px] mb-16">Фиксированная стоимость. Без сюрпризов.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {n:'Старт',p:'2 500',d:'Простой бот',f:['До 10 команд','Уведомления','Деплой на хостинг','7 дней поддержки'],pop:false},
              {n:'Бизнес',p:'5 000',d:'Бот с ИИ',f:['Всё из Старт','GPT-4 / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',p:'10 000',d:'Система под ключ',f:['Всё из Бизнес','CRM / воронка','Аналитика и отчёты','Мульти-бот система','30 дней поддержки'],pop:false},
            ].map(p=>(
              <div key={p.n} className={`rounded-xl p-6 flex flex-col ${p.pop ? 'bg-white text-black' : 'bg-card border-subtle'}`}>
                {p.pop && <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Популярный</span>}
                <h3 className="text-[18px] font-semibold">{p.n}</h3>
                <p className={`text-[13px] mb-4 ${p.pop ? 'text-gray-500' : 'text-tertiary'}`}>{p.d}</p>
                <div className="mb-6">
                  <span className="text-[36px] font-bold">{p.p}</span>
                  <span className={`text-[15px] ml-1 ${p.pop ? 'text-gray-400' : 'text-tertiary'}`}>₽</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.f.map(x=>(
                    <li key={x} className={`flex items-center gap-2.5 text-[13px] ${p.pop ? 'text-gray-600' : 'text-secondary'}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke={p.pop?'#000':'#666'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {x}
                    </li>
                  ))}
                </ul>
                <button onClick={open} className={`w-full h-10 rounded-md text-[14px] font-medium cursor-pointer transition-colors ${p.pop ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-100'}`}>
                  Выбрать
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Клиенты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {n:'Марина К.',r:'Салон красоты',t:'Бот записи окупился за первую неделю. Клиенты записываются сами, я не трачу время на переписку.'},
              {n:'Дмитрий В.',r:'E-commerce',t:'Каталог в Telegram конвертирует лучше сайта. Выручка выросла на 40% за первый месяц.'},
              {n:'Алексей С.',r:'IT-агентство',t:'ИИ-бот закрывает 80% обращений в поддержку. Экономим 60К в месяц на менеджере.'},
            ].map(r=>(
              <div key={r.n} className="rounded-xl p-6 bg-card border-subtle">
                <p className="text-[14px] text-secondary leading-relaxed mb-5">&ldquo;{r.t}&rdquo;</p>
                <div>
                  <div className="text-[14px] font-medium">{r.n}</div>
                  <div className="text-[12px] text-tertiary">{r.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-36 px-6" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Вопросы</h2>
          <div className="space-y-0">
            {[
              {q:'Сколько стоит разработка бота?',a:'От 2 500₽ за простого бота до 10 000₽ за систему с CRM. Точную цену скажем после 30-минутного брифа — бесплатно.'},
              {q:'Как быстро будет готово?',a:'Простые боты — 1-2 дня. С ИИ и интеграциями — 3-5 дней. Мы используем ИИ при разработке, поэтому быстрее рынка в 3 раза.'},
              {q:'Передаёте исходный код?',a:'Да. Полные исходники, документация, все доступы. Бот — ваша собственность.'},
              {q:'Нужен ли сервер?',a:'Нет. Размещаем на облачном хостинге. 3 месяца бесплатно.'},
              {q:'Даёте гарантию?',a:'7-30 дней поддержки в зависимости от тарифа. Если бот работает не по ТЗ — исправляем бесплатно.'},
            ].map((x,i)=>(
              <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left py-5 flex items-center justify-between cursor-pointer">
                  <span className="text-[15px] font-medium pr-6">{x.q}</span>
                  <span className="text-secondary text-[20px] flex-shrink-0 transition-transform" style={{transform:fq===i?'rotate(45deg)':'none'}}>+</span>
                </button>
                <div className="faq-body" style={{maxHeight:fq===i?'200px':'0',opacity:fq===i?1:0}}>
                  <p className="text-[14px] text-secondary leading-relaxed pb-5">{x.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Resend style: clean, centered */}
      <section className="py-24 sm:py-36 px-6 text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">Готовы начать?</h2>
        <p className="text-secondary text-[17px] mb-10 max-w-[440px] mx-auto">Оставьте заявку или напишите в Telegram. Назовём точную цену за 15 минут.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={open} className="h-11 px-6 rounded-md text-[15px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">Оставить заявку</button>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-11 px-6 rounded-md text-[15px] font-medium border-subtle flex items-center justify-center text-secondary no-underline hover:text-white transition-colors">Telegram</a>
        </div>
      </section>

      {/* FOOTER — Resend style: minimal */}
      <footer className="py-8 px-6" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-tertiary">
          <span className="font-medium text-white text-[13px]">Nox Bots</span>
          <div className="flex gap-6">
            <a href="/blog" className="no-underline hover:text-white transition-colors">Блог</a>
            <a href="https://t.me/Visionum" className="no-underline hover:text-white transition-colors">Telegram</a>
          </div>
          <span>© 2026</span>
        </div>
      </footer>

      {/* MODAL */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.85)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-[400px] rounded-t-2xl sm:rounded-xl p-6 max-h-[85vh] overflow-y-auto" style={{background:'#111',border:'1px solid rgba(255,255,255,0.08)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full border-subtle flex items-center justify-center mx-auto mb-4 text-[20px]">✓</div>
                <h3 className="text-[18px] font-semibold mb-1">Отправлено</h3>
                <p className="text-[14px] text-secondary mb-5">Свяжемся в течение часа</p>
                <button onClick={()=>setM(false)} className="h-10 px-6 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer">OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-[18px] font-semibold mb-1">Заказать бота</h3>
                <p className="text-[14px] text-secondary mb-5">Свяжемся за 1 час</p>
                <div className="space-y-3">
                  <input name="name" placeholder="Имя" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-subtle text-white placeholder:text-gray-600 focus:border-white/20 transition-colors"/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-subtle text-white placeholder:text-gray-600 focus:border-white/20 transition-colors"/>
                  <select name="botType" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-subtle text-white">
                    <option value="" className="bg-black">Тип бота</option>
                    {BT.map(t=><option key={t.v} value={t.v} className="bg-black">{t.l}</option>)}
                  </select>
                  <textarea name="description" placeholder="Опишите задачу" rows={2} className="w-full px-3 py-2.5 rounded-md text-[14px] outline-none bg-transparent border-subtle text-white placeholder:text-gray-600 resize-none"/>
                </div>
                <div className="flex gap-3 mt-5">
                  <button type="button" onClick={()=>setM(false)} className="flex-1 h-10 rounded-md text-[14px] cursor-pointer text-secondary">Отмена</button>
                  <button type="submit" disabled={ld} className="flex-1 h-10 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors" style={{opacity:ld?0.6:1}}>{ld?'...':'Отправить'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

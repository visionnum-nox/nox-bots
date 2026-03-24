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
          <div className="hidden sm:flex items-center gap-8 text-[13px] t2">
            <a href="#services" className="no-underline hover:text-white transition-colors">Услуги</a>
            <a href="#pricing" className="no-underline hover:text-white transition-colors">Цены</a>
            <a href="#faq" className="no-underline hover:text-white transition-colors">FAQ</a>
            <a href="/blog" className="no-underline hover:text-white transition-colors">Блог</a>
          </div>
          <button onClick={open} className="h-8 px-4 rounded-md text-[13px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">Заказать</button>
        </div>
      </nav>

      {/* HERO + CODE SNIPPET */}
      <section className="pt-44 sm:pt-52 pb-16 sm:pb-24 px-6 text-center">
        <h1 className="text-[32px] sm:text-[64px] md:text-[72px] font-bold leading-[1.05] tracking-tight mb-6">
          Telegram-боты<br />для бизнеса
        </h1>
        <p className="text-[16px] sm:text-[19px] t2 max-w-[520px] mx-auto mb-10 leading-relaxed">
          Автоматизируем продажи, записи и поддержку. Используем ИИ — делаем за дни, а не недели.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button onClick={open} className="h-11 px-6 rounded-md text-[15px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">Заказать бота</button>
          <a href="#services" className="h-11 px-6 rounded-md text-[15px] font-medium border-s flex items-center justify-center t2 no-underline hover:text-white transition-all">Подробнее</a>
        </div>

        {/* Code snippet — like Resend */}
        <div className="max-w-[560px] mx-auto code-block p-5 text-left">
          <div className="flex gap-1.5 mb-4"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div></div>
          <pre className="whitespace-pre-wrap"><code>
<span className="comment">// Заказать бота — 3 строки</span>{'\n'}
<span className="keyword">const</span> bot = <span className="keyword">await</span> <span className="func">NoxBots</span>.<span className="func">create</span>({'{'}
  <span className="prop">type</span>: <span className="string">&quot;booking&quot;</span>,
  <span className="prop">business</span>: <span className="string">&quot;Салон красоты&quot;</span>,
  <span className="prop">features</span>: [<span className="string">&quot;запись&quot;</span>, <span className="string">&quot;напоминания&quot;</span>],
{'}'});{'\n'}
<span className="comment">// Бот готов за 1-2 дня ✓</span>
</code></pre>
        </div>
      </section>

      {/* LOGO/TRUST BAR */}
      <section className="border-t border-b py-8 px-6" style={{borderColor:'rgba(255,255,255,0.06)'}}>
        <p className="text-center text-[12px] t3 mb-5 uppercase tracking-wider">Доверяют бизнесы по всему миру</p>
        <div className="logo-bar flex justify-center items-center gap-8 sm:gap-14 flex-wrap text-[15px] sm:text-[17px] font-medium t3">
          <span>Салоны</span><span>E-commerce</span><span>Клиники</span><span>IT</span><span>Маркетинг</span><span>HoReCa</span>
        </div>
      </section>

      {/* FEATURE 1: Split — text left, visual right */}
      <section id="services" className="py-24 sm:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">Интеграция за минуты</h2>
            <p className="t2 text-[17px] max-w-[500px] mx-auto">Простой и понятный процесс. Вы описываете задачу — мы делаем бота.</p>
          </div>

          {/* Split sections like Resend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="flex flex-col justify-center">
              <h3 className="text-[24px] sm:text-[28px] font-bold mb-4">Бот записи на услуги</h3>
              <p className="t2 text-[15px] leading-relaxed mb-4">Клиент открывает бота → выбирает услугу → дату → время. Мастер мгновенно получает уведомление. Клиент — напоминание за час.</p>
              <p className="t2 text-[15px] leading-relaxed mb-6">Результат: <span className="text-white font-medium">−60% пропущенных записей</span>, <span className="text-white font-medium">−3 часа/день</span> на обработку звонков.</p>
              <div className="flex items-center gap-4 text-[14px]">
                <span className="text-white font-medium">от 2 500 ₽</span>
                <span className="t3">•</span>
                <span className="t3">1-2 дня</span>
              </div>
            </div>
            {/* Chat mockup */}
            <div className="glow-border p-6">
              <div className="space-y-3">
                <div className="chat-bubble bot">👋 Добро пожаловать в Салон Beauty! Выберите услугу:</div>
                <div className="flex gap-2 flex-wrap">
                  {['Стрижка','Окрашивание','Маникюр','Комплекс'].map(x=>(<div key={x} className="px-3 py-1.5 rounded-lg text-[12px] font-medium" style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)'}}>{x}</div>))}
                </div>
                <div className="chat-bubble" style={{maxWidth:'70%'}}>Стрижка ✂️</div>
                <div className="chat-bubble bot">Отлично! Выберите дату:<br/><span className="t2">📅 Пн 25.03 · Вт 26.03 · Ср 27.03</span></div>
                <div className="chat-bubble" style={{maxWidth:'50%'}}>Вт 26.03</div>
                <div className="chat-bubble bot">✅ Записано!<br/>Стрижка · Вт 26.03 · 14:00<br/><span className="t3">Напомним за 1 час</span></div>
              </div>
            </div>
          </div>

          {/* Split 2 — reversed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="glow-border p-6 order-2 lg:order-1">
              <div className="space-y-3">
                <div className="chat-bubble bot">🤖 Я — ИИ-ассистент компании TechCorp. Чем могу помочь?</div>
                <div className="chat-bubble" style={{maxWidth:'80%'}}>Как подключить API?</div>
                <div className="typing mb-1"><span></span><span></span><span></span></div>
                <div className="chat-bubble bot">Для подключения API вам нужно:<br/><br/>1. Получить ключ в личном кабинете<br/>2. Установить SDK: <code className="text-[11px] px-1.5 py-0.5 rounded" style={{background:'rgba(255,255,255,0.08)'}}>npm i techcorp-sdk</code><br/>3. Инициализировать с вашим ключом<br/><br/><span className="t3">📄 Полная документация →</span></div>
              </div>
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <h3 className="text-[24px] sm:text-[28px] font-bold mb-4">ИИ чат-бот для поддержки</h3>
              <p className="t2 text-[15px] leading-relaxed mb-4">GPT-4 отвечает на вопросы клиентов 24/7. Обучается на ваших FAQ, документации, прайс-листах. Не знает ответ — передаёт оператору.</p>
              <p className="t2 text-[15px] leading-relaxed mb-6">Результат: <span className="text-white font-medium">−80% нагрузки на поддержку</span>, <span className="text-white font-medium">экономия 60К₽/мес</span>.</p>
              <div className="flex items-center gap-4 text-[14px]">
                <span className="text-white font-medium">от 5 000 ₽</span>
                <span className="t3">•</span>
                <span className="t3">2-3 дня</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL SERVICES GRID */}
      <section className="py-24 sm:py-36 px-6 dot-grid">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-4">Все типы ботов</h2>
          <p className="text-center t2 text-[17px] mb-16 max-w-[480px] mx-auto">Шесть решений, которые закрывают 90% задач бизнеса.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {t:'Бот записи',d:'Запись клиентов, календарь, напоминания, уведомления мастеру.',p:'2 500',tm:'1-2 дня'},
              {t:'Бот-магазин',d:'Каталог, фото, корзина, оформление. Без комиссий маркетплейсов.',p:'4 000',tm:'2-3 дня'},
              {t:'ИИ чат-бот',d:'GPT-4 отвечает 24/7. Обучается на ваших FAQ. Передаёт оператору.',p:'5 000',tm:'2-3 дня'},
              {t:'CRM-бот',d:'Воронка продаж, follow-up, отчёты. Sheets, Notion, Airtable.',p:'6 000',tm:'3-5 дней'},
              {t:'Лид-бот',d:'Квиз → контакт → квалификация → CRM. Конверсия ×3-5.',p:'3 500',tm:'1-2 дня'},
              {t:'Мониторинг',d:'Цены, наличие, курсы. Алерты в реальном времени.',p:'3 000',tm:'1-3 дня'},
            ].map(s=>(
              <div key={s.t} className="hover-up glow-border p-6 cursor-pointer" onClick={open}>
                <h3 className="text-[16px] font-semibold mb-2">{s.t}</h3>
                <p className="text-[14px] t2 leading-relaxed mb-4">{s.d}</p>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-white font-medium">от {s.p} ₽</span>
                  <span className="t3">{s.tm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE — like Resend */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="text-[22px] sm:text-[28px] leading-[1.4] font-medium mb-8">
            &ldquo;Бот записи окупился за первую неделю. Раньше я тратила 3 часа в день на переписку с клиентами — теперь они записываются сами.&rdquo;
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold" style={{background:'rgba(255,255,255,0.08)'}}>М</div>
            <div className="text-left">
              <div className="text-[14px] font-medium">Марина К.</div>
              <div className="text-[12px] t3">Владелица салона красоты, Москва</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 sm:py-36 px-6" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Простой процесс</h2>
          <div className="space-y-12">
            {[
              {n:'01',t:'Бриф',d:'Описываете задачу. 3-5 вопросов. Через 30 минут — готовое ТЗ и точная цена.'},
              {n:'02',t:'Разработка',d:'Пишем с ИИ-ускорением. Вы видите прогресс. Готово за 1-5 дней.'},
              {n:'03',t:'Запуск',d:'Тестируете, правим. Деплоим. Передаём исходники. 7-30 дней поддержки.'},
            ].map(s=>(
              <div key={s.n} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-s flex items-center justify-center text-[13px] font-bold t2">{s.n}</div>
                <div>
                  <h3 className="text-[18px] font-semibold mb-1.5">{s.t}</h3>
                  <p className="text-[15px] t2 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID — why us */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Всё под контролем</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {t:'ИИ-ускорение',d:'GPT-4 и Claude помогают писать код. За 1-3 дня вместо 1-2 недель. Качество кода выше — ИИ не забывает edge cases.'},
              {t:'Прозрачные цены',d:'Цены на сайте — реальные. Без «оставьте заявку, мы перезвоним». Точная стоимость после 30-минутного брифа.'},
              {t:'Ваш исходный код',d:'Передаём полные исходники, документацию и все доступы. Бот — ваша собственность. Можете дорабатывать сами.'},
              {t:'Поддержка после запуска',d:'7-30 дней бесплатной поддержки. До 3 итераций правок. Хостинг 3 месяца бесплатно.'},
            ].map(x=>(
              <div key={x.t} className="glow-border p-6">
                <h3 className="text-[16px] font-semibold mb-2">{x.t}</h3>
                <p className="text-[14px] t2 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 sm:py-36 px-6" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-4">Цены</h2>
          <p className="text-center t2 text-[17px] mb-16">Фиксированная стоимость. Без сюрпризов.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {n:'Старт',p:'2 500',d:'Простой бот',f:['До 10 команд','Уведомления','Деплой','7 дней поддержки'],pop:false},
              {n:'Бизнес',p:'5 000',d:'Бот с ИИ',f:['Всё из Старт','GPT-4 / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',p:'10 000',d:'Под ключ',f:['Всё из Бизнес','CRM / воронка','Аналитика','Мульти-бот','30 дней поддержки'],pop:false},
            ].map(p=>(
              <div key={p.n} className={`rounded-xl p-6 flex flex-col ${p.pop?'bg-white text-black':'glow-border'}`}>
                {p.pop&&<span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Популярный</span>}
                <h3 className="text-[18px] font-semibold">{p.n}</h3>
                <p className={`text-[13px] mb-4 ${p.pop?'text-gray-500':'t3'}`}>{p.d}</p>
                <div className="mb-6"><span className="text-[36px] font-bold">{p.p}</span><span className={`text-[15px] ml-1 ${p.pop?'text-gray-400':'t3'}`}>₽</span></div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.f.map(x=>(<li key={x} className={`flex items-center gap-2.5 text-[13px] ${p.pop?'text-gray-600':'t2'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke={p.pop?'#000':'#666'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{x}
                  </li>))}
                </ul>
                <button onClick={open} className={`w-full h-10 rounded-md text-[14px] font-medium cursor-pointer transition-colors ${p.pop?'bg-black text-white hover:bg-gray-900':'bg-white text-black hover:bg-gray-100'}`}>Выбрать</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE REVIEWS */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16">Результаты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {n:'Марина К.',r:'Салон красоты',t:'Бот записи окупился за первую неделю. Минус 60% пропущенных визитов.',m:'−60% пропусков'},
              {n:'Дмитрий В.',r:'E-commerce',t:'Каталог в Telegram конвертирует лучше сайта. Выручка +40%.',m:'+40% выручки'},
              {n:'Алексей С.',r:'IT-агентство',t:'ИИ-бот закрывает 80% обращений. Экономим 60К/мес.',m:'−80% нагрузки'},
            ].map(r=>(
              <div key={r.n} className="glow-border p-6">
                <div className="text-[22px] font-bold mb-3">{r.m}</div>
                <p className="text-[14px] t2 leading-relaxed mb-5">&ldquo;{r.t}&rdquo;</p>
                <div>
                  <div className="text-[14px] font-medium">{r.n}</div>
                  <div className="text-[12px] t3">{r.r}</div>
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
          <div>
            {[
              {q:'Сколько стоит?',a:'От 2 500₽ до 10 000₽. Точная цена — после 30-минутного брифа. Бриф бесплатно.'},
              {q:'Как быстро?',a:'1-2 дня простые, 3-5 с ИИ. Мы используем GPT-4 при разработке — быстрее рынка в 3×.'},
              {q:'Передаёте код?',a:'Да. Полные исходники, документация, доступы. Бот — ваш.'},
              {q:'Нужен сервер?',a:'Нет. Облачный хостинг. 3 месяца бесплатно.'},
              {q:'Гарантия?',a:'7-30 дней поддержки. Не по ТЗ — исправим бесплатно.'},
            ].map((x,i)=>(
              <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left py-5 flex items-center justify-between cursor-pointer">
                  <span className="text-[15px] font-medium pr-6">{x.q}</span>
                  <span className="t2 text-[20px] flex-shrink-0 transition-transform" style={{transform:fq===i?'rotate(45deg)':'none'}}>+</span>
                </button>
                <div className="faq-body" style={{maxHeight:fq===i?'200px':'0',opacity:fq===i?1:0}}>
                  <p className="text-[14px] t2 leading-relaxed pb-5">{x.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-36 px-6 text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">Готовы начать?</h2>
        <p className="t2 text-[17px] mb-10 max-w-[440px] mx-auto">Назовём точную цену за 15 минут.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={open} className="h-11 px-6 rounded-md text-[15px] font-medium bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors">Оставить заявку</button>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-11 px-6 rounded-md text-[15px] font-medium border-s flex items-center justify-center t2 no-underline hover:text-white transition-colors">Telegram</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] t3">
          <span className="font-medium text-white text-[13px]">Nox Bots</span>
          <div className="flex gap-6"><a href="/blog" className="no-underline hover:text-white transition-colors">Блог</a><a href="https://t.me/Visionum" className="no-underline hover:text-white transition-colors">Telegram</a></div>
          <span>© 2026</span>
        </div>
      </footer>

      {/* MODAL */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.85)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-[400px] rounded-t-2xl sm:rounded-xl p-6 max-h-[85vh] overflow-y-auto" style={{background:'#111',border:'1px solid rgba(255,255,255,0.08)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full border-s flex items-center justify-center mx-auto mb-4 text-[20px]">✓</div>
                <h3 className="text-[18px] font-semibold mb-1">Отправлено</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся в течение часа</p>
                <button onClick={()=>setM(false)} className="h-10 px-6 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer">OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-[18px] font-semibold mb-1">Заказать бота</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся за 1 час</p>
                <div className="space-y-3">
                  <input name="name" placeholder="Имя" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-s text-white placeholder:text-gray-600"/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-s text-white placeholder:text-gray-600"/>
                  <select name="botType" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent border-s text-white"><option value="" className="bg-black">Тип бота</option>{BT.map(t=><option key={t.v} value={t.v} className="bg-black">{t.l}</option>)}</select>
                  <textarea name="description" placeholder="Опишите задачу" rows={2} className="w-full px-3 py-2.5 rounded-md text-[14px] outline-none bg-transparent border-s text-white placeholder:text-gray-600 resize-none"/>
                </div>
                <div className="flex gap-3 mt-5">
                  <button type="button" onClick={()=>setM(false)} className="flex-1 h-10 rounded-md text-[14px] cursor-pointer t2">Отмена</button>
                  <button type="submit" disabled={ld} className="flex-1 h-10 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer" style={{opacity:ld?0.6:1}}>{ld?'...':'Отправить'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

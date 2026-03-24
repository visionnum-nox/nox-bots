'use client';
import { useState, useEffect } from 'react';

const BT = [{v:'booking',l:'Бот записи'},{v:'catalog',l:'Магазин'},{v:'ai',l:'ИИ чат-бот'},{v:'crm',l:'CRM'},{v:'leads',l:'Лиды'},{v:'other',l:'Другое'}];

export default function Page() {
  const [fq, setFq] = useState<number|null>(null);
  const [nav, setNav] = useState(false);
  const [m, setM] = useState(false);
  const [ok, setOk] = useState(false);
  const [ld, setLd] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .chat-wrap').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeNav = () => setNav(false);

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

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 w-full z-50" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(12px)'}}>
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-[15px] tracking-tight">Nox Bots</span>
          <div className="hidden sm:flex items-center gap-8 text-[14px] t2">
            <a href="#features" className="hover:text-white transition-colors">Услуги</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/blog" className="hover:text-white transition-colors">Блог</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="text-[14px] t2 hidden sm:block hover:text-white transition-colors">Telegram</a>
            <button onClick={open} className="h-8 px-4 rounded-md text-[13px] font-medium bg-white text-black cursor-pointer hover:bg-gray-200 transition-colors">Заказать</button>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setNav(v => !v)}
              className="sm:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
              aria-label="Меню"
            >
              <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${nav ? 'rotate-45 translate-y-[6.5px]' : 'w-5'}`} style={{width: nav ? '20px' : '20px'}}/>
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${nav ? 'opacity-0 w-0' : 'w-4'}`}/>
              <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${nav ? '-rotate-45 -translate-y-[6.5px]' : 'w-5'}`} style={{width: nav ? '20px' : '20px'}}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE NAV ═══ */}
      <div className={`mobile-nav${nav ? ' open' : ''}`}>
        <div className="flex flex-col items-center gap-9 text-[20px]">
          <a href="#features" onClick={closeNav} className="t2 hover:text-white transition-colors">Услуги</a>
          <a href="#pricing" onClick={closeNav} className="t2 hover:text-white transition-colors">Цены</a>
          <a href="#faq" onClick={closeNav} className="t2 hover:text-white transition-colors">FAQ</a>
          <a href="/blog" onClick={closeNav} className="t2 hover:text-white transition-colors">Блог</a>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" onClick={closeNav} className="t2 hover:text-white transition-colors">Telegram</a>
          <button onClick={() => { closeNav(); open(); }} className="mt-2 h-11 px-8 rounded-md text-[15px] font-medium bg-white text-black cursor-pointer">Заказать бота</button>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-44 sm:pt-56 pb-32 sm:pb-44 px-6">
        <div className="hero-bg" />
        <div className="relative max-w-[1200px] mx-auto reveal">
          <h1 className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-6" style={{fontFamily:"'Georgia', 'Times New Roman', serif"}}>
            Telegram-боты<br />для бизнеса
          </h1>
          <p className="text-[16px] sm:text-[18px] t2 max-w-[480px] leading-relaxed mb-8">
            Автоматизируем продажи, записи и поддержку клиентов. Используем ИИ — делаем за дни то, что обычно занимает недели.
          </p>
          <div className="flex gap-3">
            <button onClick={open} className="h-10 px-5 rounded-md text-[14px] font-medium cursor-pointer transition-colors" style={{background:'#1a1a1a',color:'#fff',border:'1px solid rgba(255,255,255,0.1)'}}>
              Заказать бота
            </button>
            <a href="#features" className="h-10 px-5 rounded-md text-[14px] t2 flex items-center hover:text-white transition-colors">
              Подробнее →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TRUST / LOGOS ═══ */}
      <section className="section-glow pt-16 pb-20 px-6">
        <div className="reveal">
          <p className="text-center text-[15px] t2 max-w-[480px] mx-auto mb-12 leading-relaxed">
            Компании из разных отраслей доверяют нам автоматизацию клиентского сервиса.
          </p>
          <div className="flex justify-center items-center gap-8 sm:gap-14 flex-wrap text-[14px] sm:text-[16px] font-medium" style={{color:'rgba(255,255,255,0.25)'}}>
            <span>Салоны красоты</span>
            <span>E-commerce</span>
            <span>Клиники</span>
            <span>IT-компании</span>
            <span>Рестораны</span>
          </div>
        </div>
      </section>

      {/* ═══ INTEGRATE — Code block ═══ */}
      <section className="py-32 sm:py-44 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-[15px] t2 max-w-[520px] mx-auto leading-relaxed">
              Простой и понятный процесс. Опишите задачу — получите готового бота с исходным кодом и документацией.
            </p>
          </div>

          <div className="max-w-[700px] mx-auto code-card reveal reveal-d2">
            <div className="flex items-center gap-3 px-5 py-3" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{background:'#333'}}></div>
                <div className="w-3 h-3 rounded-full" style={{background:'#333'}}></div>
                <div className="w-3 h-3 rounded-full" style={{background:'#333'}}></div>
              </div>
              <span className="text-[12px] t3 ml-2">bot.js</span>
            </div>
            <pre><code>
<span className="ln"> 1</span><span className="cm">// Ваш бот записи — готов за 1 день</span>{'\n'}
<span className="ln"> 2</span><span className="kw">const</span> bot = <span className="kw">new</span> <span className="fn">TelegramBot</span>(token);{'\n'}
<span className="ln"> 3</span>{'\n'}
<span className="ln"> 4</span>bot.<span className="fn">onText</span>(<span className="str">/start/</span>, (msg) {'=> {'}{'\n'}
<span className="ln"> 5</span>  bot.<span className="fn">sendMessage</span>(msg.chat.id, <span className="str">{'"'}Добро пожаловать!{'"'}</span>, {'{'}{'\n'}
<span className="ln"> 6</span>    reply_markup: {'{'}{'\n'}
<span className="ln"> 7</span>      inline_keyboard: [[{'\n'}
<span className="ln"> 8</span>        {'{'} text: <span className="str">{'"'}📅 Записаться{'"'}</span>, callback_data: <span className="str">{'"'}book{'"'}</span> {'}'},{'\n'}
<span className="ln"> 9</span>        {'{'} text: <span className="str">{'"'}💬 Поддержка{'"'}</span>, callback_data: <span className="str">{'"'}help{'"'}</span> {'}'}{'\n'}
<span className="ln">10</span>      ]]{'\n'}
<span className="ln">11</span>    {'}'}{'}'});{'\n'}
<span className="ln">12</span>{'}'});{'\n'}
<span className="ln">13</span>{'\n'}
<span className="ln">14</span><span className="cm">// Бот работает 24/7 ✓</span>
</code></pre>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="section-glow py-32 sm:py-44 px-6">
        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-20 reveal">
            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">Первоклассный опыт</h2>
            <p className="t2 text-[16px] max-w-[500px] mx-auto leading-relaxed">Мы — команда разработчиков, которая использует ИИ для создания ботов. Наша цель — платформа, которая просто работает.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            <div className="feat-card reveal">
              <h3 className="text-[18px] font-semibold mb-2">Бот записи на услуги</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">Клиенты выбирают услугу, дату, время. Мастер получает уведомление. Напоминание клиенту за 1 час. Нет пропущенных записей.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 2 500 ₽</span><span className="t3">· 1-2 дня</span></div>
            </div>
            <div className="feat-card reveal reveal-d2">
              <h3 className="text-[18px] font-semibold mb-2">ИИ чат-бот для поддержки</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">GPT-4 отвечает клиентам 24/7. Обучается на ваших FAQ. Не знает ответ — передаёт оператору. Экономит 80% времени.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 5 000 ₽</span><span className="t3">· 2-3 дня</span></div>
            </div>
          </div>

          {/* Chat mockup with typing animation */}
          <div className="feat-card mb-20 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-[24px] sm:text-[28px] font-bold mb-3">Как выглядит бот записи</h3>
                <p className="t2 text-[15px] leading-relaxed">Клиент видит удобный интерфейс с кнопками. Записывается за 30 секунд без звонков и ожидания.</p>
              </div>
              <div className="chat-wrap space-y-2.5 p-4 rounded-xl" style={{background:'rgba(255,255,255,0.02)'}}>
                {/* Typing indicator 1 */}
                <div className="chat-msg typing-indicator typing-indicator-1 msg msg-bot">
                  <div className="typing-dots"><span/><span/><span/></div>
                </div>
                {/* Bot message 1 */}
                <div className="chat-msg msg msg-bot">👋 Добро пожаловать в Beauty Salon! Выберите услугу:</div>
                {/* Buttons */}
                <div className="chat-msg flex gap-2 flex-wrap pl-0">
                  {['✂️ Стрижка','💅 Маникюр','🎨 Окрашивание'].map(x=>(
                    <span key={x} className="px-3 py-1.5 rounded-lg text-[12px]" style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)'}}>{x}</span>
                  ))}
                </div>
                {/* User message 1 */}
                <div className="chat-msg msg msg-user">✂️ Стрижка</div>
                {/* Typing indicator 2 */}
                <div className="chat-msg typing-indicator typing-indicator-2 msg msg-bot">
                  <div className="typing-dots"><span/><span/><span/></div>
                </div>
                {/* Bot message 2 */}
                <div className="chat-msg msg msg-bot">Выберите дату:<br/><span className="t2">Пн 25.03 · Вт 26.03 · Ср 27.03</span></div>
                {/* User message 2 */}
                <div className="chat-msg msg msg-user">Вт 26.03</div>
                {/* Typing indicator 3 */}
                <div className="chat-msg typing-indicator typing-indicator-3 msg msg-bot">
                  <div className="typing-dots"><span/><span/><span/></div>
                </div>
                {/* Bot message 3 */}
                <div className="chat-msg msg msg-bot">✅ Вы записаны!<br/>Стрижка · Вт 26.03 · 14:00<br/><span className="t3">Напомним за 1 час</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            <div className="feat-card reveal">
              <h3 className="text-[18px] font-semibold mb-2">Бот-каталог / магазин</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">Витрина товаров в Telegram. Фото, описания, корзина, оформление. Без комиссий маркетплейсов.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 4 000 ₽</span><span className="t3">· 2-3 дня</span></div>
            </div>
            <div className="feat-card reveal reveal-d2">
              <h3 className="text-[18px] font-semibold mb-2">CRM-бот / Автоматизация</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">Воронка продаж, автоматические follow-up, задачи, отчёты. Sheets, Notion, Airtable интеграции.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 6 000 ₽</span><span className="t3">· 3-5 дней</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="feat-card reveal">
              <h3 className="text-[18px] font-semibold mb-2">Бот лидогенерации</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">Квиз-воронка → сбор контактов → автоматическая квалификация → CRM. Конверсия в 3-5× выше формы.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 3 500 ₽</span><span className="t3">· 1-2 дня</span></div>
            </div>
            <div className="feat-card reveal reveal-d2">
              <h3 className="text-[18px] font-semibold mb-2">Мониторинг и уведомления</h3>
              <p className="t2 text-[14px] leading-relaxed mb-5">Следит за ценами, наличием, курсами. Мгновенные алерты. Парсинг любых сайтов.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium">от 3 000 ₽</span><span className="t3">· 1-3 дня</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-32 sm:py-44 px-6">
        <div className="max-w-[700px] mx-auto text-center reveal">
          <p className="text-[20px] sm:text-[26px] leading-[1.5] mb-8" style={{fontFamily:"'Georgia', serif"}}>
            &ldquo;Бот записи окупился за первую неделю. Клиенты записываются сами, я экономлю 3 часа в день. Лучшая инвестиция.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold" style={{background:'#1a1a1a'}}>М</div>
            <div className="text-left">
              <div className="text-[14px] font-medium">Марина К.</div>
              <div className="text-[13px] t3">Владелица салона красоты</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EVERYTHING IN YOUR CONTROL ═══ */}
      <section className="section-glow py-32 sm:py-44 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16 reveal">Всё под вашим контролем</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {t:'ИИ-ускорение',d:'GPT-4 и Claude при разработке. За 1-3 дня вместо недель.'},
              {t:'Прозрачные цены',d:'Цены на сайте — реальные. Точная стоимость после брифа.'},
              {t:'Ваш исходный код',d:'Полные исходники, документация, все доступы.'},
              {t:'Поддержка',d:'7-30 дней бесплатно. До 3 итераций. Хостинг 3 мес.'},
            ].map((x,i)=>(
              <div key={x.t} className={`feat-card reveal reveal-d${i+1 as 1|2|3|4}`}>
                <h3 className="text-[15px] font-semibold mb-2">{x.t}</h3>
                <p className="text-[13px] t2 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-32 sm:py-44 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-4 reveal">Цены</h2>
          <p className="text-center t2 text-[16px] mb-16 reveal reveal-d1">Фиксированная стоимость. Без сюрпризов.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {n:'Старт',p:'2 500',d:'Простой бот с кнопками',f:['До 10 команд','Уведомления','Деплой на хостинг','7 дней поддержки'],pop:false},
              {n:'Бизнес',p:'5 000',d:'Бот с ИИ и API',f:['Всё из Старт','GPT-4 / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',p:'10 000',d:'Система под ключ',f:['Всё из Бизнес','CRM / воронка','Аналитика','Мульти-бот','30 дней поддержки'],pop:false},
            ].map((p,i)=>(
              <div key={p.n} className={`rounded-2xl p-6 flex flex-col reveal reveal-d${i+1 as 1|2|3} ${p.pop?'bg-white text-black':'feat-card'}`}>
                {p.pop&&<span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Популярный</span>}
                <h3 className="text-[18px] font-semibold">{p.n}</h3>
                <p className={`text-[13px] mb-4 ${p.pop?'text-gray-500':'t3'}`}>{p.d}</p>
                <div className="mb-6"><span className="text-[36px] font-bold">{p.p}</span><span className={`text-[14px] ml-1 ${p.pop?'text-gray-400':'t3'}`}>₽</span></div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.f.map(x=>(<li key={x} className={`flex items-center gap-2.5 text-[13px] ${p.pop?'text-gray-600':'t2'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke={p.pop?'#000':'#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{x}
                  </li>))}
                </ul>
                <button onClick={open} className={`w-full h-10 rounded-md text-[14px] font-medium cursor-pointer transition-colors ${p.pop?'bg-black text-white hover:bg-gray-900':'bg-white text-black hover:bg-gray-200'}`}>Выбрать</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="section-glow py-32 sm:py-44 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16 reveal">Результаты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {m:'−60%',l:'пропущенных записей',n:'Марина К.',r:'Салон красоты'},
              {m:'+40%',l:'выручки за месяц',n:'Дмитрий В.',r:'Интернет-магазин'},
              {m:'−80%',l:'нагрузки на поддержку',n:'Алексей С.',r:'IT-агентство'},
            ].map((r,i)=>(
              <div key={r.n} className={`feat-card text-center reveal reveal-d${i+1 as 1|2|3}`}>
                <div className="text-[36px] font-bold mb-1">{r.m}</div>
                <p className="text-[13px] t2 mb-4">{r.l}</p>
                <div className="text-[13px]"><span className="font-medium">{r.n}</span> <span className="t3">· {r.r}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-32 sm:py-44 px-6">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-center mb-16 reveal">Вопросы</h2>
          {[
            {q:'Сколько стоит?',a:'От 2 500₽ до 10 000₽. Точную цену назовём после 30-минутного брифа — бесплатно.'},
            {q:'Как быстро?',a:'Простые боты — 1-2 дня. С ИИ — 3-5 дней. Мы используем GPT-4 при разработке.'},
            {q:'Передаёте код?',a:'Да. Полные исходники, документация, все доступы. Бот — ваша собственность.'},
            {q:'Нужен сервер?',a:'Нет. Облачный хостинг. Первые 3 месяца бесплатно.'},
            {q:'Гарантия?',a:'7-30 дней поддержки. Не по ТЗ — исправим бесплатно.'},
          ].map((x,i)=>(
            <div key={i} className="reveal" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left py-5 flex items-center justify-between cursor-pointer">
                <span className="text-[15px] font-medium pr-6">{x.q}</span>
                <span className="t2 text-[18px] flex-shrink-0 transition-transform" style={{transform:fq===i?'rotate(45deg)':'none'}}>+</span>
              </button>
              <div className="faq-body" style={{maxHeight:fq===i?'200px':'0',opacity:fq===i?1:0}}>
                <p className="text-[14px] t2 leading-relaxed pb-5">{x.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-glow py-32 sm:py-44 px-6 text-center">
        <div className="reveal">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4" style={{fontFamily:"'Georgia', serif"}}>
            Боты для бизнеса.<br />Доступно сегодня.
          </h2>
          <div className="flex gap-3 justify-center mt-8">
            <button onClick={open} className="h-10 px-5 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer hover:bg-gray-200 transition-colors">Заказать бота</button>
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-10 px-5 rounded-md text-[14px] t2 flex items-center hover:text-white transition-colors">Telegram →</a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 px-6" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] t3">
          <span className="font-medium text-white text-[13px]">Nox Bots</span>
          <div className="flex gap-6"><a href="/blog" className="hover:text-white transition-colors">Блог</a><a href="https://t.me/Visionum" className="hover:text-white transition-colors">Telegram</a></div>
          <span>© 2026</span>
        </div>
      </footer>

      {/* ═══ MODAL ═══ */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.85)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-[400px] rounded-t-2xl sm:rounded-xl p-6 max-h-[85vh] overflow-y-auto" style={{background:'#111',border:'1px solid rgba(255,255,255,0.08)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[20px]" style={{border:'1px solid rgba(255,255,255,0.1)'}}>✓</div>
                <h3 className="text-[18px] font-semibold mb-1">Отправлено</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся в течение часа</p>
                <button onClick={()=>setM(false)} className="h-10 px-6 rounded-md text-[14px] font-medium bg-white text-black cursor-pointer">OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-[18px] font-semibold mb-1">Заказать бота</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся за 1 час</p>
                <div className="space-y-3">
                  <input name="name" placeholder="Имя" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600" style={{border:'1px solid rgba(255,255,255,0.1)'}}/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600" style={{border:'1px solid rgba(255,255,255,0.1)'}}/>
                  <select name="botType" required className="w-full h-10 px-3 rounded-md text-[14px] outline-none bg-transparent text-white" style={{border:'1px solid rgba(255,255,255,0.1)'}}><option value="" className="bg-black">Тип бота</option>{BT.map(t=><option key={t.v} value={t.v} className="bg-black">{t.l}</option>)}</select>
                  <textarea name="description" placeholder="Опишите задачу" rows={2} className="w-full px-3 py-2.5 rounded-md text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600 resize-none" style={{border:'1px solid rgba(255,255,255,0.1)'}}/>
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

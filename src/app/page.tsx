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
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
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
      <nav className="fixed top-0 w-full z-50" style={{background:'rgba(10,10,15,0.85)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(139,92,246,0.08)'}}>
        <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="font-semibold text-[15px]">Nox Bots</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-[14px] t2">
            <a href="#features" className="hover:text-white transition-colors">Услуги</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/blog" className="hover:text-white transition-colors">Блог</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={open} className="btn-primary hidden sm:flex !h-9 !px-5 text-[13px]">Заказать</button>
            <button onClick={() => setNav(v => !v)} className="sm:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer" aria-label="Меню">
              <span className={`block h-[1.5px] transition-all duration-300 origin-center ${nav ? 'rotate-45 translate-y-[6.5px] bg-purple-400' : 'w-5 bg-white'}`} style={{width:'20px'}}/>
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${nav ? 'opacity-0 w-0' : 'w-4'}`}/>
              <span className={`block h-[1.5px] transition-all duration-300 origin-center ${nav ? '-rotate-45 -translate-y-[6.5px] bg-purple-400' : 'w-5 bg-white'}`} style={{width:'20px'}}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE NAV ═══ */}
      <div className={`mobile-nav${nav ? ' open' : ''}`}>
        <div className="flex flex-col items-center gap-8 text-[20px]">
          <a href="#features" onClick={closeNav} className="t2 hover:text-white transition-colors">Услуги</a>
          <a href="#pricing" onClick={closeNav} className="t2 hover:text-white transition-colors">Цены</a>
          <a href="#faq" onClick={closeNav} className="t2 hover:text-white transition-colors">FAQ</a>
          <a href="/blog" onClick={closeNav} className="t2 hover:text-white transition-colors">Блог</a>
          <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" onClick={closeNav} className="t2 hover:text-white transition-colors">Telegram</a>
          <button onClick={() => { closeNav(); open(); }} className="btn-primary mt-4 !h-12 !px-10 text-[15px]">Заказать бота</button>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 px-5">
        <div className="hero-bg" />
        <div className="relative max-w-[1100px] mx-auto text-center reveal">
          <div className="inline-block px-4 py-1.5 rounded-full text-[12px] font-medium mb-8" style={{background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.2)',color:'var(--violet)'}}>
            🤖 Telegram-боты с ИИ за 1-3 дня
          </div>
          <h1 className="text-[28px] sm:text-[42px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight mb-5 gradient-text">
            Автоматизируем ваш<br/>бизнес в Telegram
          </h1>
          <p className="text-[15px] sm:text-[17px] t2 max-w-[500px] mx-auto leading-relaxed mb-8">
            Записи, продажи, поддержка — бот делает всё за вас. Используем GPT-4 при разработке, сдаём за дни.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={open} className="btn-primary">Заказать бота</button>
            <a href="#features" className="btn-secondary">Подробнее →</a>
          </div>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="pb-20 px-5">
        <div className="reveal">
          <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap text-[12px] sm:text-[13px] font-medium" style={{color:'var(--text-muted)'}}>
            <span>💇 Салоны красоты</span>
            <span>🛒 E-commerce</span>
            <span>🏥 Клиники</span>
            <span>💻 IT-компании</span>
            <span>🍕 Рестораны</span>
          </div>
        </div>
      </section>

      {/* ═══ CODE BLOCK ═══ */}
      <section className="py-20 sm:py-28 px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-[15px] t2 max-w-[480px] mx-auto leading-relaxed">
              Опишите задачу — получите готового бота с исходным кодом и документацией.
            </p>
          </div>
          <div className="max-w-[650px] mx-auto code-card reveal reveal-d2">
            <div className="flex items-center gap-3 px-5 py-3" style={{borderBottom:'1px solid var(--border)'}}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{background:'#ff5f57'}}></div>
                <div className="w-3 h-3 rounded-full" style={{background:'#febc2e'}}></div>
                <div className="w-3 h-3 rounded-full" style={{background:'#28c840'}}></div>
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
<span className="ln">12</span>{'}'});
</code></pre>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="section-glow py-20 sm:py-28 px-5">
        <div className="max-w-[1100px] mx-auto">

          <div className="text-center mb-14 reveal">
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight mb-3 gradient-text">Что мы делаем</h2>
            <p className="t2 text-[15px] max-w-[460px] mx-auto leading-relaxed">Используем ИИ для создания ботов. За 1-3 дня вместо недель.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            <div className="feat-card reveal">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-[16px] font-semibold mb-2">Бот записи на услуги</h3>
              <p className="t2 text-[13px] leading-relaxed mb-4">Клиенты выбирают услугу, дату, время. Мастер получает уведомление. Напоминание за 1 час.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium" style={{color:'var(--violet)'}}>от 2 500 ₽</span><span className="t3">· 1-2 дня</span></div>
            </div>
            <div className="feat-card reveal reveal-d1">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-[16px] font-semibold mb-2">ИИ чат-бот поддержки</h3>
              <p className="t2 text-[13px] leading-relaxed mb-4">GPT-4 отвечает клиентам 24/7. Обучается на ваших FAQ. Экономит 80% времени.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium" style={{color:'var(--violet)'}}>от 5 000 ₽</span><span className="t3">· 2-3 дня</span></div>
            </div>
          </div>

          {/* Chat mockup */}
          <div className="feat-card mb-14 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] sm:text-[26px] font-bold mb-3">Как выглядит бот записи</h3>
                <p className="t2 text-[14px] leading-relaxed">Клиент записывается за 30 секунд без звонков и ожидания.</p>
              </div>
              <div className="chat-wrap space-y-2.5 p-4 rounded-xl" style={{background:'rgba(139,92,246,0.04)'}}>
                <div className="chat-msg typing-indicator typing-indicator-1 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">👋 Добро пожаловать в Beauty Salon!</div>
                <div className="chat-msg flex gap-2 flex-wrap pl-0">
                  {['✂️ Стрижка','💅 Маникюр','🎨 Окрашивание'].map(x=>(
                    <span key={x} className="px-3 py-1.5 rounded-lg text-[12px]" style={{background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.2)',color:'var(--violet)'}}>{x}</span>
                  ))}
                </div>
                <div className="chat-msg msg msg-user">✂️ Стрижка</div>
                <div className="chat-msg typing-indicator typing-indicator-2 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">Выберите дату:<br/><span className="t2">Пн 25.03 · Вт 26.03 · Ср 27.03</span></div>
                <div className="chat-msg msg msg-user">Вт 26.03</div>
                <div className="chat-msg typing-indicator typing-indicator-3 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">✅ Записаны!<br/>Стрижка · Вт 26.03 · 14:00<br/><span className="t3">Напомним за 1 час</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="feat-card reveal">
              <div className="text-2xl mb-3">🛍</div>
              <h3 className="text-[16px] font-semibold mb-2">Бот-каталог / магазин</h3>
              <p className="t2 text-[13px] leading-relaxed mb-4">Витрина товаров в Telegram. Фото, корзина, оформление. Без комиссий.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium" style={{color:'var(--violet)'}}>от 4 000 ₽</span><span className="t3">· 2-3 дня</span></div>
            </div>
            <div className="feat-card reveal reveal-d1">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-[16px] font-semibold mb-2">CRM / Автоматизация</h3>
              <p className="t2 text-[13px] leading-relaxed mb-4">Воронки продаж, follow-up, отчёты. Sheets, Notion, Airtable интеграции.</p>
              <div className="flex items-center gap-3 text-[13px]"><span className="font-medium" style={{color:'var(--violet)'}}>от 6 000 ₽</span><span className="t3">· 3-5 дней</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ CONTROL ═══ */}
      <section className="py-20 sm:py-28 px-5">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight text-center mb-12 reveal gradient-text">Всё под контролем</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {i:'⚡',t:'ИИ-ускорение',d:'GPT-4 и Claude при разработке. За 1-3 дня.'},
              {i:'💰',t:'Прозрачные цены',d:'Цены на сайте — реальные. Точная стоимость после брифа.'},
              {i:'📦',t:'Ваш код',d:'Полные исходники, документация, все доступы.'},
              {i:'🛡',t:'Поддержка',d:'7-30 дней бесплатно. Хостинг 3 мес.'},
            ].map((x,i)=>(
              <div key={x.t} className={`feat-card text-center reveal reveal-d${(i+1) as 1|2|3|4}`}>
                <div className="text-2xl mb-3">{x.i}</div>
                <h3 className="text-[14px] font-semibold mb-1.5">{x.t}</h3>
                <p className="text-[12px] t2 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="section-glow py-20 sm:py-28 px-5">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight text-center mb-3 reveal gradient-text">Цены</h2>
          <p className="text-center t2 text-[15px] mb-12 reveal reveal-d1">Фиксированная стоимость. Без сюрпризов.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {[
              {n:'Старт',p:'2 500',d:'Простой бот с кнопками',f:['До 10 команд','Уведомления','Деплой','7 дней поддержки'],pop:false},
              {n:'Бизнес',p:'5 000',d:'Бот с ИИ и API',f:['Всё из Старт','GPT-4 / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',p:'10 000',d:'Система под ключ',f:['Всё из Бизнес','CRM / воронка','Аналитика','Мульти-бот','30 дней поддержки'],pop:false},
            ].map((p,i)=>(
              <div key={p.n} className={`rounded-2xl p-6 flex flex-col reveal reveal-d${(i+1) as 1|2|3} ${p.pop ? 'pricing-popular' : 'feat-card'}`}>
                {p.pop&&<span className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{color:'rgba(255,255,255,0.7)'}}>Популярный</span>}
                <h3 className="text-[18px] font-semibold">{p.n}</h3>
                <p className={`text-[13px] mb-4 ${p.pop ? 'opacity-70' : 't3'}`}>{p.d}</p>
                <div className="mb-5"><span className="text-[34px] font-bold">{p.p}</span><span className={`text-[14px] ml-1 ${p.pop ? 'opacity-60' : 't3'}`}>₽</span></div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.f.map(x=>(<li key={x} className={`flex items-center gap-2 text-[13px] ${p.pop ? 'opacity-90' : 't2'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke={p.pop?'#fff':'#8b5cf6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{x}
                  </li>))}
                </ul>
                <button onClick={open} className={`w-full h-11 rounded-xl text-[14px] font-medium cursor-pointer transition-all ${p.pop ? 'bg-white text-purple-700 hover:bg-gray-100' : 'btn-secondary !w-full'}`}>{p.pop ? 'Выбрать' : 'Выбрать'}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="py-20 sm:py-28 px-5">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight text-center mb-12 reveal gradient-text">Результаты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {m:'−60%',l:'пропущенных записей',n:'Марина К.',r:'Салон красоты'},
              {m:'+40%',l:'выручки за месяц',n:'Дмитрий В.',r:'Интернет-магазин'},
              {m:'−80%',l:'нагрузки на поддержку',n:'Алексей С.',r:'IT-агентство'},
            ].map((r,i)=>(
              <div key={r.n} className={`feat-card text-center reveal reveal-d${(i+1) as 1|2|3}`}>
                <div className="text-[32px] font-bold mb-1" style={{color:'var(--violet)'}}>{r.m}</div>
                <p className="text-[13px] t2 mb-4">{r.l}</p>
                <div className="text-[13px]"><span className="font-medium">{r.n}</span> <span className="t3">· {r.r}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="section-glow py-20 sm:py-28 px-5">
        <div className="max-w-[600px] mx-auto text-center reveal">
          <p className="text-[18px] sm:text-[22px] leading-[1.6] mb-6" style={{fontFamily:"'Georgia', serif", color:'var(--text)'}}>
            &ldquo;Бот записи окупился за первую неделю. Клиенты записываются сами, я экономлю 3 часа в день.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold" style={{background:'linear-gradient(135deg, #8b5cf6, #7c3aed)', color:'#fff'}}>М</div>
            <div className="text-left">
              <div className="text-[14px] font-medium">Марина К.</div>
              <div className="text-[12px] t3">Салон красоты</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-20 sm:py-28 px-5">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight text-center mb-12 reveal gradient-text">Вопросы</h2>
          {[
            {q:'Сколько стоит?',a:'От 2 500₽ до 10 000₽. Точную цену назовём после брифа — бесплатно.'},
            {q:'Как быстро?',a:'Простые боты — 1-2 дня. С ИИ — 3-5 дней.'},
            {q:'Передаёте код?',a:'Да. Полные исходники, документация, все доступы.'},
            {q:'Нужен сервер?',a:'Нет. Облачный хостинг. Первые 3 мес бесплатно.'},
            {q:'Гарантия?',a:'7-30 дней поддержки. Не по ТЗ — исправим бесплатно.'},
          ].map((x,i)=>(
            <div key={i} className="reveal" style={{borderBottom:'1px solid var(--border)'}}>
              <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left py-5 flex items-center justify-between cursor-pointer">
                <span className="text-[15px] font-medium pr-6">{x.q}</span>
                <span className="text-[18px] flex-shrink-0 transition-transform" style={{transform:fq===i?'rotate(45deg)':'none', color:'var(--violet)'}}>+</span>
              </button>
              <div className="faq-body" style={{maxHeight:fq===i?'200px':'0',opacity:fq===i?1:0}}>
                <p className="text-[14px] t2 leading-relaxed pb-5">{x.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28 px-5 text-center">
        <div className="reveal max-w-[600px] mx-auto">
          <div className="feat-card !p-10 sm:!p-14" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(124,58,237,0.05))',border:'1px solid rgba(139,92,246,0.2)'}}>
            <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight mb-3 gradient-text">
              Готовы автоматизировать?
            </h2>
            <p className="t2 text-[15px] mb-8">Опишите задачу — ответим за 1 час</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={open} className="btn-primary">Заказать бота</button>
              <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="btn-secondary">Telegram →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 px-5" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] t3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{background:'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
              <span className="text-white text-[10px] font-bold">N</span>
            </div>
            <span className="font-medium text-[13px]" style={{color:'var(--text)'}}>Nox Bots</span>
          </div>
          <div className="flex gap-6"><a href="/blog" className="hover:text-white transition-colors">Блог</a><a href="https://t.me/Visionum" className="hover:text-white transition-colors">Telegram</a></div>
          <span>© 2026</span>
        </div>
      </footer>

      {/* ═══ MODAL ═══ */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.85)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-[420px] rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto" style={{background:'var(--bg-card)',border:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[24px]" style={{background:'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>✓</div>
                <h3 className="text-[18px] font-semibold mb-1">Отправлено!</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся в течение часа</p>
                <button onClick={()=>setM(false)} className="btn-primary">OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-[18px] font-semibold mb-1">Заказать бота</h3>
                <p className="text-[14px] t2 mb-5">Свяжемся за 1 час</p>
                <div className="space-y-3">
                  <input name="name" placeholder="Имя" required className="w-full h-11 px-4 rounded-xl text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600" style={{border:'1px solid var(--border)'}}/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-11 px-4 rounded-xl text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600" style={{border:'1px solid var(--border)'}}/>
                  <select name="botType" required className="w-full h-11 px-4 rounded-xl text-[14px] outline-none bg-transparent text-white" style={{border:'1px solid var(--border)'}}><option value="" className="bg-black">Тип бота</option>{BT.map(t=><option key={t.v} value={t.v} className="bg-black">{t.l}</option>)}</select>
                  <textarea name="description" placeholder="Опишите задачу" rows={3} className="w-full px-4 py-3 rounded-xl text-[14px] outline-none bg-transparent text-white placeholder:text-gray-600 resize-none" style={{border:'1px solid var(--border)'}}/>
                </div>
                <div className="flex gap-3 mt-5">
                  <button type="button" onClick={()=>setM(false)} className="flex-1 h-11 rounded-xl text-[14px] cursor-pointer t2 transition-colors hover:text-white">Отмена</button>
                  <button type="submit" disabled={ld} className="flex-1 btn-primary !rounded-xl" style={{opacity:ld?0.6:1}}>{ld?'...':'Отправить'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

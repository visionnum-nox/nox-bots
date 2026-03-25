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

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50" style={{background:'rgba(9,9,11,0.8)',backdropFilter:'blur(12px)',borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight">nox bots</span>
          <div className="hidden sm:flex items-center gap-7 text-[13px]">
            <a href="#services" className="t2 hover:text-white transition-colors">Услуги</a>
            <a href="#pricing" className="t2 hover:text-white transition-colors">Цены</a>
            <a href="#faq" className="t2 hover:text-white transition-colors">FAQ</a>
            <a href="/blog" className="t2 hover:text-white transition-colors">Блог</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-[13px] t2 hover:text-white transition-colors">Telegram</a>
            <button onClick={open} className="btn-primary !h-8 !px-4 !text-[13px] !rounded-md">Заказать</button>
            <button onClick={() => setNav(v => !v)} className="sm:hidden flex flex-col justify-center gap-[4px] w-7 h-7 cursor-pointer" aria-label="Menu">
              <span className={`block h-px bg-white/60 transition-all duration-200 ${nav ? 'rotate-45 translate-y-[5px] bg-white' : 'w-4'}`} style={{width:nav?16:16}}/>
              <span className={`block h-px bg-white/60 transition-all duration-200 ${nav ? 'opacity-0' : 'w-3'}`}/>
              <span className={`block h-px bg-white/60 transition-all duration-200 ${nav ? '-rotate-45 -translate-y-[5px] bg-white' : 'w-4'}`} style={{width:nav?16:16}}/>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobile-nav${nav ? ' open' : ''}`}>
        <div className="flex flex-col items-center gap-7 text-[18px]">
          <a href="#services" onClick={closeNav} className="t2 hover:text-white">Услуги</a>
          <a href="#pricing" onClick={closeNav} className="t2 hover:text-white">Цены</a>
          <a href="#faq" onClick={closeNav} className="t2 hover:text-white">FAQ</a>
          <a href="/blog" onClick={closeNav} className="t2 hover:text-white">Блог</a>
          <button onClick={() => { closeNav(); open(); }} className="btn-primary mt-4 !h-11 !px-8">Заказать</button>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-6">
        <div className="hero-glow" />
        <div className="relative max-w-[680px] mx-auto text-center reveal">
          <p className="text-[13px] font-medium mb-6" style={{color:'var(--accent-text)'}}>Telegram-боты с ИИ → за 1–3 дня</p>
          <h1 className="text-[32px] sm:text-[44px] md:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] mb-5">
            Автоматизируем<br/>бизнес в Telegram
          </h1>
          <p className="text-[15px] sm:text-[16px] t2 max-w-[440px] mx-auto leading-relaxed mb-8">
            Записи, продажи, поддержка клиентов — бот делает всё за вас. Сдаём с исходным кодом.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={open} className="btn-primary">Заказать бота →</button>
            <a href="#services" className="btn-ghost">Подробнее</a>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="pb-16 sm:pb-20 px-6">
        <div className="reveal">
          <p className="text-center text-[11px] uppercase tracking-widest t3 mb-5">Наши клиенты</p>
          <div className="flex justify-center items-center gap-6 sm:gap-10 flex-wrap text-[13px] t3">
            <span>Салоны красоты</span><span>·</span>
            <span>E-commerce</span><span>·</span>
            <span>Клиники</span><span>·</span>
            <span>IT</span><span>·</span>
            <span>Рестораны</span>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CODE */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-10 reveal">
            <p className="text-[14px] t2 max-w-[400px] mx-auto">Опишите задачу — получите готового бота с документацией.</p>
          </div>
          <div className="max-w-[580px] mx-auto code-block reveal reveal-d1">
            <div className="flex items-center gap-2 px-4 py-2.5" style={{borderBottom:'1px solid var(--border)'}}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              </div>
              <span className="text-[11px] t3 ml-2">bot.js</span>
            </div>
            <pre><code>
<span className="ln"> 1</span><span className="cm">// Бот записи — готов за 1 день</span>{'\n'}
<span className="ln"> 2</span><span className="kw">const</span> bot = <span className="kw">new</span> <span className="fn">TelegramBot</span>(token);{'\n'}
<span className="ln"> 3</span>{'\n'}
<span className="ln"> 4</span>bot.<span className="fn">onText</span>(<span className="str">/start/</span>, (msg) {'=> {'}{'\n'}
<span className="ln"> 5</span>  bot.<span className="fn">send</span>(msg.chat.id, <span className="str">&quot;Добро пожаловать!&quot;</span>, {'{'}{'\n'}
<span className="ln"> 6</span>    reply_markup: {'{'} inline_keyboard: [[{'\n'}
<span className="ln"> 7</span>      {'{'} text: <span className="str">&quot;📅 Записаться&quot;</span> {'}'},{'\n'}
<span className="ln"> 8</span>      {'{'} text: <span className="str">&quot;💬 Поддержка&quot;</span> {'}'}{'\n'}
<span className="ln"> 9</span>    ]] {'}'}{'}'});{'\n'}
<span className="ln">10</span>{'}'});
</code></pre>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section id="services" className="py-16 sm:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight mb-2">Что мы делаем</h2>
            <p className="text-[14px] t2">ИИ при разработке. Сдаём за дни, не недели.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {[
              {i:'📅',t:'Бот записи',d:'Клиент выбирает услугу, дату, время. Мастер получает уведомление.',p:'от 2 500 ₽',time:'1–2 дня'},
              {i:'🤖',t:'ИИ чат-бот',d:'GPT-4 отвечает 24/7. Обучается на ваших FAQ. Экономит 80% времени.',p:'от 5 000 ₽',time:'2–3 дня'},
              {i:'🛍',t:'Магазин',d:'Каталог товаров, корзина, оплата — прямо в Telegram.',p:'от 4 000 ₽',time:'2–3 дня'},
              {i:'📊',t:'CRM-бот',d:'Воронки, follow-up, отчёты. Sheets, Notion интеграции.',p:'от 6 000 ₽',time:'3–5 дней'},
            ].map((s,i)=>(
              <div key={s.t} className={`card reveal reveal-d${(i+1) as 1|2|3|4}`}>
                <div className="text-xl mb-3">{s.i}</div>
                <h3 className="text-[15px] font-semibold mb-1.5">{s.t}</h3>
                <p className="text-[13px] t2 leading-relaxed mb-4">{s.d}</p>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-medium" style={{color:'var(--accent-text)'}}>{s.p}</span>
                  <span className="t3">· {s.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat demo */}
          <div className="card reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col justify-center">
                <h3 className="text-[20px] sm:text-[24px] font-bold mb-2">Бот записи в действии</h3>
                <p className="text-[13px] t2 leading-relaxed">30 секунд — и клиент записан. Без звонков и ожидания.</p>
              </div>
              <div className="chat-wrap space-y-2 p-3 rounded-lg" style={{background:'var(--bg)'}}>
                <div className="chat-msg typing-indicator typing-indicator-1 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">👋 Добро пожаловать!</div>
                <div className="chat-msg flex gap-1.5 flex-wrap pl-0">
                  {['✂️ Стрижка','💅 Маникюр','🎨 Окраска'].map(x=>(
                    <span key={x} className="px-2.5 py-1 rounded-md text-[11px]" style={{background:'var(--accent-soft)',color:'var(--accent-text)',border:'1px solid rgba(99,102,241,0.15)'}}>{x}</span>
                  ))}
                </div>
                <div className="chat-msg msg msg-user">✂️ Стрижка</div>
                <div className="chat-msg typing-indicator typing-indicator-2 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">Дата?<br/><span className="t3 text-[12px]">Пн 25 · Вт 26 · Ср 27</span></div>
                <div className="chat-msg msg msg-user">Вт 26</div>
                <div className="chat-msg typing-indicator typing-indicator-3 msg msg-bot"><div className="typing-dots"><span/><span/><span/></div></div>
                <div className="chat-msg msg msg-bot">✅ Записаны! Вт 26.03, 14:00<br/><span className="t3 text-[11px]">Напомним за час</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* WHY US */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight text-center mb-10 reveal">Почему мы</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {i:'⚡',t:'Быстро',d:'1–3 дня с ИИ-ускорением'},
              {i:'💎',t:'Прозрачно',d:'Цена на сайте = цена в счёте'},
              {i:'📦',t:'Ваш код',d:'Исходники, доступы, документация'},
              {i:'🛡',t:'Поддержка',d:'7–30 дней + хостинг 3 мес'},
            ].map((x,i)=>(
              <div key={x.t} className={`card text-center reveal reveal-d${(i+1) as 1|2|3|4}`}>
                <div className="text-lg mb-2">{x.i}</div>
                <h3 className="text-[13px] font-semibold mb-1">{x.t}</h3>
                <p className="text-[12px] t2">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PRICING */}
      <section id="pricing" className="py-16 sm:py-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-10 reveal">
            <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight mb-2">Цены</h2>
            <p className="text-[14px] t2">Фиксированная стоимость. Без сюрпризов.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
            {[
              {n:'Старт',p:'2 500',d:'Простой бот',f:['До 10 команд','Уведомления','Деплой','7 дней поддержки'],pop:false},
              {n:'Бизнес',p:'5 000',d:'Бот с ИИ',f:['Всё из Старт','GPT-4 / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',p:'10 000',d:'Под ключ',f:['Всё из Бизнес','CRM / воронка','Аналитика','Мульти-бот','30 дней поддержки'],pop:false},
            ].map((p,i)=>(
              <div key={p.n} className={`rounded-xl p-5 flex flex-col reveal reveal-d${(i+1) as 1|2|3} ${p.pop ? '' : 'card'}`}
                style={p.pop ? {background:'var(--accent)',border:'1px solid var(--accent)'} : undefined}>
                {p.pop&&<span className="text-[10px] font-semibold uppercase tracking-wider mb-2 opacity-70">Популярный</span>}
                <h3 className="text-[16px] font-semibold">{p.n}</h3>
                <p className={`text-[12px] mb-3 ${p.pop ? 'opacity-60' : 't3'}`}>{p.d}</p>
                <div className="mb-4"><span className="text-[28px] font-bold">{p.p}</span><span className={`text-[13px] ml-1 ${p.pop ? 'opacity-50' : 't3'}`}>₽</span></div>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.f.map(x=>(<li key={x} className={`flex items-start gap-2 text-[12px] ${p.pop ? 'opacity-90' : 't2'}`}>
                    <span className="mt-0.5">✓</span><span>{x}</span>
                  </li>))}
                </ul>
                <button onClick={open} className={`w-full h-9 rounded-lg text-[13px] font-medium cursor-pointer transition-all ${p.pop ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'btn-ghost !w-full'}`}>Выбрать</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* RESULTS */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight text-center mb-10 reveal">Результаты</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {m:'−60%',l:'пропущенных записей'},
              {m:'+40%',l:'выручки'},
              {m:'−80%',l:'нагрузки'},
            ].map((r,i)=>(
              <div key={r.m} className={`card text-center reveal reveal-d${(i+1) as 1|2|3}`}>
                <div className="text-[24px] sm:text-[28px] font-bold mb-1" style={{color:'var(--accent-text)'}}>{r.m}</div>
                <p className="text-[11px] sm:text-[12px] t2">{r.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TESTIMONIAL */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-[500px] mx-auto text-center reveal">
          <p className="text-[16px] sm:text-[18px] leading-[1.7] mb-5 italic t2">
            &ldquo;Бот окупился за первую неделю. Клиенты записываются сами, экономлю 3 часа в день.&rdquo;
          </p>
          <div className="text-[13px]">
            <span className="font-medium">Марина К.</span>
            <span className="t3"> · Салон красоты</span>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 px-6">
        <div className="max-w-[560px] mx-auto">
          <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight text-center mb-10 reveal">FAQ</h2>
          {[
            {q:'Сколько стоит?',a:'От 2 500 до 10 000 ₽. Точная цена — после брифа (бесплатно).'},
            {q:'Как быстро?',a:'Простые боты — 1–2 дня. С ИИ — 3–5 дней.'},
            {q:'Передаёте код?',a:'Да. Исходники, документация, все доступы.'},
            {q:'Нужен сервер?',a:'Нет. Облачный хостинг. Первые 3 месяца бесплатно.'},
            {q:'Гарантия?',a:'7–30 дней поддержки. Не по ТЗ — исправим.'},
          ].map((x,i)=>(
            <div key={i} className="reveal" style={{borderBottom:'1px solid var(--border)'}}>
              <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left py-4 flex items-center justify-between cursor-pointer">
                <span className="text-[14px] font-medium pr-4">{x.q}</span>
                <span className="text-[16px] flex-shrink-0 transition-transform t2" style={{transform:fq===i?'rotate(45deg)':'none'}}>+</span>
              </button>
              <div className="faq-body" style={{maxHeight:fq===i?'160px':'0',opacity:fq===i?1:0}}>
                <p className="text-[13px] t2 leading-relaxed pb-4">{x.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-6 text-center">
        <div className="reveal">
          <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight mb-3">Готовы начать?</h2>
          <p className="text-[14px] t2 mb-7">Опишите задачу — ответим за час</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={open} className="btn-primary">Заказать бота →</button>
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="btn-ghost">Telegram</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] t3">
          <span className="font-medium text-[13px]" style={{color:'var(--text)'}}>nox bots</span>
          <div className="flex gap-5"><a href="/blog" className="hover:text-white transition-colors">Блог</a><a href="https://t.me/Visionum" className="hover:text-white transition-colors">Telegram</a></div>
          <span>© 2026</span>
        </div>
      </footer>

      {/* MODAL */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.8)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-[400px] rounded-t-xl sm:rounded-xl p-5 max-h-[85vh] overflow-y-auto" style={{background:'var(--bg-card)',border:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-5">
                <div className="text-[32px] mb-3">✓</div>
                <h3 className="text-[16px] font-semibold mb-1">Отправлено</h3>
                <p className="text-[13px] t2 mb-4">Свяжемся в течение часа</p>
                <button onClick={()=>setM(false)} className="btn-primary">OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-[16px] font-semibold mb-0.5">Заказать бота</h3>
                <p className="text-[13px] t2 mb-4">Свяжемся за 1 час</p>
                <div className="space-y-2.5">
                  <input name="name" placeholder="Имя" required className="w-full h-10 px-3 rounded-lg text-[13px] outline-none bg-transparent text-white placeholder:text-white/20" style={{border:'1px solid var(--border)'}}/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-3 rounded-lg text-[13px] outline-none bg-transparent text-white placeholder:text-white/20" style={{border:'1px solid var(--border)'}}/>
                  <select name="botType" required className="w-full h-10 px-3 rounded-lg text-[13px] outline-none bg-transparent text-white" style={{border:'1px solid var(--border)'}}><option value="">Тип бота</option>{BT.map(t=><option key={t.v} value={t.v} style={{background:'#111'}}>{t.l}</option>)}</select>
                  <textarea name="description" placeholder="Опишите задачу" rows={3} className="w-full px-3 py-2 rounded-lg text-[13px] outline-none bg-transparent text-white placeholder:text-white/20 resize-none" style={{border:'1px solid var(--border)'}}/>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={()=>setM(false)} className="flex-1 h-10 rounded-lg text-[13px] cursor-pointer t2">Отмена</button>
                  <button type="submit" disabled={ld} className="flex-1 btn-primary !rounded-lg" style={{opacity:ld?0.6:1}}>{ld?'...':'Отправить'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

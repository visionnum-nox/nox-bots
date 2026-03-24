'use client';
import { useState } from 'react';

const S = [
  { i:'📅', t:'Бот записи', d:'Клиенты записываются сами. Выбор услуги, даты, времени. Уведомление мастеру.', p:'2 500', tm:'1-2 дня' },
  { i:'🛍', t:'Бот-магазин', d:'Каталог в Telegram. Фото, корзина, оплата — без сайта и комиссий маркетплейсов.', p:'4 000', tm:'2-3 дня' },
  { i:'🤖', t:'ИИ чат-бот', d:'GPT-4 отвечает клиентам 24/7. Обучается на ваших FAQ. Минус 80% нагрузки.', p:'5 000', tm:'2-3 дня' },
  { i:'📊', t:'CRM-бот', d:'Воронка продаж, follow-up, задачи — всё в Telegram. Sheets, Notion, Airtable.', p:'6 000', tm:'3-5 дней' },
  { i:'🎯', t:'Лид-бот', d:'Квиз → контакты → квалификация → CRM. Конверсия в 3-5× выше формы на сайте.', p:'3 500', tm:'1-2 дня' },
  { i:'🔔', t:'Мониторинг', d:'Следит за ценами, наличием, курсами. Мгновенные алерты по условиям.', p:'3 000', tm:'1-3 дня' },
];

const FAQ = [
  { q:'Сколько стоит?', a:'От 2 500₽ до 15 000₽. Точную цену назовём после брифа — это бесплатно.' },
  { q:'Как быстро?', a:'1-2 дня простые, 3-5 дней с ИИ. Используем ИИ-ускорение — быстрее рынка.' },
  { q:'Нужен сервер?', a:'Нет. Размещаем на облаке. 3 месяца хостинга бесплатно.' },
  { q:'Гарантия?', a:'7 дней поддержки. Не по ТЗ — исправим бесплатно. Исходники — ваши.' },
];

const BT = [
  {v:'booking',l:'📅 Записи'},{v:'catalog',l:'🛍 Магазин'},{v:'ai',l:'🤖 ИИ-бот'},
  {v:'crm',l:'📊 CRM'},{v:'leads',l:'🎯 Лиды'},{v:'other',l:'📁 Другое'},
];

/* shared inline styles to keep JSX cleaner */
const card = { background:'var(--card)', border:'1px solid var(--b)' };
const dim = { color:'var(--dim)' };
const al = { color:'var(--accent-light)' };
const grad = { background:'linear-gradient(135deg,#7C3AED,#2563EB)' };

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
      <nav className="fixed top-0 w-full z-50" style={{background:'rgba(0,0,0,0.7)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--b)'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 no-underline">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white" style={grad}>N</div>
            <span className="font-semibold text-sm text-white">Nox Bots</span>
          </a>
          <div className="hidden sm:flex gap-5 text-[13px]" style={dim}>
            {['Услуги','Цены','FAQ'].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="no-underline hover:text-white transition-colors" style={dim}>{x}</a>)}
          </div>
          <button onClick={open} className="h-8 px-4 rounded-lg text-xs font-semibold text-white cursor-pointer" style={grad}>Заказать</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-28 px-4 sm:px-6 text-center relative">
        {/* Glow bg */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)'}}/>

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full text-[11px] font-medium mb-7" style={{background:'rgba(124,58,237,0.1)',border:'1px solid rgba(124,58,237,0.2)',...al}}>
            <span className="w-1.5 h-1.5 rounded-full pulse2" style={{background:'var(--accent)'}}/> Принимаем заказы
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-5 sm:mb-7">
            Telegram-боты<br/><span className="gt">для бизнеса</span>
          </h1>

          <p className="text-[15px] sm:text-lg leading-relaxed max-w-md mx-auto mb-9 sm:mb-11" style={dim}>
            Автоматизируем продажи, записи и поддержку. С ИИ — в 3× быстрее и дешевле.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={open} className="shimmer h-12 sm:h-14 px-7 sm:px-8 rounded-xl text-sm sm:text-base font-bold text-white cursor-pointer" style={{...grad,boxShadow:'0 0 40px rgba(124,58,237,0.2)'}}>
              Заказать бота →
            </button>
            <a href="#услуги" className="h-12 sm:h-14 px-7 sm:px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center no-underline" style={{border:'1px solid var(--b)',...dim}}>
              Подробнее ↓
            </a>
          </div>

          <div className="flex justify-center gap-10 sm:gap-14 mt-14 sm:mt-20">
            {[['50+','проектов'],['1-3','дня'],['24/7','работа']].map(([n,l])=>(
              <div key={l}><div className="text-2xl sm:text-3xl font-black gt">{n}</div><div className="text-[11px] mt-1 uppercase tracking-wider" style={dim}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="услуги" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-3" style={al}>Что делаем</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">Типы ботов</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {S.map(s=>(
              <div key={s.t} className="ch rounded-2xl p-5 cursor-pointer" style={card} onClick={open}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.i}</span>
                  <span className="text-[11px] font-bold" style={al}>от {s.p} ₽</span>
                </div>
                <h3 className="text-[15px] font-bold mb-1.5">{s.t}</h3>
                <p className="text-[13px] leading-relaxed mb-2" style={dim}>{s.d}</p>
                <span className="text-[11px]" style={dim}>⏱ {s.tm}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="py-16 sm:py-28 px-4 sm:px-6" style={{background:'#050508'}}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-3" style={al}>Процесс</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">Три шага</h2>

          {[
            {n:'01',t:'Бриф',d:'Описываете задачу → 3-5 вопросов → ТЗ за 30 минут'},
            {n:'02',t:'Разработка',d:'Пишем с ИИ. Вы видите прогресс. Готово за 1-3 дня'},
            {n:'03',t:'Запуск',d:'Тестируете, правим, деплоим. 7 дней поддержки бесплатно'},
          ].map((s,i,a)=>(
            <div key={s.n} className="flex gap-4 sm:gap-5">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{background:'rgba(124,58,237,0.1)',border:'1px solid rgba(124,58,237,0.25)',...al}}>{s.n}</div>
                {i<a.length-1 && <div className="w-px flex-1 my-1.5" style={{background:'var(--b)'}}/>}
              </div>
              <div className="pb-8 sm:pb-12 pt-1">
                <h3 className="text-sm sm:text-base font-bold mb-1">{s.t}</h3>
                <p className="text-[13px] leading-relaxed" style={dim}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="цены" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-3" style={al}>Тарифы</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">Простые цены</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {n:'Старт',pr:'2 500',f:['До 10 команд','Деплой','7 дней поддержки'],pop:false},
              {n:'Бизнес',pr:'5 000',f:['GPT / Claude','API интеграции','Админ-панель','14 дней поддержки'],pop:true},
              {n:'Премиум',pr:'10 000',f:['CRM / воронка','Аналитика','Мульти-бот','30 дней поддержки'],pop:false},
            ].map(p=>(
              <div key={p.n} className="ch rounded-2xl p-5 flex flex-col" style={{...card,...(p.pop?{border:'1.5px solid var(--accent)',boxShadow:'0 0 50px rgba(124,58,237,0.08)'}:{})}}>
                {p.pop && <span className="text-[10px] font-bold uppercase tracking-wider mb-2" style={al}>Популярный</span>}
                <h3 className="text-base font-bold">{p.n}</h3>
                <div className="mt-2 mb-4"><span className="text-3xl font-black gt">{p.pr}</span><span className="text-sm ml-1" style={dim}>₽</span></div>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.f.map(x=><li key={x} className="flex items-center gap-2 text-[13px]" style={dim}><span className="w-1 h-1 rounded-full flex-shrink-0" style={{background:'var(--accent)'}}/>​{x}</li>)}
                </ul>
                <button onClick={open} className="w-full h-10 rounded-xl text-sm font-semibold text-white cursor-pointer" style={p.pop?grad:{background:'transparent',border:'1px solid var(--b)'}}>Выбрать</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 sm:py-28 px-4 sm:px-6" style={{background:'#050508'}}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-3" style={al}>Отзывы</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">Клиенты говорят</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {n:'Марина К.',b:'Салон красоты',t:'Бот записи окупился за первую неделю. Клиенты записываются сами.',a:'М'},
              {n:'Дмитрий В.',b:'E-commerce',t:'Каталог в Telegram конвертирует лучше сайта. Выручка +40%.',a:'Д'},
              {n:'Алексей С.',b:'IT-агентство',t:'ИИ-бот закрывает 80% обращений. Экономим 60К/мес.',a:'А'},
            ].map(r=>(
              <div key={r.n} className="rounded-2xl p-5" style={card}>
                <p className="text-[13px] leading-relaxed mb-4" style={dim}>«{r.t}»</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'rgba(124,58,237,0.1)',...al}}>{r.a}</div>
                  <div><div className="text-sm font-semibold">{r.n}</div><div className="text-[11px]" style={dim}>{r.b}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-3" style={al}>FAQ</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">Вопросы</h2>

          <div className="space-y-2">
            {FAQ.map((x,i)=>(
              <div key={i} className="rounded-xl" style={{...card,...(fq===i?{background:'var(--card)'}:{background:'transparent'})}}>
                <button onClick={()=>setFq(fq===i?null:i)} className="w-full text-left px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-sm">{x.q}</span>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ml-3 transition-transform" style={{background:fq===i?'var(--accent)':'transparent',color:fq===i?'#fff':'var(--dim)',border:fq===i?'none':'1px solid var(--b)',transform:fq===i?'rotate(45deg)':'none'}}>+</span>
                </button>
                <div className="faq-body" style={{maxHeight:fq===i?'150px':'0',opacity:fq===i?1:0}}>
                  <div className="px-4 sm:px-5 pb-3.5 text-[13px] leading-relaxed" style={dim}>{x.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 relative" style={{background:'#050508'}}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)'}}/>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Готовы <span className="gt">автоматизировать</span>?</h2>
          <p className="text-sm sm:text-base mb-8" style={dim}>Оставьте заявку — назовём цену за 15 минут</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={open} className="shimmer h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-bold text-white cursor-pointer" style={{...grad,boxShadow:'0 0 40px rgba(124,58,237,0.2)'}}>Оставить заявку →</button>
            <a href="https://t.me/Visionum" target="_blank" rel="noopener noreferrer" className="h-12 sm:h-14 px-8 rounded-xl text-sm sm:text-base font-medium flex items-center justify-center no-underline" style={{border:'1px solid var(--b)',...dim}}>Telegram</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-4 sm:px-6" style={{borderTop:'1px solid var(--b)'}}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]" style={dim}>
          <div className="flex items-center gap-2"><div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black text-white" style={grad}>N</div><span className="font-semibold text-white text-xs">Nox Bots</span></div>
          <a href="https://t.me/Visionum" className="no-underline" style={dim}>@Visionum</a>
          <span>© 2026</span>
        </div>
      </footer>

      {/* MODAL */}
      {m&&(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{background:'rgba(0,0,0,0.9)'}} onClick={()=>setM(false)}>
          <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={{background:'#08080f',border:'1px solid var(--b)'}} onClick={e=>e.stopPropagation()}>
            {ok?(
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold mb-1">Отправлено</h3>
                <p className="text-[13px] mb-5" style={dim}>Свяжемся за час</p>
                <button onClick={()=>setM(false)} className="h-10 px-6 rounded-xl text-sm font-semibold text-white cursor-pointer" style={grad}>OK</button>
              </div>
            ):(
              <form onSubmit={send}>
                <h3 className="text-lg font-bold mb-1">Заказать бота</h3>
                <p className="text-[13px] mb-4" style={dim}>Свяжемся за 1 час</p>
                <div className="space-y-2.5">
                  <input name="name" placeholder="Имя" required className="w-full h-10 px-4 rounded-xl text-sm outline-none" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--b)',color:'#fff'}}/>
                  <input name="contact" placeholder="Telegram / телефон" required className="w-full h-10 px-4 rounded-xl text-sm outline-none" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--b)',color:'#fff'}}/>
                  <select name="botType" required className="w-full h-10 px-4 rounded-xl text-sm outline-none" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--b)',color:'#fff'}}>
                    <option value="">Тип бота</option>
                    {BT.map(t=><option key={t.v} value={t.v}>{t.l}</option>)}
                  </select>
                  <textarea name="description" placeholder="Опишите задачу" rows={2} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{background:'rgba(255,255,255,0.05)',border:'1px solid var(--b)',color:'#fff'}}/>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={()=>setM(false)} className="flex-1 h-10 rounded-xl text-sm cursor-pointer" style={dim}>Отмена</button>
                  <button type="submit" disabled={ld} className="shimmer flex-1 h-10 rounded-xl text-sm font-bold text-white cursor-pointer" style={{...grad,opacity:ld?0.6:1}}>{ld?'...':'Отправить'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сколько стоит Telegram-бот в 2026 году: реальные цены | Nox Bots",
  description: "Разбираем стоимость разработки Telegram-ботов: Kwork от 1000₽, студии от 30000₽, AI-разработка от 2500₽. Что влияет на цену, как не переплатить.",
  alternates: { canonical: "https://nox-bots.vercel.app/blog/skolko-stoit-telegram-bot" },
};

export default function Article() {
  return (
    <article className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <a href="/blog" className="text-[13px] no-underline mb-6 block" style={{color:'#71717a'}}>← Блог</a>
        <div className="text-[11px] mb-3" style={{color:'#71717a'}}>24 марта 2026 • 5 мин чтения</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Сколько стоит Telegram-бот в 2026 году</h1>

        <div className="space-y-5 text-[15px] leading-relaxed" style={{color:'#a1a1aa'}}>

          <p>Один из самых частых вопросов: <strong className="text-white">«Сколько стоит сделать Telegram-бота?»</strong>. Ответ зависит от сложности, подрядчика и сроков. Разберём подробно.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">Что влияет на стоимость</h2>

          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Тип бота</strong> — простые кнопки стоят меньше, чем ИИ-интеграция</li>
            <li><strong className="text-white">Интеграции</strong> — подключение к CRM, платёжным системам, API</li>
            <li><strong className="text-white">Дизайн</strong> — веб-приложение внутри бота (WebApp) стоит дороже</li>
            <li><strong className="text-white">Админ-панель</strong> — возможность управлять ботом без программиста</li>
            <li><strong className="text-white">Поддержка</strong> — обслуживание после запуска</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">Сравнение цен по рынку</h2>

          <h3 className="text-base font-bold text-white mt-6 mb-2">Kwork и фриланс-биржи</h3>
          <p>Цена: <strong className="text-white">1 000 — 5 000₽</strong>. Сроки: 3-14 дней.</p>
          <p>Плюсы: дёшево. Минусы: непредсказуемое качество, часто без документации, исходники могут не передать, поддержка отсутствует.</p>

          <h3 className="text-base font-bold text-white mt-6 mb-2">Веб-студии</h3>
          <p>Цена: <strong className="text-white">30 000 — 200 000₽</strong>. Сроки: 2-8 недель.</p>
          <p>Плюсы: документация, поддержка, гарантии. Минусы: дорого, долго, часто избыточно для малого бизнеса.</p>

          <h3 className="text-base font-bold text-white mt-6 mb-2">AI-разработка (Nox Bots)</h3>
          <p>Цена: <strong className="text-white" style={{color:'#A78BFA'}}>2 500 — 10 000₽</strong>. Сроки: <strong style={{color:'#A78BFA'}}>1-5 дней</strong>.</p>
          <p>Мы используем ИИ (GPT-4, Claude) для ускорения разработки. Это не шаблоны — каждый бот пишется под задачу. ИИ помогает писать код быстрее, тестировать тщательнее и документировать автоматически.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">Конкретные цены по типам ботов</h2>

          <div className="rounded-xl p-4 my-4" style={{background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.07)'}}>
            <div className="space-y-2 text-[13px]">
              {[
                ['📅 Бот записи на услуги','2 500₽','1-2 дня'],
                ['🛍 Бот-каталог / магазин','4 000₽','2-3 дня'],
                ['🤖 ИИ чат-бот (GPT-4)','5 000₽','2-3 дня'],
                ['📊 CRM-бот','6 000₽','3-5 дней'],
                ['🎯 Бот лидогенерации','3 500₽','1-2 дня'],
                ['🔔 Бот мониторинга','3 000₽','1-3 дня'],
              ].map(([t,p,d])=>(
                <div key={t} className="flex items-center justify-between py-1.5" style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <span className="text-white">{t}</span>
                  <div className="flex gap-4"><span style={{color:'#A78BFA'}}>{p}</span><span style={{color:'#71717a'}}>{d}</span></div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">Как не переплатить</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Чётко опишите задачу — чем конкретнее ТЗ, тем точнее цена</li>
            <li>Спросите про исходный код — обязательно должны передать</li>
            <li>Уточните что входит в поддержку — 7 дней минимум</li>
            <li>Не гонитесь за самой низкой ценой — переделка стоит дороже</li>
          </ol>

          <div className="rounded-xl p-5 my-6 text-center" style={{background:'rgba(124,58,237,0.08)',border:'1px solid rgba(124,58,237,0.2)'}}>
            <p className="text-white font-bold mb-2">Узнать точную цену бесплатно</p>
            <p className="text-[13px] mb-3" style={{color:'#71717a'}}>30-минутный бриф → точная цена и срок</p>
            <a href="https://nox-bots.vercel.app" className="inline-block h-10 px-6 rounded-xl text-sm font-semibold text-white no-underline leading-10" style={{background:'linear-gradient(135deg,#7C3AED,#2563EB)'}}>
              Заказать на сайте →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

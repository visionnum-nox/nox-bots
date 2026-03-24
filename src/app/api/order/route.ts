import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8732171668:AAE8NMwoCoJ8YoBOLxRNdtXVILzXsZYcCjI';
const CHAT_ID = '159679992'; // Vision's DM

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, botType, description } = body;

    if (!name || !contact || !botType) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const typeLabels: Record<string, string> = {
      booking: '📅 Бот записи на услуги',
      catalog: '🛍 Бот-каталог / магазин',
      ai_chat: '🤖 ИИ чат-бот / поддержка',
      crm: '📊 Бот-CRM / автоматизация',
      leads: '🎯 Бот для лидогенерации',
      monitoring: '🔔 Бот уведомлений',
      other: '📁 Другое',
    };

    const text = `🔔 НОВЫЙ ЗАКАЗ с сайта!\n\n` +
      `👤 Клиент: ${name}\n` +
      `📱 Контакт: ${contact}\n` +
      `🤖 Тип: ${typeLabels[botType] || botType}\n` +
      `${description ? `📝 Описание: ${description}\n` : ''}` +
      `\n⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' })}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

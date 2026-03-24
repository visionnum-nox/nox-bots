import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8732171668:AAE8NMwoCoJ8YoBOLxRNdtXVILzXsZYcCjI';
const CHAT_ID = '159679992'; // Vision's DM
const NOXDESK_URL = 'https://noxdesk.vercel.app/api/orders';
const NOXDESK_SECRET = process.env.NOXDESK_API_SECRET || 'noxdesk-secret-2026';

const typeLabels: Record<string, string> = {
  booking: '📅 Бот записи на услуги',
  catalog: '🛍 Бот-каталог / магазин',
  ai: '🤖 ИИ чат-бот / поддержка',
  crm: '📊 Бот-CRM / автоматизация',
  leads: '🎯 Бот для лидогенерации',
  monitoring: '🔔 Бот уведомлений',
  other: '📁 Другое',
};

const typeToNoxDesk: Record<string, string> = {
  booking: 'bot', catalog: 'bot', ai: 'ai_agent',
  crm: 'bot', leads: 'bot', monitoring: 'bot', other: 'other',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, botType, description } = body;

    if (!name || !contact || !botType) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' });

    // 1. Telegram notification to Vision
    const text = `🔔 НОВЫЙ ЗАКАЗ с сайта!\n\n` +
      `👤 Клиент: ${name}\n` +
      `📱 Контакт: ${contact}\n` +
      `🤖 Тип: ${typeLabels[botType] || botType}\n` +
      `${description ? `📝 Описание: ${description}\n` : ''}` +
      `\n⏰ ${now}`;

    const tgPromise = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    // 2. Send to NoxDesk
    const noxdeskPromise = fetch(NOXDESK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NOXDESK_SECRET}`,
      },
      body: JSON.stringify({
        client: name,
        contact,
        title: `${typeLabels[botType] || botType}`,
        description: description || '',
        type: typeToNoxDesk[botType] || 'other',
        price: 0,
      }),
    });

    // Fire both in parallel
    await Promise.allSettled([tgPromise, noxdeskPromise]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import type { Request, Response } from 'express';
import OpenAI from 'openai';
import { z } from 'zod';
import { AIChatRequest } from '@erp/shared/src/index.js';

const bodySchema = AIChatRequest;

export async function chatHandler(req: Request, res: Response) {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const messages = parsed.data.messages;

  if (!apiKey) {
    // Deterministic mock
    const last = messages[messages.length - 1];
    const reply = last.content.length > 200 ? last.content.slice(0, 200) + '…' : last.content;
    return res.json({ reply: `Echo: ${reply}` });
  }

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages.map((m) => ({ role: m.role, content: m.content }))
  });
  const text = completion.choices[0]?.message?.content ?? '';
  res.json({ reply: text });
}
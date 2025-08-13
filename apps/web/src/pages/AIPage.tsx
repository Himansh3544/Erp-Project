import { useState } from 'react';
import { apiFetch } from '../lib/auth';

type Message = { role: 'user' | 'assistant'; content: string };

export function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input } as Message];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await apiFetch<{ reply: string }>(`/api/ai/chat`, {
        method: 'POST',
        body: JSON.stringify({ messages: next })
      });
      setMessages((m) => [...m, { role: 'assistant', content: res.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">AI Assistant</h2>
      <div className="bg-white rounded shadow p-4 h-[60vh] overflow-y-auto space-y-3">
        {messages.length === 0 && <p className="text-gray-500">Start the conversation…</p>}
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded ${m.role === 'user' ? 'bg-blue-50' : 'bg-green-50'}`}>
            <div className="text-xs text-gray-500 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask anything about your ERP data…"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button disabled={loading} onClick={send} className="bg-primary text-white rounded px-3 py-2">
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { supabase, FUNCTION_NAME } from './supabase';

export function useChat(userId) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [convId, setConvId] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase.from('conversations').select('id')
        .order('created_at', { ascending: false }).limit(1);
      if (!c || !c.length) return;
      setConvId(c[0].id);
      const { data: m } = await supabase.from('messages').select('role, content')
        .eq('conversation_id', c[0].id).order('created_at', { ascending: true });
      setMessages(m || []);
    })();
  }, []);

  const newChat = () => { setConvId(null); setMessages([]); };

  const save = (cid, role, content) =>
    supabase.from('messages').insert({ conversation_id: cid, user_id: userId, role, content });

  const send = async () => {
    const q = text.trim();
    if (!q || sending) return;
    setText(''); setSending(true);
    const history = [...messages, { role: 'user', content: q }];
    setMessages(history);
    try {
      let cid = convId;
      if (!cid) {
        const { data, error } = await supabase.from('conversations')
          .insert({ user_id: userId, title: q.slice(0, 40) }).select('id').single();
        if (error) throw error;
        cid = data.id; setConvId(cid);
      }
      await save(cid, 'user', q);
      const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, { body: { messages: history } });
      if (error) throw error;
      const reply = data?.reply || 'تعذّر الحصول على إجابة.';
      setMessages([...history, { role: 'assistant', content: reply }]);
      await save(cid, 'assistant', reply);
    } catch (e) {
      setMessages([...history, { role: 'assistant', content: 'حدث خطأ: ' + (e.message || e) }]);
    }
    setSending(false);
  };

  return { messages, text, setText, sending, send, newChat };
}

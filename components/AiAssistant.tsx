import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { chatWithGemini } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: '阿北阿木好！我是這次來幫妹妹的專屬導遊。關於京都、大阪的行程、天氣或美食，都可以問我喔！🤗' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await chatWithGemini(userMsg.text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: replyText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: "連線有點問題，請稍後再試。" };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "明天行程重點是什麼？",
    "清水寺附近有什麼好吃的？",
    "現在天氣如何？",
    "幫我翻譯「請給我熱水」"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      <div className="px-4 py-2 text-center border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-lg font-bold text-stone-800 flex items-center justify-center gap-2">
          <Sparkles size={18} className="text-sakura-400" />
          AI 隨身導遊
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-stone-800 text-white rounded-br-none' 
                : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1 text-sakura-500 font-bold text-xs uppercase tracking-wider">
                  <Bot size={14} /> AI 導遊
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-sm border border-stone-100 flex items-center gap-2">
              <Loader2 size={18} className="animate-spin text-sakura-400" />
              <span className="text-stone-400 text-sm">正在思考中...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only if few messages) */}
      {messages.length < 3 && !isLoading && (
        <div className="px-4 py-2 overflow-x-auto whitespace-nowrap no-scrollbar space-x-2">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setInput(s)}
              className="inline-block px-3 py-1.5 bg-white border border-sakura-200 text-sakura-600 rounded-full text-xs font-medium shadow-sm active:bg-sakura-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-200 pb-24">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="問問導遊..."
            className="flex-1 bg-stone-100 border-transparent focus:bg-white focus:border-sakura-300 focus:ring-0 rounded-full py-3 pl-5 pr-12 transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-sakura-500 text-white rounded-full shadow-md disabled:opacity-50 disabled:shadow-none hover:bg-sakura-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
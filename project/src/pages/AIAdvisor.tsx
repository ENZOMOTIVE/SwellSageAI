import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AIAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your SwellSage AI advisor. I can help you optimize your restaking strategy, analyze market conditions, and answer questions about LRTs and AVS protocols. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const exampleQuestions = [
    "What's the best strategy for low-risk restaking?",
    "Compare SwellETH and eETH performance",
    "How can I maximize my yield with $5000?",
    "Explain Proof of Restake in simple terms"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are SwellSage, an expert AI advisor specializing in Ethereum restaking strategies, 
            particularly focused on Swellchain's ecosystem. You help users optimize their yield through 
            strategic allocation across different LRT protocols and AVS services. Always provide specific, 
            actionable advice based on current market conditions and risk profiles. Include specific APY 
            numbers and token allocations when relevant.`
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: "user",
            content: input
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again."
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please make sure your OpenAI API key is configured correctly in the settings."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col bg-surface rounded-xl border border-surface-2 overflow-hidden">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-primary" />
                </div>
              )}
              
              <div 
                className={`rounded-2xl px-4 py-3 max-w-[75%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-surface-2 text-text rounded-tl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-secondary" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="bg-surface-2 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-primary" />
                  <span className="text-sm text-text-secondary">Generating response...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 py-3 bg-surface-2/50 border-t border-surface-2">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm text-text-secondary mb-2">Try asking:</h3>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 bg-surface-2 hover:bg-surface text-sm rounded-lg border border-surface transition-colors"
                  onClick={() => handleExampleClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="p-4 border-t border-surface-2 bg-surface">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about restaking strategies, yield optimization, or market insights..."
              className="input-field w-full pr-12"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
          
          {!import.meta.env.VITE_OPENAI_API_KEY && (
            <div className="mt-2 text-xs text-error italic">
              Please add your OpenAI API key in Settings to enable AI responses
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AIAdvisor;
import { useState } from 'react';
import { marked } from 'marked'; // Updated import

// Remember you are using Open Router to use DeepSeekR1, Here is the website link: https://openrouter.ai/deepseek/deepseek-r1:free/api

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponse('Please enter a message.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY}`,
            'HTTP-Referer': 'https://learn-together-six.vercel.app', // Hardcoded for production
            'X-Title': 'Learn Together', // Updated app name
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1:free',
            messages: [{ role: 'user', content: input }],
          }),
        });

      const data = await res.json();
      const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
      setResponse(marked.parse(markdownText)); // Now using the correct marked import
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 rounded-lg shadow-lg border border-green-400 w-2/3 bg-gray-800 text-gray-100
           transition-all duration-200 hover:shadow-teal-400/10 focus-within:shadow-teal-400/20
           prose prose-invert prose-headings:font-display prose-p:leading-relaxed
           prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-ul:list-disc prose-ol:list-decimal
           backdrop-blur-sm bg-opacity-80 mt-8">
      <h2 className="text-lg text-white  text-gray-800 mb-4">Ask anything</h2>
      
      <div className="flex gap-2 mb-4">
      <div
  contentEditable
  onInput={(e) => setInput(e.target.textContent)}
  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
  placeholder="Chat..."
  className="flex-1 px-4 py-2 bg-gray-800 border text-white border-gray-600 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400
            min-h-[44px] empty:before:content-[attr(placeholder)] empty:before:text-gray-400
            whitespace-pre-wrap text-base"
/>
<button
  onClick={sendMessage}
  disabled={isLoading}
  className="h-[44px] w-[80px] shrink-0 text-sm bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400
            truncate self-end" // ← Ensures text never wraps
>
  {isLoading ? "Thinking..." : "Ask"}
</button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      )}

      {response && (
        <div 
          className="p-4 bg-gray-50 rounded-lg prose max-w-none text-black" 
          dangerouslySetInnerHTML={{ __html: response }}
        />
      )}
    </div>
  );
};

export default ChatBot;
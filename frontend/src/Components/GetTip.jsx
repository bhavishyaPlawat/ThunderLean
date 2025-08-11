import React, { useState, useRef, useEffect } from 'react';
import { IoClose, IoSparkles, IoSend, IoSyncOutline } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const GetTip = ({ isOpen, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleGetTip = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setUserInput('');

    try {
      const response = await axios.post(
        'https://thunderlean-backend.onrender.com/api/ai/get-tip',
        { prompt: userInput },
        { timeout: 60000 }
      );
      const aiMessage = { role: 'ai', content: response.data.tip };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'ai',
        content: "Sorry, I couldn't fetch a tip right now. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
      console.error('Error fetching tip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markdownComponents = {
    p: (props) => <p className="mb-2 last:mb-0" {...props} />,
    ul: (props) => <ul className="list-disc list-inside space-y-1 pl-2" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside space-y-1 pl-2" {...props} />,
    li: (props) => <li className="text-gray-300" {...props} />,
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#181818] text-white shadow-2xl z-50 border-l border-gray-700/50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <header className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <IoSparkles className="text-green-400" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <IoClose size={24} />
        </button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-6">
        {chatHistory.length === 0 && (
          <div className="text-center text-gray-500 pt-10">
            <IoSparkles size={48} className="mx-auto mb-2 text-gray-600" />
            <p>Ask anything about fitness or nutrition!</p>
          </div>
        )}
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <IoSparkles size={16} />
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-green-600 rounded-br-none'
                  : 'bg-[#282828] rounded-bl-none'
              }`}
            >
              <div className="text-gray-200 leading-relaxed">
                <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
              <IoSparkles size={16} />
            </div>
            <div className="max-w-xs md:max-w-sm px-4 py-3 rounded-2xl bg-[#282828] rounded-bl-none">
              <IoSyncOutline className="animate-spin h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
        <div className="flex items-center space-x-2 bg-[#282828] border border-gray-600 rounded-lg px-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask AI Assistant..."
            className="w-full bg-transparent p-2 text-white placeholder-gray-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGetTip();
              }
            }}
          />
          <button
            onClick={handleGetTip}
            disabled={isLoading || !userInput.trim()}
            className="p-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetTip;

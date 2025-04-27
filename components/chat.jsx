import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../zstore/userStore";

const ChatComponent = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [characterImage, setCharacterImage] = useState("");
  const navigate = useNavigate();

  const chatId = useUserStore((state) => state.chatId);

  // Character images mapping (you can expand this)
  const characterImages = {
    "Tony Stark": "https://example.com/tony-stark.jpg",
    "Hermione Granger": "https://example.com/hermione.jpg",
    // Add more character-image mappings
  };

  useEffect(() => {
    const storedChatId = localStorage.getItem("chatId");
    const storedTitle = localStorage.getItem("chatTitle");
    
    if (!storedChatId || !storedTitle) {
      navigate("/create-chat");
      return;
    }

    setChatId(storedChatId);
    setTitle(storedTitle);
    
    // Set character image based on title
    const character = Object.keys(characterImages).find(char => 
      storedTitle.includes(char)
    );
    if (character) {
      setCharacterImage(characterImages[character]);
    }
  }, [navigate]);

  const handleSend = async () => {
    if (!userPrompt.trim()) return;

    try {
      setLoading(true);
      
      // Add user message to chat
      const userMessage = { sender: "user", content: userPrompt };
      setMessages(prev => [...prev, userMessage]);
      
      const res = await axios.post("http://localhost:3000/first/send", {
        chatId,
        title,
        userPrompt,
      });

      const aiResponse = res.data.chat.messages.at(-1).content;
      const aiMessage = { sender: "character", content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      
      setUserPrompt("");
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        sender: "system", 
        content: "Sorry, there was an error processing your request." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto p-4 flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            {characterImage && (
              <img 
                src={characterImage} 
                alt={title}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
            )}
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-gray-400">Movie Character AI</p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/create-chat")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
          >
            New Chat
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-center p-6 max-w-md">
                <h2 className="text-2xl font-bold mb-2">Start a conversation with {title}</h2>
                <p className="mb-4">Ask questions, discuss their movies, or imagine new adventures together!</p>
                <div className="text-left space-y-2 text-sm">
                  <p className="font-medium">Try asking:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>What was your most challenging moment?</li>
                    <li>Tell me about your relationship with [other character]</li>
                    <li>What would you do differently if you could?</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-3xl rounded-lg p-4 ${message.sender === "user" 
                    ? "bg-blue-600 rounded-br-none" 
                    : message.sender === "character"
                      ? "bg-gray-700 rounded-bl-none"
                      : "bg-red-900"}`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="relative">
            <textarea
              placeholder={`Message ${title}...`}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-4 pr-16 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              rows={3}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !userPrompt.trim()}
              className={`absolute right-3 bottom-3 p-2 rounded-full ${loading || !userPrompt.trim() 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-yellow-500 hover:bg-yellow-400"}`}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Press Shift+Enter for a new line. Enter to send.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
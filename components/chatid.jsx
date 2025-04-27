import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../zstore/userStore';

const CreateChat = () => {
  const [character, setCharacter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = useUserStore((state) => state.userId);
  const setChatId = useUserStore((state) => state.setChatId);

  // Popular movie characters for suggestions
  const popularCharacters = [
    "Tony Stark (Iron Man)",
    "Hermione Granger",
    "Darth Vader",
    "Forrest Gump",
    "Wonder Woman",
    "Jack Sparrow",
    "Marty McFly"
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCreateChat = async () => {
    if (!character.trim()) {
      setError("Please select or enter a character");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/user/create", {
        userId,
        title: character
      });

      setChatId(chatId);
      localStorage.setItem("chatTitle", character);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to start conversation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 text-white border-b border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-2">Movie Character AI</h1>
          <p className="text-xl text-center opacity-90">
            Have conversations with your favorite movie characters!
          </p>
        </div>

        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Who would you like to chat with?</h2>
            <p className="text-gray-400">
              Select a character below or enter your own favorite movie personality
            </p>
          </div>

          {/* Character Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose a character:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {popularCharacters.map((char) => (
                <button
                  key={char}
                  onClick={() => setCharacter(char)}
                  className={`p-3 rounded-lg border transition-all ${character === char 
                    ? 'bg-blue-900/50 border-blue-500 shadow-inner text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-blue-400 text-gray-200'}`}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Or enter your own:
              </label>
              <input
                type="text"
                placeholder="E.g. Harry Potter, Black Panther, etc."
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleCreateChat}
            disabled={loading || !character.trim()}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg transition-all ${loading || !character.trim() 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-blue-700 hover:bg-blue-600 shadow-lg hover:shadow-xl'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting Conversation...
              </span>
            ) : (
              "Start Chatting!"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border-l-4 border-red-500 text-red-200">
              <p>{error}</p>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-medium text-center text-white mb-4">
              What you can do:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center border border-gray-600">
                <div className="text-blue-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <h4 className="font-medium mb-1 text-white">Ask Questions</h4>
                <p className="text-sm text-gray-400">Get answers in character</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center border border-gray-600">
                <div className="text-purple-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                </div>
                <h4 className="font-medium mb-1 text-white">Hear Stories</h4>
                <p className="text-sm text-gray-400">Learn behind-the-scenes tales</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center border border-gray-600">
                <div className="text-indigo-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="font-medium mb-1 text-white">Role Play</h4>
                <p className="text-sm text-gray-400">Imagine new adventures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
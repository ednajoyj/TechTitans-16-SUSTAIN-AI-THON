import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hi! I'm your empathetic chat companion. How are you feeling today?",
      sender: "Bot"
    }
  ]);
  const [input, setInput] = useState('');

  const chatRules = {
    greetings: {
      patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hi there! How are you feeling today?",
        "Hello! I'm here to chat. How's your day going?",
        "Hey! I'm all ears - how are you doing right now?"
      ]
    },
    sadness: {
      patterns: ['sad', 'depressed', 'down', 'unhappy', 'terrible', 'awful', 'bad day'],
      responses: [
        {
          message: "I hear you're feeling down. Sometimes listening to uplifting music can help. Would you like me to suggest a happy song?",
          suggestion: "🎵 Try listening to 'Here Comes the Sun' by The Beatles or 'Happy' by Pharrell Williams!"
        },
        {
          message: "I'm sorry you're feeling this way. Remember that it's okay to not be okay. Would you like to hear a gentle joke to lift your spirits?",
          suggestion: "Why don't scientists trust atoms? Because they make up everything! 😊"
        }
      ]
    },
    stress: {
      patterns: ['stressed', 'anxious', 'overwhelmed', 'worried', 'panic', 'pressure'],
      responses: [
        {
          message: "I can tell you're under a lot of pressure. Let's take a moment to breathe together.",
          suggestion: "Try this: Take 3 deep breaths, counting to 4 as you inhale and 6 as you exhale. 🫁"
        }
      ]
    },
    happiness: {
      patterns: ['happy', 'great', 'amazing', 'wonderful', 'good', 'excited'],
      responses: [
        "That's fantastic! Your positive energy is contagious! 🌟",
        "I'm so glad you're feeling good! What's the highlight of your day so far?"
      ]
    },
    default: [
      "I'm here to listen. Could you tell me more about how you're feeling?",
      "I want to understand better. Could you explain what's on your mind?"
    ]
  };

  const findResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    for (const [category, data] of Object.entries(chatRules)) {
      if (category === 'default') continue;
      
      const matchesPattern = data.patterns?.some(pattern => 
        lowercaseInput.includes(pattern)
      );
      
      if (matchesPattern && data.responses?.length > 0) {
        const responses = data.responses;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        if (typeof randomResponse === 'object') {
          return [randomResponse.message, randomResponse.suggestion];
        }
        return [randomResponse];
      }
    }
    
    const defaultResponses = chatRules.default;
    return [defaultResponses[Math.floor(Math.random() * defaultResponses.length)]];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      message: input,
      sender: "User"
    };

    setMessages(prev => [...prev, userMessage]);
    
    const responses = findResponse(input);
    
    responses.forEach((response, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          message: response,
          sender: "Bot"
        }]);
      }, (index + 1) * 1000);
    });

    setInput('');
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "User"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
// Health.jsx
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MoodTracker from './MoodTracker';
import Chatbot from './Chatbot';
import RewardSystem from './RewardSystem';
import MascotCharacter from './MascotCharacter';

const Health = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [rewards, setRewards] = useState(0);
  const [streakData,setStreakData]= useState(0);


  const handleMoodSubmit = (mood) => {
    setMoodHistory(prev => [...prev, {
      date: new Date().toLocaleDateString(),
      mood: mood
    }]);
    
    if (mood > 3) {
      setRewards(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0">

        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Mental Health Buddy
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tab.Group>
          <Tab.List className="flex space-x-4 rounded-2xl bg-white/60 backdrop-blur-sm p-2 shadow-lg mb-8">
            {['Mood Tracker', 'Chat Support', 'Progress'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-xl py-3 text-sm font-medium leading-5 transition-all duration-200 ease-out
                  ${selected 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            <Tab.Panel className="transform transition-all duration-300 ease-out">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <MoodTracker onMoodSubmit={handleMoodSubmit} />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <MascotCharacter mood={moodHistory[moodHistory.length - 1]?.mood || 3} />
                </div>
              </div>
            </Tab.Panel>
            
            <Tab.Panel className="transform transition-all duration-300 ease-out">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <Chatbot />
              </div>
            </Tab.Panel>
            
            <Tab.Panel className="transform transition-all duration-300 ease-out">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Mood History</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer>
                      <LineChart data={moodHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#64748B"
                          tick={{ fill: '#64748B' }}
                        />
                        <YAxis 
                          domain={[0, 5]} 
                          stroke="#64748B"
                          tick={{ fill: '#64748B' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="url(#colorMood)" 
                          strokeWidth={2}
                          dot={{ fill: '#6366F1', strokeWidth: 2 }}
                          activeDot={{ r: 8, fill: '#4F46E5' }}
                        />
                        <defs>
                          <linearGradient id="colorMood" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#A855F7" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <RewardSystem rewards={rewards} />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
};

export default Health;
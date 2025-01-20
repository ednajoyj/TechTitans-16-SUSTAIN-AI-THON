// MascotCharacter.jsx
import React from 'react';

const MascotCharacter = ({ mood }) => {
  const getMessage = (mood) => {
    switch (mood) {
      case 1:
        return "I'm here for you. Remember, tough times don't last forever.";
      case 2:
        return "Things will get better. Let's focus on self-care today.";
      case 3:
        return "You're doing okay! Take it one step at a time.";
      case 4:
        return "Great to see you're feeling good! Keep up the positive energy!";
      case 5:
        return "Amazing! Your happiness is contagious!";
      default:
        return "I'm here to support you on your journey!";
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 1: return "😢";
      case 2: return "😐";
      case 3: return "🙂";
      case 4: return "😊";
      case 5: return "🥰";
      default: return "🙂";
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-6xl">{getMoodEmoji(mood)}</span>
      </div>
      <p className="text-lg font-medium mb-2">Your Buddy Says:</p>
      <p className="text-gray-600">{getMessage(mood)}</p>
    </div>
  );
};

export default MascotCharacter;
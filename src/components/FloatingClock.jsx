import React, { useState, useEffect } from 'react';

function FloatingClock() {
  const [time, setTime] = useState(new Date());
  const [showDeadlines, setShowDeadlines] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const deadlines = [
    {
      day: 'Monday',
      tasks: [
        { time: '10:00', desc: 'Praktikum OS' },
        { time: '22.00', desc: 'Submit CS OS' }
      ]
    },
    {
      day: 'Tuesday',
      tasks: [
        { time: '23:55', desc: 'Submit TP DMJ' },
        { time: '23:55', desc: 'Submit TP SBD' }
      ]
    },
    {
      day: 'Wednesday',
      tasks: [
        { time: '10:00', desc: 'Praktikum SBD' },
        { time: '16:00', desc: 'Praktikum DMJ' },
        { time: '23:55', desc: 'Submit Tutam OS' }
      ]
    },
    {
      day: 'Thursday',
      tasks: [
        { time: '20:00', desc: 'Post Test SBD' },
        { time: '23:59', desc: 'Submit TP MBD' },
      ]
    },
    {
      day: 'Friday',
      tasks: [
        { time: '10:00', desc: 'Praktikum MBD' },
        { time: '23:59', desc: 'Laporan MBD' },
      ]
    },
    {
      day: 'Saturday',
      tasks: [
        { time: '23:55', desc: 'Submit Tutam SBD' },
        { time: '23:55', desc: 'Submit Tutam DMJ' }
      ]
    },
    {
      day: 'Sunday',
      tasks: [
        { time: '23:55', desc: 'Submit TP OS' }
      ]
    }
  ];

// Update time every second
useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const today = new Date().getDay();
  const todayDeadlines = deadlines[today - 1] || {};

  const toggleShowDeadlines = () => setShowDeadlines(!showDeadlines);
  const toggleShowMore = () => setShowMore(!showMore);
  const toggleHide = () => setIsHidden(!isHidden);

  if (isHidden) {
    return (
      <div 
        className="fixed top-16 right-5 z-50 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg text-white transform transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-12"
        onClick={toggleHide}
      >
        <div className="w-10 h-10 flex justify-center items-center animate-pulse">
          <span style={{ fontSize: '20px' }}>⏰</span>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          !
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-16 right-5 z-50 bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-lg text-white font-bold text-sm transform transition-all duration-300 border border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black animate-spin-slow">
            <span style={{ fontSize: '18px' }}>⌚</span>
          </div>
          <span className="ml-2 text-lg font-mono bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {formattedTime}
          </span>
        </div>
        <button 
          onClick={toggleHide}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors transform hover:rotate-180 duration-300"
          title="Hide clock"
        >
          <span style={{ fontSize: '16px' }}>❌</span>
        </button>
      </div>

      {/* Show deadlines section */}
      <div className="mt-4">
        <button 
          onClick={toggleShowDeadlines}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full w-full text-center text-sm hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
        >
          Show Deadlines for Today
        </button>
        
        {showDeadlines && (
          <div className="mt-2 bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              {todayDeadlines.day}
            </h3>
            <ul className="mt-2 text-sm">
              {todayDeadlines.tasks && todayDeadlines.tasks.length > 0 ? (
                todayDeadlines.tasks.map((task, index) => (
                  <li key={index} className="text-white mb-1 flex items-center">
                    <span className="mr-2">🎯</span>
                    <strong className="text-blue-400">{task.time}:</strong>
                    <span className="ml-2">{task.desc}</span>
                  </li>
                ))
              ) : (
                <li className="text-green-400 flex items-center">
                  <span className="mr-2">🌟</span>
                  No tasks today!
                </li>
              )}
            </ul>

            {todayDeadlines.tasks && todayDeadlines.tasks.length > 3 && (
              <button 
                onClick={toggleShowMore}
                className="mt-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-1 rounded-full w-full text-center text-sm hover:from-teal-600 hover:to-cyan-700 transition-all duration-300"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}

            {showMore && todayDeadlines.tasks.slice(3).map((task, index) => (
              <li key={index} className="text-white mb-1 flex items-center">
                <span className="mr-2">🎯</span>
                <strong className="text-blue-400">{task.time}:</strong>
                <span className="ml-2">{task.desc}</span>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingClock;
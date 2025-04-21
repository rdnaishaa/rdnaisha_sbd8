import { useState, useEffect, useRef } from 'react';
import { Clock, Calendar } from 'lucide-react';

function Schedule() {
    const [animateSection, setAnimateSection] = useState(false);
    const sectionRef = useRef(null);
    
    // Array of days
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Sample schedule data
    const scheduleData = [
        {
            day: "Monday",
            color: "bg-blue-500",
            tasks: [
                { time: "10:00 AM", desc: "Praktikum OS", type: "praktikum", until: "22:00" },
                { time: "10:00 AM", desc: "Tutam OS", type: "tutam" }
            ]
        },
        {
            day: "Tuesday",
            color: "bg-purple-500",
            tasks: [
                { time: "11:55 PM", desc: "DL TP SBD", type: "deadline" },
                { time: "11:55 PM", desc: "DL TP DMJ", type: "deadline" }
            ]
        },
        {
            day: "Wednesday",
            color: "bg-green-500",
            tasks: [
                { time: "10:00 AM", desc: "Praktikum SBD", type: "praktikum", until: "21:00" },
                { time: "8:00 PM", desc: "Tutam SBD", type: "tutam" },
                { time: "4:00 PM", desc: "Praktikum DMJ", type: "praktikum" },
                { time: "11:55 PM", desc: "DL Tutam OS", type: "deadline" }
            ]
        },
        {
            day: "Thursday",
            color: "bg-orange-500",
            tasks: [
                { time: "10:00 AM", desc: "TP OS", type: "pendahuluan" },
                { time: "8:00 PM", desc: "Post Test SBD", type: "test" },
                { time: "12:00 PM", desc: "Tutam DMJ", type: "tutam" },
                { time: "11:59 PM", desc: "DL TP MBD", type: "deadline" }
            ]
        },
        {
            day: "Friday",
            color: "bg-red-500",
            tasks: [
                { time: "10:00 AM", desc: "Praktikum MBD", type: "praktikum" },
                { time: "11:59 PM", desc: "DL Laporan MBD", type: "deadline" }
            ]
        },
        {
            day: "Saturday",
            color: "bg-yellow-500",
            tasks: [
                { time: "11:55 PM", desc: "DL Tutam SBD", type: "deadline" },
                { time: "11:55 PM", desc: "DL Tutam DMJ", type: "deadline" }
            ]
        },
        {
            day: "Sunday",
            color: "bg-pink-500",
            tasks: [
                { time: "11:55 PM", desc: "DL TP OS", type: "deadline" },
                { time: "10:00 AM", desc: "TP SBD", type: "pendahuluan" },
                { time: "10:00 AM", desc: "TP DMJ", type: "pendahuluan" },
                { time: "11:59 PM", desc: "TP MBD", type: "pendahuluan" }
            ]
        }
    ];
    // Active day state
    const [activeDay, setActiveDay] = useState('Monday');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateSection(true);
                }
            },
            { threshold: 0.1 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section 
            id="schedule" 
            ref={sectionRef}
            className={`py-24 relative overflow-hidden transition-all duration-1000 ${
                animateSection ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Background effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 dark:opacity-15 animate-pulse"
                        style={{
                            width: `${Math.random() * 250 + 50}px`,
                            height: `${Math.random() * 250 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: '#EC4899', // Pink color for variety
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${Math.random() * 5 + 5}s`
                        }}
                    />
                ))}
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-4xl font-bold text-center mb-2 text-pink-500">
                    My Weekly Schedule
                </h2>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
                    Find when and where your classes take place
                </p>
                <div className={`w-24 h-1 bg-gradient-to-r bg-pink-500 mx-auto my-6 rounded-full`}></div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="flex flex-wrap">
                        {/* Day selector tabs */}
                        <div className="w-full md:w-1/4">
                            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 flex items-center text-pink-500">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Days
                                </h3>
                                <ul className="space-y-2">
                                    {days.map(day => (
                                        <li key={day}>
                                            <button
                                                onClick={() => setActiveDay(day)}
                                                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                                    activeDay === day 
                                                        ? 'bg-pink-500 text-white font-medium'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        {/* Schedule content */}
                        <div className="w-full md:w-3/4">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-6 flex items-center text-pink-500">
                                    <Clock className="w-5 h-5 mr-2" />
                                    {activeDay}'s Schedule
                                </h3>
                                
                                {scheduleData.find(item => item.day === activeDay)?.tasks.length > 0 ? (
                                    <div className="space-y-6">
                                        {scheduleData
                                            .find(item => item.day === activeDay)
                                            .tasks.map((task, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex flex-col sm:flex-row sm:items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transform transition-all hover:scale-102 hover:shadow-md"
                                                >
                                                    <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                                                        <div className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-lg px-3 py-1 text-sm font-medium">
                                                            {task.time}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                                            {task.desc}
                                                        </h4>
                                                        {task.until && (
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                Until: {task.until}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 dark:text-gray-400">No tasks scheduled for {activeDay}.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Schedule;

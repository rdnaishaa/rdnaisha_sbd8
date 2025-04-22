import { useEffect, useState, useRef } from 'react';
import { Search, Code, Coffee, Star, BookOpen } from 'lucide-react';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import QuoteGenerator from './components/QuoteGenerator';
import FloatingClock from './components/FloatingClock';
import ContactForm from './components/ContactForm';
import Subjects from './components/Subject';
import Logo from './assets/Logo.svg';
import './App.css';

function App() {
    // Menghilangkan state darkMode karena kita akan selalu pakai dark mode
    const [isHovered, setIsHovered] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [animateHero, setAnimateHero] = useState(false);
    const [achievements] = useState([]);

    const heroRef = useRef(null);

    // Pastikan dark mode selalu aktif
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateHero(true);
                }
            },
            { threshold: 0.1 }
        );
        
        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    // Menghapus DarkModeToggle component karena tidak lagi dibutuhkan

    const SearchBar = () => (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
            <div className="flex items-center bg-gray-800 rounded-full shadow-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-gray-200 w-64"
                    autoFocus={showSearch}
                />
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setShowSearch(false);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-200"
                >
                    X
                </button>
            </div>
        </div>
    );

    const AchievementBadges = () => (
        <div className="fixed top-8 right-8 z-40">
            <div className="flex space-x-2">
                {achievements.map(achievement =>
                    <div
                        key={achievement.id}
                        className={`rounded-full p-2 transition-all duration-300 ${
                            achievement.achieved
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                        } tooltip-container`}
                    >
                        {achievement.icon}
                        <span className="tooltip">{achievement.title}</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="relative">
            {/* Ubah Navbar props, hapus setDarkMode, jadikan darkMode selalu true */}
            <Navbar darkMode={true} />
            
            <button
                className="fixed top-16 left-8 z-50 p-3 rounded-full bg-gray-800 shadow-lg"
                onClick={() => setShowSearch(!showSearch)}
            >
                <Search className="w-5 h-5 text-pink-500"/>
            </button>
            
            <SearchBar />
            <AchievementBadges />
            
            {/* Hapus kelas conditional untuk transisi warna, selalu gunakan bg-gray-900 */}
            <main className="bg-gray-900 text-gray-100">
                <section
                    id="home"
                    ref={heroRef}
                    className={`min-h-screen flex items-center justify-center relative pt-16 overflow-hidden transition-all duration-1000 ${
                        animateHero ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute rounded-full opacity-20 animate-float-${i % 5 + 1}`}
                                style={{
                                    width: `${Math.random() * 300 + 50}px`,
                                    height: `${Math.random() * 300 + 50}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: '#EC4899',
                                    animationDelay: `${i * 0.5}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                        <div className="lg:flex lg:items-center lg:justify-center text-center">
                            <div className="lg:w-1/2">
                            <h1 className="text-6xl font-bold text-white">
                                    Welcome to Netlab
                                </h1>
                                <p className="text-2xl mb-8 text-gray-300">
                                    A cutting-edge research and development center for network systems, data
                                    management, and operations.
                                </p>
                                <div className="space-x-4 mt-6">
                                    <a href="#schedule"
                                        className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transform transition hover:scale-105 shadow-lg"
                                    >
                                        Explore Our Schedule
                                    </a>
                                    <a href="#contact"
                                        className="inline-block border border-pink-500 hover:bg-pink-500 text-pink-500 hover:text-white font-medium py-3 px-6 rounded-lg transform transition hover:scale-105"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                                <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-6">
                                    <img src={Logo} alt="NetLab Logo" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Subjects 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                />

                <Schedule />
                <QuoteGenerator />
                <ContactForm />
                <FloatingClock />
            </main>

        </div>
    );
}

export default App;
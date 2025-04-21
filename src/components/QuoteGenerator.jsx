import React, { useState } from 'react';
import { Zap, Sparkles, Code, Coffee, Server, Cpu, Wifi, Terminal, Bug, AlertCircle } from 'lucide-react';

function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pulse, setPulse] = useState(false);
  
  const quotes = [
    { 
      text: "lebih baik ngoding sampai pagi daripada tidur yang cuma 5 menit tapi mimpi ngoding",
      icon: <Cpu className="w-6 h-6 text-pink-400" />
    },
    { 
      text: "ngoding itu kayak makan pedas, makin lama makin terbiasa, tapi tetap aja nangis",
      icon: <Zap className="w-6 h-6 text-pink-500" />
    },
    { 
      text: "debugging: tempat di mana waktu dan harapan pergi mati",
      icon: <Bug className="w-6 h-6 text-pink-600" />
    },
    { 
      text: "tanya aja sama Google, dia juga bingung",
      icon: <Terminal className="w-6 h-6 text-indigo-400" />
    },
    { 
      text: "sukses itu gak datang dengan mudah, kecuali kamu ngoding dan berharap error-nya ngilang sendiri",
      icon: <Sparkles className="w-6 h-6 text-pink-300" />
    },
    { 
      text: "dimana paket-paket dan semangat hidup tersesat bersama",
      icon: <Server className="w-6 h-6 text-indigo-500" />
    },
    { 
      text: "kopi dingin, laptop panas, debugging jalan terus sampai kantuk hilang",
      icon: <Coffee className="w-6 h-6 text-amber-600" />
    },
    { 
      text: "TCP handshake gagal? sama kayak nembak gebetan, butuh retry berkali-kali",
      icon: <Wifi className="w-6 h-6 text-indigo-400" />
    },
    { 
      text: "404: Motivasi Not Found",
      icon: <AlertCircle className="w-6 h-6 text-pink-500" />
    },
    { 
      text: "packet Loss: sama seperti otak saya saat praktikum jam 10 pagi",
      icon: <Code className="w-6 h-6 text-indigo-500" />
    }
  ];

  const generateQuote = () => {
    setIsLoading(true);
    setPulse(true);
    
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setIsLoading(false);
      setPulse(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg max-w-md mx-auto border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-pink-500 mb-2">
          Netlab Motivator
        </h1>
        <p className="text-gray-600 dark:text-gray-300">biar semangat yaa praktikumnya...</p>
      </div>
      
      <button 
        onClick={generateQuote}
        disabled={isLoading}
        className={`relative overflow-hidden bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg 
          hover:bg-pink-600 hover:to-gray-400 
          ${pulse ? 'animate-pulse' : ''}`}
        style={{ boxShadow: isLoading ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none' }}        


      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Beri Saya Motivasi!
            </>
          )}
        </span>
      </button>
      
      {quote && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 w-full transition-all duration-500 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
              {quote.icon}
            </div>
            <p className="text-gray-800 dark:text-gray-200 text-lg italic">"{quote.text}"</p>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">by R. Aisha Syauqi Ramadhani - 2306250554</p>
        <div className={`w-24 h-1 bg-gradient-to-r bg-pink-500 mx-auto my-6 rounded-full`}></div>
      </div>
    </div>
  );
}

export default QuoteGenerator;
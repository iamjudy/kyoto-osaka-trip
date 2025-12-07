import React, { useState } from 'react';
import { ItineraryView } from './components/ItineraryView';
import { ExpenseTracker } from './components/ExpenseTracker';
import { AiAssistant } from './components/AiAssistant';
import { Tab } from './types';
import { APP_NAME } from './constants';
import { Calendar, Wallet, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ITINERARY);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.ITINERARY:
        return <ItineraryView />;
      case Tab.EXPENSES:
        return <ExpenseTracker />;
      case Tab.AI_ASSISTANT:
        return <AiAssistant />;
      default:
        return <ItineraryView />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans max-w-md mx-auto shadow-2xl relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Changed font to font-serif to match the itinerary title */}
        <h1 className="text-xl font-serif font-bold text-stone-800 tracking-tight">{APP_NAME}</h1>
        <div className="text-xs font-medium px-2 py-1 bg-sakura-100 text-sakura-600 rounded-md font-sans">
          Family Trip
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {/* Increased height, added padding-bottom, and removed the separate obscuring div */}
      <nav className="sticky bottom-0 w-full bg-white border-t border-stone-200 pb-8 pt-3 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveTab(Tab.ITINERARY)}
            className={`flex flex-col items-center justify-center space-y-1 w-16 transition-all duration-200 group ${
              activeTab === Tab.ITINERARY ? 'text-sakura-500' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Calendar size={activeTab === Tab.ITINERARY ? 26 : 24} strokeWidth={activeTab === Tab.ITINERARY ? 2.5 : 2} className="transition-transform group-active:scale-90" />
            <span className="text-[10px] font-bold">行程</span>
          </button>

          <button
            onClick={() => setActiveTab(Tab.AI_ASSISTANT)}
            className={`flex flex-col items-center justify-center space-y-1 w-16 transition-all duration-200 group ${
              activeTab === Tab.AI_ASSISTANT ? 'text-sakura-500' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === Tab.AI_ASSISTANT ? 'bg-sakura-100' : 'bg-stone-100 group-hover:bg-stone-200'}`}>
               <Sparkles size={24} className={`transition-transform group-active:scale-90 ${activeTab === Tab.AI_ASSISTANT ? 'fill-sakura-400 text-sakura-500' : 'text-stone-400'}`} />
            </div>
            <span className="text-[10px] font-bold">AI 導遊</span>
          </button>

          <button
            onClick={() => setActiveTab(Tab.EXPENSES)}
            className={`flex flex-col items-center justify-center space-y-1 w-16 transition-all duration-200 group ${
              activeTab === Tab.EXPENSES ? 'text-sakura-500' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Wallet size={activeTab === Tab.EXPENSES ? 26 : 24} strokeWidth={activeTab === Tab.EXPENSES ? 2.5 : 2} className="transition-transform group-active:scale-90" />
            <span className="text-[10px] font-bold">記帳</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
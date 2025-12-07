
import React, { useState, useRef, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { MapPin, Camera, Coffee, ShoppingBag, Train, Plane, Utensils, Landmark, Moon, Sun, Cloud, CloudRain, CloudSun, BedDouble, ChevronDown, ChevronUp } from 'lucide-react';
import { weatherService } from '../services/weatherService';
import { WeatherForecast, FlightInfo } from '../types';

const IconMap: Record<string, React.ReactNode> = {
  Plane: <Plane size={18} />,
  Train: <Train size={18} />,
  Utensils: <Utensils size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
  Landmark: <Landmark size={18} />,
  Camera: <Camera size={18} />,
  Coffee: <Coffee size={18} />,
  Moon: <Moon size={18} />,
  Sunset: <Sun size={18} />,
  Bus: <Train size={18} />,
  Castle: <Landmark size={18} />,
  Trees: <MapPin size={18} />,
  Flower: <MapPin size={18} />,
  Gift: <ShoppingBag size={18} />,
  Bed: <BedDouble size={18} />
};

const WeatherIcon: Record<string, React.ReactNode> = {
  Sunny: <Sun size={24} className="text-amber-400 fill-amber-400" />,
  Cloudy: <Cloud size={24} className="text-stone-400 fill-stone-100" />,
  PartlyCloudy: <CloudSun size={24} className="text-amber-400" />,
  Rain: <CloudRain size={24} className="text-blue-400" />
};

// Flight Card Component
const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-stone-100 pt-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs font-bold text-sakura-600 hover:text-sakura-700 transition-colors mb-2"
      >
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {isOpen ? '收起航班詳情' : '查看航班詳情'}
      </button>

      {isOpen && (
        <div className="bg-[#fff9f0] rounded-xl p-4 text-[#4a3b32] font-sans border border-[#e6dac8] relative overflow-hidden animate-slide-up">
           {/* Decorative Airline Logo Placeholder */}
           <div className="flex items-center gap-2 mb-4 border-b border-[#e6dac8] pb-2">
              <Plane className="text-[#968370]" size={16} />
              <span className="font-bold text-lg">{flight.airlineCode}</span>
              <span className="text-xs ml-auto text-[#968370]">{flight.duration}</span>
           </div>
           
           <div className="flex justify-between items-center mb-1">
              <div className="text-center">
                 <div className="text-2xl font-bold mb-1">{flight.departureTime}</div>
                 <div className="text-xl font-bold text-[#968370]">{flight.departureAirport}</div>
                 <div className="text-xs text-[#968370] mt-1">{flight.departureCity}</div>
                 {flight.departureTerminal && <div className="text-xs mt-1 text-stone-500">{flight.departureTerminal}</div>}
              </div>

              <div className="flex-1 px-4 flex flex-col items-center">
                 <div className="text-xs text-[#968370] mb-1">{flight.date}</div>
                 <div className="w-full h-[1px] bg-[#968370] relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-[#968370] transform rotate-45"></div>
                 </div>
              </div>

              <div className="text-center">
                 <div className="text-2xl font-bold mb-1">{flight.arrivalTime}</div>
                 <div className="text-xl font-bold text-[#968370]">{flight.arrivalAirport}</div>
                 <div className="text-xs text-[#968370] mt-1">{flight.arrivalCity}</div>
                 {flight.arrivalTerminal && <div className="text-xs mt-1 text-stone-500">{flight.arrivalTerminal}</div>}
              </div>
           </div>

           <div className="mt-4 pt-2 border-t border-[#e6dac8] space-y-1">
              <p className="text-xs text-[#968370]">{flight.airlineName}</p>
              <p className="text-xs text-[#968370]">{flight.aircraft}</p>
              {flight.co2 && <p className="text-[10px] text-[#bcaaa0]">≒ {flight.co2}</p>}
           </div>
        </div>
      )}
    </div>
  );
};

export const ItineraryView: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedDay = ITINERARY_DATA[selectedIndex];

  // Fetch Weather Logic
  useEffect(() => {
    let isMounted = true;
    
    const fetchWeather = async () => {
      // Show mock data first
      setWeatherData(selectedDay.weather);
      
      // Try to get real data
      const realData = await weatherService.getForecast(selectedDay);
      if (isMounted) {
        setWeatherData(realData);
      }
    };

    fetchWeather();

    return () => { isMounted = false; };
  }, [selectedDay]);

  const getDayDetails = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      dayName: days[date.getDay()],
      dayNum: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  return (
    <div className="pb-24 pt-2 animate-fade-in bg-stone-50 min-h-full">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 text-center">
        <h2 className="text-xs font-bold tracking-widest text-stone-400 mb-1 uppercase font-sans">Family Trip</h2>
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-4">{selectedDay.dayTitle}</h1>
        <div className="inline-block px-3 py-1 bg-stone-200 rounded-full text-xs font-bold text-stone-600 font-sans">2025</div>
      </div>

      {/* Date Selector */}
      <div className="mb-8 overflow-x-auto no-scrollbar px-4">
        <div className="flex space-x-3 min-w-max" ref={scrollRef}>
          {ITINERARY_DATA.map((day, index) => {
            const isActive = selectedIndex === index;
            const { dayName, dayNum, month } = getDayDetails(day.date);
            
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-col items-center justify-center w-[72px] h-[90px] rounded-xl transition-all duration-300 flex-shrink-0 font-sans ${
                  isActive 
                    ? 'bg-stone-800 text-white shadow-lg scale-105' 
                    : 'bg-white text-stone-400 border border-stone-100 hover:border-stone-300'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-stone-400' : 'text-stone-400'}`}>
                  {dayName}
                </span>
                <span className={`text-2xl font-bold leading-none mb-1 ${isActive ? 'text-white' : 'text-stone-800'}`}>
                  {dayNum}
                </span>
                <span className="text-[10px] font-medium">
                  {month}.
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather Forecast Strip */}
      <div className="px-6 mb-8">
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2">
            {weatherData.map((w, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[3rem]">
                    <span className="text-xs text-stone-400 font-sans">{w.time}</span>
                    <div className="h-8 flex items-center justify-center">
                        {WeatherIcon[w.condition] || <Sun size={24} />}
                    </div>
                    <span className="text-lg font-bold text-stone-800 font-serif">{w.temp}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6">
        <div className="relative border-l-2 border-stone-200 ml-3 space-y-8 pb-4">
          {selectedDay.events.map((event, index) => (
            <div key={index} className="relative pl-8">
              {/* Dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${event.highlight ? 'bg-sakura-500' : 'bg-stone-400'}`}></div>
              
              {/* Content Card */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-400 font-mono bg-stone-100 px-2 py-0.5 rounded">{event.time}</span>
                </div>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
                  {/* Icon Watermark */}
                  <div className="absolute -right-2 -bottom-2 text-stone-50 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform">
                     {event.icon && React.isValidElement(IconMap[event.icon]) && 
                        React.cloneElement(IconMap[event.icon] as React.ReactElement<{ size: number }>, { size: 64 })}
                  </div>

                  <h4 className={`text-base font-bold mb-1 relative z-10 font-serif ${event.highlight ? 'text-sakura-600' : 'text-stone-800'}`}>
                    {event.title}
                  </h4>
                  <p className="text-stone-500 text-sm leading-relaxed relative z-10 font-sans whitespace-pre-wrap">
                    {event.description}
                  </p>
                  
                  {event.location && (
                    <div className="mt-2 mb-1">
                      <a 
                        href={event.locationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors relative z-10 font-sans"
                      >
                        <MapPin size={12} />
                        {event.location}
                      </a>
                    </div>
                  )}
                  
                  {event.flight && <FlightCard flight={{...event.flight, date: selectedDay.date}} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Separate Hotel Card */}
      {selectedDay.hotel && (
        <div className="px-6 mt-4 mb-8">
            <div className="flex items-center gap-2 mb-2 ml-3">
               <BedDouble size={16} className="text-sakura-500" />
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Accommodation</span>
            </div>
            <div className="bg-stone-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-serif font-bold text-lg mb-1">{selectedDay.hotel.name}</h3>
                    {selectedDay.hotel.note && (
                        <p className="text-stone-400 text-xs mb-3 font-mono">{selectedDay.hotel.note}</p>
                    )}
                    <a 
                      href={selectedDay.hotel.locationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <MapPin size={12} />
                      View Map
                    </a>
                </div>
                <BedDouble className="absolute -right-4 -bottom-4 text-stone-700 opacity-50" size={100} />
            </div>
        </div>
      )}

      <div className="text-center pt-4 pb-4">
        <p className="text-stone-400 text-xs font-serif italic">Have Fun! 🌸</p>
      </div>
    </div>
  );
};

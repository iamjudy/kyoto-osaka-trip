
export enum Tab {
  ITINERARY = 'ITINERARY',
  EXPENSES = 'EXPENSES',
  AI_ASSISTANT = 'AI_ASSISTANT'
}

export enum Payer {
  ME = '我',
  DAD = '爸爸',
  MOM = '媽咪'
}

export enum ExpenseCategory {
  TRANSPORT = 'Transport',
  HOTEL = 'Hotel',
  ENTERTAINMENT = 'Entertainment',
  FOOD = 'Food',
  SHOPPING = 'Shopping',
  OTHER = 'Other'
}

export interface Expense {
  id: string;
  item: string;
  amount: number;
  payer: Payer;
  date: string;
  category: ExpenseCategory;
}

export interface FlightInfo {
  airlineCode: string; // e.g., JX822
  airlineName: string; // STARLUX AIRLINES
  aircraft: string; // AIRBUS A350-900
  departureTime: string; // 09:20
  arrivalTime: string; // 12:50
  departureAirport: string; // TPE
  arrivalAirport: string; // KIX
  departureCity: string; // 台北
  arrivalCity: string; // 大阪
  departureTerminal?: string; // 1 航廈
  arrivalTerminal?: string; // 1 航廈
  duration: string; // 2 小時 30 分鐘
  co2?: string;
  date?: string;
}

export interface HotelInfo {
  name: string;
  note?: string; // e.g., "15:00後可入住"
  locationUrl: string;
}

export interface ItineraryEvent {
  time: string;
  title: string;
  description: string;
  location?: string;
  locationUrl?: string; // Support direct Google Maps URL
  image?: string; // URL to an image for this event
  notes?: string; // New field for user custom notes/links
  icon?: string; // Icon name
  highlight?: boolean;
  flight?: FlightInfo; // Optional flight details
}

export type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rain' | 'PartlyCloudy';

export interface WeatherForecast {
  time: string;
  temp: string;
  condition: WeatherCondition;
}

export interface DayItinerary {
  dayTitle: string;
  date: string; // ISO format e.g., "2025-12-17"
  weather: WeatherForecast[];
  events: ItineraryEvent[];
  hotel?: HotelInfo; // Separate hotel info
}
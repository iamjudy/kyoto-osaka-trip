
import { DayItinerary, WeatherForecast, WeatherCondition } from '../types';

// Coordinates
const COORDS = {
  KYOTO: { lat: 35.0116, lng: 135.7681 },
  OSAKA: { lat: 34.6937, lng: 135.5023 },
};

// Map WMO Weather Codes to our app's WeatherCondition
// https://open-meteo.com/en/docs
const mapWmoCodeToCondition = (code: number): WeatherCondition => {
  if (code === 0) return 'Sunny';
  if (code >= 1 && code <= 3) return 'PartlyCloudy';
  if (code >= 45 && code <= 48) return 'Cloudy';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 80 && code <= 82) return 'Rain';
  if (code >= 95) return 'Rain'; // Thunderstorm
  return 'Cloudy';
};

// Determine location based on Date
const getLocationForDay = (dateStr: string) => {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();

  // 17, 18, 19 -> Kyoto
  if (dayOfMonth >= 17 && dayOfMonth <= 19) {
    return COORDS.KYOTO;
  }
  // 20, 21, 22 -> Osaka (Defaulting others to Osaka as well for this trip)
  return COORDS.OSAKA;
};

export const weatherService = {
  getForecast: async (day: DayItinerary): Promise<WeatherForecast[]> => {
    const targetDate = new Date(day.date);
    const today = new Date();
    
    // Calculate difference in days
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Open-Meteo provides forecast for up to 14 days free.
    // If the trip is too far in the future (like 2025), we return the Mock Data (fallback).
    // If the trip is within range (e.g. user opens app 1 week before trip), we fetch real data.
    const isWithinForecastRange = diffDays >= 0 && diffDays < 14;

    if (!isWithinForecastRange) {
      console.log(`Date ${day.date} is too far for real forecast. Using mock data.`);
      return day.weather; // Return the static mock data from constants
    }

    try {
      const location = getLocationForDay(day.date);
      console.log(`Fetching real weather for ${day.date} at location lat:${location.lat}...`);
      
      // API Call to Open-Meteo
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&hourly=temperature_2m,weathercode&timezone=Asia%2FTokyo&start_date=${day.date}&end_date=${day.date}`
      );
      
      const data = await response.json();

      if (!data.hourly) {
        throw new Error("No hourly data");
      }

      // Transform API data to our format
      // We only want specific hours: 09:00, 12:00, 15:00, 18:00, 21:00
      const targetHours = [9, 12, 15, 18, 21];
      const realForecast: WeatherForecast[] = [];

      data.hourly.time.forEach((timeStr: string, index: number) => {
        const dateObj = new Date(timeStr);
        const hour = dateObj.getHours();

        if (targetHours.includes(hour)) {
           const temp = Math.round(data.hourly.temperature_2m[index]);
           const code = data.hourly.weathercode[index];
           
           realForecast.push({
             time: `${hour.toString().padStart(2, '0')}:00`,
             temp: `${temp}°`,
             condition: mapWmoCodeToCondition(code)
           });
        }
      });

      return realForecast.length > 0 ? realForecast : day.weather;

    } catch (error) {
      console.error("Failed to fetch real weather, falling back to mock:", error);
      return day.weather;
    }
  }
};

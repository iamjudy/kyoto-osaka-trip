
import { DayItinerary, Payer, ExpenseCategory } from './types';

export const APP_NAME = "🍣 跟爹娘遊京版";

export const PAYER_OPTIONS = [Payer.ME, Payer.DAD, Payer.MOM];
export const CATEGORY_OPTIONS = Object.values(ExpenseCategory);

export const ITINERARY_DATA: DayItinerary[] = [
  {
    dayTitle: "抵達與大阪初體驗",
    date: "2025-12-17",
    weather: [
      { time: "09:00", temp: "9°", condition: "Cloudy" },
      { time: "12:00", temp: "11°", condition: "Cloudy" },
      { time: "15:00", temp: "10°", condition: "Sunny" },
      { time: "18:00", temp: "8°", condition: "Cloudy" },
      { time: "21:00", temp: "6°", condition: "Cloudy" }
    ],
    hotel: {
      name: "三井花園飯店 京都四條",
      note: "15:00 後可 Check-in",
      locationUrl: "https://maps.app.goo.gl/eKNtsDVV9RgUmwnQ9"
    },
    events: [
      { 
        time: "09:20", 
        title: "台北 前往 大阪", 
        description: "星宇航空 JX822\n預計 12:50 抵達關西機場第一航廈", 
        icon: "Plane", 
        location: "關西國際機場",
        highlight: true,
        flight: {
          airlineCode: "JX822",
          airlineName: "STARLUX AIRLINES JX822",
          aircraft: "AIRBUS A350-900",
          departureTime: "09:20",
          arrivalTime: "12:50",
          departureAirport: "TPE",
          arrivalAirport: "KIX",
          departureCity: "台北",
          arrivalCity: "大阪",
          departureTerminal: "1 航廈",
          arrivalTerminal: "1 航廈",
          duration: "2 小時 30 分鐘",
          co2: "135 kg CO2e"
        }
      },
      { time: "13:30", title: "前往京都", description: "搭乘 HARUKA 關空特急前往京都車站", icon: "Train" },
      { time: "15:30", title: "錦市場散步", description: "體驗京都廚房，吃章魚燒、豆乳甜甜圈", location: "錦市場", icon: "Utensils" },
      { time: "18:00", title: "鴨川納涼", description: "在河岸邊散步，享受晚餐", icon: "Sunset", location: "鴨川" },
    ]
  },
  {
    dayTitle: "經典京都寺廟巡禮",
    date: "2025-12-18",
    weather: [
      { time: "08:00", temp: "7°", condition: "Sunny" },
      { time: "11:00", temp: "12°", condition: "Sunny" },
      { time: "14:00", temp: "13°", condition: "PartlyCloudy" },
      { time: "17:00", temp: "9°", condition: "Cloudy" },
      { time: "20:00", temp: "6°", condition: "Cloudy" }
    ],
    hotel: {
      name: "三井花園飯店 京都四條",
      locationUrl: "https://maps.app.goo.gl/eKNtsDVV9RgUmwnQ9"
    },
    events: [
      { time: "09:00", title: "清水寺", description: "世界遺產，清水舞台景色絕美 (早起避免人潮)", highlight: true, icon: "Landmark", location: "清水寺" },
      { time: "11:30", title: "二年坂、三年坂", description: "古色古香的街道，買伴手禮", icon: "ShoppingBag", location: "三年坂" },
      { time: "13:00", title: "午餐：湯豆腐", description: "順正湯豆腐 (已預約)", icon: "Utensils", location: "順正湯豆腐" },
      { time: "15:00", title: "伏見稻荷大社", description: "千本鳥居拍照", icon: "Camera", location: "伏見稻荷大社" },
    ]
  },
  {
    dayTitle: "嵐山自然風光",
    date: "2025-12-19",
    weather: [
      { time: "09:00", temp: "8°", condition: "Cloudy" },
      { time: "12:00", temp: "10°", condition: "Cloudy" },
      { time: "15:00", temp: "9°", condition: "Rain" },
      { time: "18:00", temp: "7°", condition: "Rain" },
      { time: "21:00", temp: "6°", condition: "Rain" }
    ],
    hotel: {
      name: "東急大阪卓越大飯店",
      note: "14:00 後可 Check-in",
      locationUrl: "https://maps.app.goo.gl/MEkbi29fXS5QZFmc7"
    },
    events: [
      { time: "09:30", title: "嵐山竹林之道", description: "享受竹林清幽氛圍", icon: "Trees", location: "嵐山竹林小徑" },
      { time: "11:00", title: "天龍寺", description: "曹源池庭園賞景", icon: "Flower", location: "天龍寺" },
      { time: "12:30", title: "嵐山大街午餐", description: "廣川鰻魚飯 (若排隊太長則換家)", icon: "Utensils", location: "嵐山廣川" },
      { time: "14:30", title: "渡月橋", description: "散步拍照", icon: "Camera", location: "渡月橋" },
    ]
  },
  {
    dayTitle: "大阪活力一日遊",
    date: "2025-12-20",
    weather: [
      { time: "09:00", temp: "10°", condition: "Sunny" },
      { time: "12:00", temp: "14°", condition: "Sunny" },
      { time: "15:00", temp: "13°", condition: "Sunny" },
      { time: "18:00", temp: "11°", condition: "PartlyCloudy" },
      { time: "21:00", temp: "9°", condition: "Cloudy" }
    ],
    hotel: {
      name: "東急大阪卓越大飯店",
      locationUrl: "https://maps.app.goo.gl/MEkbi29fXS5QZFmc7"
    },
    events: [
      { time: "10:00", title: "大阪城公園", description: "參觀天守閣，歷史巡禮", icon: "Castle", location: "大阪城天守閣" },
      { time: "13:00", title: "心齋橋購物", description: "藥妝店採購，跑跑人看板拍照", icon: "ShoppingBag", location: "心齋橋筋商店街" },
      { time: "17:00", title: "梅田藍天大廈", description: "欣賞大阪夜景", highlight: true, icon: "Moon", location: "梅田藍天大廈" },
    ]
  },
  {
    dayTitle: "環球影城一日遊",
    date: "2025-12-21",
    weather: [
      { time: "08:00", temp: "8°", condition: "Sunny" },
      { time: "12:00", temp: "12°", condition: "Sunny" },
      { time: "15:00", temp: "11°", condition: "PartlyCloudy" },
      { time: "18:00", temp: "9°", condition: "Cloudy" },
      { time: "21:00", temp: "8°", condition: "Cloudy" }
    ],
    hotel: {
      name: "東急大阪卓越大飯店",
      locationUrl: "https://maps.app.goo.gl/MEkbi29fXS5QZFmc7"
    },
    events: [
      { time: "08:30", title: "USJ 入園", description: "直衝瑪利歐園區", icon: "Castle", location: "日本環球影城" },
      { time: "12:00", title: "園區午餐", description: "小兵漢堡", icon: "Utensils" },
      { time: "18:00", title: "哈利波特魔法世界", description: "夜晚霍格華茲燈光秀", icon: "Moon" },
    ]
  },
  {
    dayTitle: "快樂賦歸",
    date: "2025-12-22",
    weather: [
      { time: "08:00", temp: "7°", condition: "Cloudy" },
      { time: "10:00", temp: "9°", condition: "Rain" },
      { time: "12:00", temp: "8°", condition: "Rain" },
      { time: "14:00", temp: "8°", condition: "Rain" },
      { time: "16:00", temp: "7°", condition: "Rain" }
    ],
    events: [
      { time: "09:00", title: "最後採買", description: "便利商店、車站伴手禮", icon: "Gift" },
      { time: "10:00", title: "前往機場", description: "搭乘利木津巴士或南海電鐵", icon: "Bus" },
      { 
        time: "12:20", 
        title: "大阪 前往 台北", 
        description: "星宇航空 JX821\n14:35 抵達桃園機場第一航廈", 
        icon: "Plane",
        highlight: true,
        flight: {
          airlineCode: "JX821",
          airlineName: "STARLUX AIRLINES JX821",
          aircraft: "AIRBUS A330-900NEO PASSENGER",
          departureTime: "12:20",
          arrivalTime: "14:35",
          departureAirport: "KIX",
          arrivalAirport: "TPE",
          departureCity: "大阪",
          arrivalCity: "台北",
          departureTerminal: "1 航廈",
          arrivalTerminal: "1 航廈",
          duration: "3 小時 15 分鐘",
          co2: "135 kg CO2e"
        }
      },
    ]
  }
];

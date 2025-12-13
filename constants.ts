
import { DayItinerary, Payer, ExpenseCategory } from './types';

export const APP_NAME = "🍣 跟爹娘遊京阪";

export const PAYER_OPTIONS = [Payer.ME, Payer.DAD, Payer.MOM];
export const CATEGORY_OPTIONS = Object.values(ExpenseCategory);

export const ITINERARY_DATA: DayItinerary[] = [
  {
    dayTitle: "抵達京都初體驗",
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
      { 
        time: "13:30", 
        title: "前往京都", 
        description: "搭乘 HARUKA 關空特急前往京都車站", 
        icon: "Train",
        notes: "入境關西機場T1後，搭乘手扶梯上2樓 & 走空橋去關西機場車站 & 到 綠色售票機 換票\n\n（請查看 [HARUKA 實體票兌換說明](https://res.klook.com/image/upload/oct_AID18400_-_Redeem_Haruka_Ticket_l2vybu.pdf?spm=BookingDetail.Redemption%20information.Link&clickId=4934073335&_gl=1*1a3b7ul*_gcl_aw*R0NMLjE3NjMzMDUyODUuQ2owS0NRaUFpZWJJQmhEbUFSSXNBRThQR05MTUZqWkpCcUt0T2tFdy1QTE5PN1pIVHU0bmVPbzQzN3lEWjRzdTZfOTd2LXJkTDVNSEg1a2FBdnFfRUFMd193Y0I.*_gcl_au*MTIyNDM4MDc0My4xNzYxNzQ5MTE5*_ga*MTc5NzE0NjA0My4xNzMwMjg5NjUw*_ga_V8S4KC8ZXR*czE3NjUyOTMwMDckbzI0JGcxJHQxNzY1MjkzMTE1JGo1OSRsMCRoODU1OTAyNzM1)）\n\n[憑證](https://www.klook.com/klvoucher/YU11dWhZRGVVYWtvU3g4eGE5K1RrVzJRSGtSWExJVkl3dncxWmh0UEh2TTFJWTQ0eGJyVTNRK1JKRUhlRlJtYXlLb2JnVisxMFVtbG4wMzZuWDJ6QzNoRWkrL1kyYlNPTjFDYnFnSjlxOGs9.pdf)"
      },
      { time: "15:30", title: "錦市場散步", description: "體驗京都廚房，吃章魚燒、豆乳甜甜圈", location: "錦市場", icon: "Utensils" },
      { time: "18:00", title: "鴨川納涼", description: "在河岸邊散步，享受晚餐", icon: "Sunset", location: "鴨川",
        image: "https://static.gltjp.com/glt/data/article/21000/20559/20231221_092942_40e7f6e4_w1920.webp",
        notes: "晚餐可選 [麵屋豬一](https://maps.app.goo.gl/QrMTszgHn4ryyyYz9)、[三嶋亭壽喜燒](https://share.google/92o0O10B1bgh9oA6r)"
       },
    ]
  },
  {
    dayTitle: "嵐山風景與寺廟巡禮",
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
      { time: "09:00", title: "嵐山", description: "林大道+野宮神社 / 天龍寺 / 嵐山大街+渡月橋", icon: "Landmark", image: "https://s3-ap-northeast-1.amazonaws.com/thegate/2021/02/10/12/19/48/Mt.Arashi.jpg", location: "嵐山"},
      { time: "12:30", title: "叙々苑 游玄亭 京都", description: "妹妹生日媽咪請客吃燒肉！🎂", icon: "Gift", location: "游玄亭 京都",
        notes: "[せんちくてい 預約詳情](https://restaurant.ikyu.com/me/reservations/IR0502164545)" },
      { time: "15:00", title: "下鴨神社", description: "御守很漂亮", icon: "Landmark", location: "下鴨神社"}
      
    ]
  },
  {
    dayTitle: "清水寺奈良一日遊",
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
      {
        time: "09:50", 
        title: "集合出發", 
        description: "吃完早餐自行與導遊會合", 
        icon: "Bus",
        location: "京都站八條口-站前觀光巴士停車場",
        locationUrl: "https://maps.app.goo.gl/mGie1qukhtxYBAaKA", notes: "出行前一天 20:00-21:00 會收到郵件，告知第二天的導遊及車輛信息，請及時查看！\n\n（請查看 [行程＆景點介紹](https://www.klook.com/zh-TW/activity/87236-kyoto-tour-nara/?spm=SearchResult.SearchResult_LIST&clickId=a7bc1e4501)）\n\n[憑證](https://www.klook.com/zh-TW/voucher-new/175ec6f2-b2e0-4667-4e4a-5b73d8f3c335?lang=zh_TW&spm=BookingDetail.SeeVoucher&clickId=d450135217)",
      },
      { time: "10:00", title: "清水寺、祇園、三年坂、八阪神社", description: "午餐要自理ㄛ", icon: "Landmark", location: "清水寺",
        image: "https://static.gltjp.com/glt/data/article/21000/20372/20230817_145716_42bf4910_w1920.webp" },
      { time: "15:30", title: "奈良公園、東大寺", description: "餵鹿", icon: "Flower", location: "奈良公園"},
      { time: "18:00", title: "回到大阪心齋橋", description: "先去飯店放行李再出來覓食買鞋子", icon: "Landmark", location: "心齋橋" },
    ]
  },
  {
    dayTitle: "爸爸想去姬路城",
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
      { time: "08:30", title: "姬路城", description: "參觀姬路城，歷史巡禮", icon: "Castle", location: "姬路",
        image: "https://static.gltjp.com/glt/data/article/21000/20400/20230907_131839_70bdcabd_w1920.webp"
       },
      { time: "15:00", title: "通天閣", description: "參觀天守閣，歷史巡禮", icon: "Castle", location: "通天閣",
        image: "https://d1grca2t3zpuug.cloudfront.net/2024/10/671da3a1be72a-870x500.webp"
       },
      { time: "16:00", title: "新世界本通商店街", description: "購物隨便亂逛", icon: "ShoppingBag", location: "新世界本通商店街" },
      { time: "17:00", title: "大阪聖誕市集", description: "體驗一下節慶氛圍", icon: "Gift", location: "TEN-SHIBA" },
      { time: "18:00", title: "牛舌檸檬 or 拉麵", description: "欣賞大阪夜景", highlight: true, icon: "Moon", location: "難波" },
    ]
  },
  {
    dayTitle: "大阪觀光客",
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
      { time: "09:00", title: "勝尾寺", description: "搭乘 御堂筋線 (或北大阪急行) 至終點站「箕面萱野站」(M06)", icon: "Train", location: "勝尾寺",
        image: "https://www.japanrailclub.com/wp-content/uploads/2024/11/Katsuoji2.jpg"
       },
    ]
  },
  {
    dayTitle: "回家顧孫or上班啦",
    date: "2025-12-22",
    weather: [
      { time: "08:00", temp: "7°", condition: "Cloudy" },
      { time: "10:00", temp: "9°", condition: "Rain" },
      { time: "12:00", temp: "8°", condition: "Rain" },
      { time: "14:00", temp: "8°", condition: "Rain" },
      { time: "16:00", temp: "7°", condition: "Rain" }
    ],
    events: [
      { time: "08:30", title: "前往機場", description: "搭乘利木津巴士或南海電鐵", icon: "Train", location: "關西國際機場" },
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

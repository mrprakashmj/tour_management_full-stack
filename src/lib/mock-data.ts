export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  destination: string;
  images: string[];
  imageHints: string[];
  itinerary: ItineraryItem[];
  rating: number;
  reviews: number;
}

export const tours: Tour[] = [
  {
    id: "1",
    title: "Enchanting Paris: City of Lights",
    description: "Discover the magic of Paris, from the Eiffel Tower to the charming streets of Montmartre.",
    longDescription: "Immerse yourself in the romantic capital of France. This tour offers a perfect blend of iconic landmarks, artistic treasures, and culinary delights. Stroll along the Seine, marvel at the masterpieces in the Louvre, and enjoy breathtaking views from the top of the Eiffel Tower. A truly unforgettable Parisian experience awaits.",
    price: 99999,
    duration: "7 Days",
    destination: "Paris, France",
    images: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxlaWZmZWwlMjB0b3dlcnxlbnwwfHx8fDE3NTM4ODczNTR8MA&ixlib=rb-4.1.0&q=80&w=1080", "https://placehold.co/1200x675.png", "https://placehold.co/1200x675.png"],
    imageHints: ["eiffel tower", "louvre museum", "seine river"],
    itinerary: [
      { day: 1, title: "Arrival in Paris & Eiffel Tower", description: "Arrive in Paris, check into your hotel. In the evening, visit the iconic Eiffel Tower and enjoy the spectacular city views." },
      { day: 2, title: "Louvre Museum & Seine River Cruise", description: "Spend the morning at the Louvre Museum. In the afternoon, take a relaxing cruise along the Seine River." },
      { day: 3, title: "Montmartre & Sacré-Cœur", description: "Explore the artistic neighborhood of Montmartre and visit the stunning Sacré-Cœur Basilica." },
    ],
    rating: 4.8,
    reviews: 256,
  },
  {
    id: "2",
    title: "Ancient Wonders of Rome",
    description: "Step back in time and explore the historic heart of the Roman Empire, from the Colosseum to the Vatican.",
    longDescription: "Journey through centuries of history in the eternal city of Rome. Witness the grandeur of the Colosseum, walk through the ruins of the Roman Forum, and toss a coin in the Trevi Fountain. This tour also includes a visit to Vatican City to see St. Peter's Basilica and the Sistine Chapel. Prepare to be awestruck by the art, history, and culture of Rome.",
    price: 119999,
    duration: "8 Days",
    destination: "Rome, Italy",
    images: ["https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2xvc3NldW0lMjByb21lfGVufDB8fHx8MTc1Mzg4NzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080", "https://placehold.co/1200x675.png", "https://placehold.co/1200x675.png"],
    imageHints: ["colosseum rome", "vatican city", "trevi fountain"],
    itinerary: [
      { day: 1, title: "Arrival and Welcome Dinner", description: "Arrive in Rome and enjoy a traditional Italian welcome dinner." },
      { day: 2, title: "Colosseum & Roman Forum", description: "Explore the ancient heart of Rome, including the Colosseum and the Roman Forum." },
      { day: 3, title: "Vatican City Tour", description: "Visit St. Peter's Basilica, the Vatican Museums, and the Sistine Chapel." },
    ],
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "3",
    title: "Mystical Tokyo & Kyoto",
    description: "Experience the vibrant contrast of Japan, from the futuristic metropolis of Tokyo to the serene temples of Kyoto.",
    longDescription: "Embark on a captivating journey through Japan. In Tokyo, you'll experience the bustling energy of Shibuya Crossing and the tranquility of Meiji Shrine. Then, travel by bullet train to Kyoto, the cultural heart of Japan. Explore ancient temples, beautiful gardens, and the famous Gion district. This tour offers a deep dive into Japanese culture, both modern and traditional.",
    price: 149999,
    duration: "10 Days",
    destination: "Tokyo & Kyoto, Japan",
    images: ["https://images.unsplash.com/photo-1720612590620-87dafe11518c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0b2t5byUyMHNreWxpbmV8ZW58MHx8fHwxNzUzODg3MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080", "https://placehold.co/1200x675.png", "https://placehold.co/1200x675.png"],
    imageHints: ["tokyo skyline", "kyoto temple", "shibuya crossing"],
    itinerary: [
      { day: 1, title: "Arrival in Tokyo", description: "Arrive at Narita or Haneda airport and transfer to your hotel in Tokyo." },
      { day: 2, title: "Tokyo City Tour", description: "Visit Senso-ji Temple, Meiji Shrine, and the bustling Shibuya Crossing." },
      { day: 3, title: "Bullet Train to Kyoto", description: "Travel to Kyoto via the Shinkansen (bullet train) and explore the Gion district." },
    ],
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "4",
    title: "Spectacular Swiss Alps Adventure",
    description: "Breathe in the fresh mountain air as you explore the stunning landscapes of the Swiss Alps.",
    longDescription: "A dream for nature lovers, this tour takes you through the heart of the Swiss Alps. From scenic train rides to breathtaking hikes, you'll be surrounded by majestic peaks, pristine lakes, and charming alpine villages. Visit Interlaken, Grindelwald, and Zermatt, and witness the iconic Matterhorn. It's an adventure filled with picture-perfect moments.",
    price: 129999,
    duration: "9 Days",
    destination: "Swiss Alps, Switzerland",
    images: ["https://images.unsplash.com/photo-1593186344142-ef775a6e596f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzd2lzcyUyMGFscHN8ZW58MHx8fHwxNzUzODg3MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080", "https://placehold.co/1200x675.png", "https://placehold.co/1200x675.png"],
    imageHints: ["swiss alps", "matterhorn mountain", "alpine lake"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Transfer to Interlaken", description: "Arrive in Zurich and take a scenic train to Interlaken, the gateway to the Jungfrau region." },
      { day: 2, title: "Jungfraujoch - Top of Europe", description: "Take a train to the highest railway station in Europe for stunning views of the Aletsch Glacier." },
      { day: 3, title: "Hiking in Grindelwald", description: "Enjoy a day of hiking in the beautiful valley of Grindelwald." },
    ],
    rating: 4.9,
    reviews: 220,
  },
];

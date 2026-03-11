import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "Paris",          clues: ["🇫🇷", "🗼"],  difficulty: "easy",   aliases: [] },
  { id: 2,  answer: "Tokyo",          clues: ["🇯🇵", "⛩️"], difficulty: "easy",   aliases: [] },
  { id: 3,  answer: "London",         clues: ["🇬🇧", "👑"],  difficulty: "easy",   aliases: [] },
  { id: 4,  answer: "Rome",           clues: ["🇮🇹", "🏛️"], difficulty: "easy",   aliases: ["roma"] },
  { id: 5,  answer: "Berlin",         clues: ["🇩🇪", "🍺"],  difficulty: "easy",   aliases: [] },
  { id: 6,  answer: "Madrid",         clues: ["🇪🇸", "💃"],  difficulty: "easy",   aliases: [] },
  { id: 7,  answer: "Washington D.C.", clues: ["🇺🇸", "🏛️"], difficulty: "easy",   aliases: ["washington dc", "washington", "dc"] },
  { id: 8,  answer: "Beijing",        clues: ["🇨🇳", "🐉"],  difficulty: "easy",   aliases: ["peking"] },

  // Medium
  { id: 9,  answer: "Canberra",       clues: ["🇦🇺", "🦘"],  difficulty: "medium", aliases: [] },
  { id: 10, answer: "Brasília",       clues: ["🇧🇷", "🌴"],  difficulty: "medium", aliases: ["brasilia"] },
  { id: 11, answer: "Ottawa",         clues: ["🇨🇦", "🍁"],  difficulty: "medium", aliases: [] },
  { id: 12, answer: "Mexico City",    clues: ["🇲🇽", "🌮"],  difficulty: "medium", aliases: ["ciudad de mexico", "cdmx"] },
  { id: 13, answer: "Moscow",         clues: ["🇷🇺", "❄️"],  difficulty: "medium", aliases: ["moskva"] },
  { id: 14, answer: "New Delhi",      clues: ["🇮🇳", "🐘"],  difficulty: "medium", aliases: ["delhi"] },
  { id: 15, answer: "Stockholm",      clues: ["🇸🇪", "👑"],  difficulty: "medium", aliases: [] },
  { id: 16, answer: "Buenos Aires",   clues: ["🇦🇷", "🥩"],  difficulty: "medium", aliases: [] },
  { id: 17, answer: "Cairo",          clues: ["🇪🇬", "🐪"],  difficulty: "medium", aliases: [] },

  // Hard
  { id: 18, answer: "Wellington",     clues: ["🇳🇿", "🥝"],  difficulty: "hard",   aliases: [] },
  { id: 19, answer: "Astana",         clues: ["🇰🇿", "🌾"],  difficulty: "hard",   aliases: ["nur-sultan", "nursultan"] },
  { id: 20, answer: "Islamabad",      clues: ["🇵🇰", "🕌"],  difficulty: "hard",   aliases: [] },
  { id: 21, answer: "Abuja",          clues: ["🇳🇬", "🦅"],  difficulty: "hard",   aliases: [] },
  { id: 22, answer: "Rabat",          clues: ["🇲🇦", "🌙"],  difficulty: "hard",   aliases: [] },
  { id: 23, answer: "Nairobi",        clues: ["🇰🇪", "🦁"],  difficulty: "hard",   aliases: [] },
  { id: 24, answer: "Kuala Lumpur",   clues: ["🇲🇾", "🏙️"], difficulty: "hard",   aliases: ["kl"] },
  { id: 25, answer: "Reykjavik",      clues: ["🇮🇸", "🌋"],  difficulty: "hard",   aliases: ["reykjavík"] },
];

export default questions;

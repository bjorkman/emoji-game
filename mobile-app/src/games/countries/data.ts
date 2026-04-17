import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "United States", clues: ["🇺🇸", "🗽"],  difficulty: "easy",   aliases: ["usa", "us", "america", "united states of america"], hint: "U_____ S_____" },
  { id: 2,  answer: "Japan",         clues: ["🇯🇵", "⛩️"], difficulty: "easy",   aliases: [],                                                   hint: "J____" },
  { id: 3,  answer: "France",        clues: ["🇫🇷", "🗼"],  difficulty: "easy",   aliases: [],                                                   hint: "F_____" },
  { id: 4,  answer: "Germany",       clues: ["🇩🇪", "🍺"],  difficulty: "easy",   aliases: [],                                                   hint: "G______" },
  { id: 5,  answer: "Brazil",        clues: ["🇧🇷", "🌴"],  difficulty: "easy",   aliases: [],                                                   hint: "B_____" },
  { id: 6,  answer: "Canada",        clues: ["🇨🇦", "🍁"],  difficulty: "easy",   aliases: [],                                                   hint: "C_____" },
  { id: 7,  answer: "Australia",     clues: ["🇦🇺", "🦘"],  difficulty: "easy",   aliases: [],                                                   hint: "A________" },
  { id: 8,  answer: "Italy",         clues: ["🇮🇹", "🍕"],  difficulty: "easy",   aliases: [],                                                   hint: "I____" },
  { id: 9,  answer: "United Kingdom", clues: ["🇬🇧", "👑"], difficulty: "easy",   aliases: ["uk", "britain", "england", "great britain"],        hint: "U_____ K______" },
  { id: 10, answer: "Turkey",        clues: ["🇹🇷", "🕌"],  difficulty: "easy",   aliases: ["turkiye", "türkiye"],                               hint: "T_____" },
  { id: 11, answer: "Greece",        clues: ["🇬🇷", "🏛️"], difficulty: "easy",   aliases: [],                                                   hint: "G_____" },
  { id: 12, answer: "New Zealand",   clues: ["🇳🇿", "🥝"],  difficulty: "easy",   aliases: ["nz", "aotearoa"],                                   hint: "N__ Z______" },

  // Medium
  { id: 13, answer: "Mexico",        clues: ["🇲🇽", "🌮"],  difficulty: "medium", aliases: [],                                                   hint: "M_____" },
  { id: 14, answer: "China",         clues: ["🇨🇳", "🐉"],  difficulty: "medium", aliases: [],                                                   hint: "C____" },
  { id: 15, answer: "India",         clues: ["🇮🇳", "🐘"],  difficulty: "medium", aliases: [],                                                   hint: "I____" },
  { id: 16, answer: "Russia",        clues: ["🇷🇺", "❄️"],  difficulty: "medium", aliases: [],                                                   hint: "R_____" },
  { id: 17, answer: "Spain",         clues: ["🇪🇸", "💃"],  difficulty: "medium", aliases: [],                                                   hint: "S____" },
  { id: 18, answer: "South Korea",   clues: ["🇰🇷", "🎵"],  difficulty: "medium", aliases: ["korea", "republic of korea"],                       hint: "S____ K____" },
  { id: 19, answer: "Argentina",     clues: ["🇦🇷", "🥩"],  difficulty: "medium", aliases: [],                                                   hint: "A________" },
  { id: 20, answer: "Sweden",        clues: ["🇸🇪", "👑"],  difficulty: "medium", aliases: [],                                                   hint: "S_____" },
  { id: 21, answer: "Egypt",         clues: ["🇪🇬", "🐪"],  difficulty: "medium", aliases: [],                                                   hint: "E____" },
  { id: 22, answer: "Peru",          clues: ["🇵🇪", "🦙"],  difficulty: "medium", aliases: [],                                                   hint: "P___" },
  { id: 23, answer: "Indonesia",     clues: ["🇮🇩", "🌋"],  difficulty: "medium", aliases: [],                                                   hint: "I________" },
  { id: 24, answer: "Vietnam",       clues: ["🇻🇳", "🍜"],  difficulty: "medium", aliases: ["viet nam"],                                         hint: "V______" },
  { id: 25, answer: "Poland",        clues: ["🇵🇱", "🥟"],  difficulty: "medium", aliases: [],                                                   hint: "P_____" },
  { id: 26, answer: "Norway",        clues: ["🇳🇴", "🎿"],  difficulty: "medium", aliases: [],                                                   hint: "N_____" },
  { id: 27, answer: "Netherlands",   clues: ["🇳🇱", "🌷"],  difficulty: "medium", aliases: ["holland"],                                          hint: "N__________" },
  { id: 28, answer: "South Africa",  clues: ["🇿🇦", "🦁"],  difficulty: "medium", aliases: [],                                                   hint: "S____ A_____" },

  // Hard
  { id: 29, answer: "Portugal",      clues: ["🇵🇹", "🐓"],  difficulty: "hard",   aliases: [],                                                   hint: "P_______" },
  { id: 30, answer: "Nigeria",       clues: ["🇳🇬", "🦅"],  difficulty: "hard",   aliases: [],                                                   hint: "N______" },
  { id: 31, answer: "Thailand",      clues: ["🇹🇭", "🐘"],  difficulty: "hard",   aliases: [],                                                   hint: "T_______" },
  { id: 32, answer: "Ukraine",       clues: ["🇺🇦", "🌻"],  difficulty: "hard",   aliases: [],                                                   hint: "U______" },
  { id: 33, answer: "Colombia",      clues: ["🇨🇴", "☕"],  difficulty: "hard",   aliases: [],                                                   hint: "C_______" },
  { id: 34, answer: "Morocco",       clues: ["🇲🇦", "🌙"],  difficulty: "hard",   aliases: [],                                                   hint: "M______" },
  { id: 35, answer: "Kenya",         clues: ["🇰🇪", "🦁"],  difficulty: "hard",   aliases: [],                                                   hint: "K____" },
  { id: 36, answer: "Iceland",       clues: ["🇮🇸", "🌋"],  difficulty: "hard",   aliases: [],                                                   hint: "I______" },
  { id: 37, answer: "Philippines",   clues: ["🇵🇭", "🏝️"], difficulty: "hard",   aliases: ["the philippines"],                                  hint: "P__________" },
  { id: 38, answer: "Czech Republic", clues: ["🇨🇿", "🍺"], difficulty: "hard",   aliases: ["czechia"],                                          hint: "C____ R______" },
  { id: 39, answer: "Romania",       clues: ["🇷🇴", "🏰"],  difficulty: "hard",   aliases: [],                                                   hint: "R______" },
  { id: 40, answer: "Cuba",          clues: ["🇨🇺", "🚗"],  difficulty: "hard",   aliases: [],                                                   hint: "C___" },
];

export default questions;

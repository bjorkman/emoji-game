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

  // Medium
  { id: 9,  answer: "Mexico",        clues: ["🇲🇽", "🌮"],  difficulty: "medium", aliases: [],                                                   hint: "M_____" },
  { id: 10, answer: "China",         clues: ["🇨🇳", "🐉"],  difficulty: "medium", aliases: [],                                                   hint: "C____" },
  { id: 11, answer: "India",         clues: ["🇮🇳", "🐘"],  difficulty: "medium", aliases: [],                                                   hint: "I____" },
  { id: 12, answer: "Russia",        clues: ["🇷🇺", "❄️"],  difficulty: "medium", aliases: [],                                                   hint: "R_____" },
  { id: 13, answer: "Spain",         clues: ["🇪🇸", "💃"],  difficulty: "medium", aliases: [],                                                   hint: "S____" },
  { id: 14, answer: "South Korea",   clues: ["🇰🇷", "🎵"],  difficulty: "medium", aliases: ["korea", "republic of korea"],                       hint: "S____ K____" },
  { id: 15, answer: "Argentina",     clues: ["🇦🇷", "🥩"],  difficulty: "medium", aliases: [],                                                   hint: "A________" },
  { id: 16, answer: "Sweden",        clues: ["🇸🇪", "👑"],  difficulty: "medium", aliases: [],                                                   hint: "S_____" },
  { id: 17, answer: "Egypt",         clues: ["🇪🇬", "🐪"],  difficulty: "medium", aliases: [],                                                   hint: "E____" },

  // Hard
  { id: 18, answer: "Portugal",      clues: ["🇵🇹", "🐓"],  difficulty: "hard",   aliases: [],                                                   hint: "P_______" },
  { id: 19, answer: "Nigeria",       clues: ["🇳🇬", "🦅"],  difficulty: "hard",   aliases: [],                                                   hint: "N______" },
  { id: 20, answer: "Thailand",      clues: ["🇹🇭", "🐘"],  difficulty: "hard",   aliases: [],                                                   hint: "T_______" },
  { id: 21, answer: "Ukraine",       clues: ["🇺🇦", "🌻"],  difficulty: "hard",   aliases: [],                                                   hint: "U______" },
  { id: 22, answer: "Colombia",      clues: ["🇨🇴", "☕"],  difficulty: "hard",   aliases: [],                                                   hint: "C_______" },
  { id: 23, answer: "Morocco",       clues: ["🇲🇦", "🌙"],  difficulty: "hard",   aliases: [],                                                   hint: "M______" },
  { id: 24, answer: "Kenya",         clues: ["🇰🇪", "🦁"],  difficulty: "hard",   aliases: [],                                                   hint: "K____" },
  { id: 25, answer: "Iceland",       clues: ["🇮🇸", "🌋"],  difficulty: "hard",   aliases: [],                                                   hint: "I______" },
];

export default questions;

import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "BLACKPINK",    clues: ["🖤", "🩷"],                difficulty: "easy",   aliases: ["black pink"] },
  { id: 2,  answer: "TWICE",        clues: ["2️⃣", "🧊"],               difficulty: "easy",   aliases: ["2ice"] },
  { id: 3,  answer: "BTS",          clues: ["🐝", "🫖", "🅂"],          difficulty: "easy",   aliases: ["bangtan"] },
  { id: 4,  answer: "EXO",          clues: ["🄴", "😘"],                difficulty: "easy",   aliases: [] },
  { id: 5,  answer: "GOT7",         clues: ["🐐", "️"],                difficulty: "easy",   aliases: ["got 7"] },
  { id: 6,  answer: "MAMAMOO",      clues: ["👩", "🐄", "🗣️"],          difficulty: "easy",   aliases: ["mama moo"] },
  { id: 7,  answer: "RED VELVET",   clues: ["🔴", "🍰"],                difficulty: "easy",   aliases: ["redvelvet"] },
  { id: 8,  answer: "MONSTA X",     clues: ["👹", "✖️"],                difficulty: "easy",   aliases: ["monsta x", "monstax"] },

  // Medium
  { id: 9,  answer: "STRAY KIDS",   clues: ["🅂", "📥", "👶", "👶"],   difficulty: "medium", aliases: ["straykids", "skz"] },
  { id: 10, answer: "ATEEZ",        clues: ["🄰", "🍵", "💤"],          difficulty: "medium", aliases: [] },
  { id: 11, answer: "ITZY",         clues: ["🫵", "🌊"],                difficulty: "medium", aliases: [] },
  { id: 12, answer: "AESPA",        clues: ["æ", "🧖🏻‍♀️"],         difficulty: "medium", aliases: [] },
  { id: 13, answer: "TXT",          clues: ["🫖", "🅇", "🫖"],          difficulty: "medium", aliases: ["tomorrow x together"] },
  { id: 14, answer: "SEVENTEEN",    clues: ["1️⃣", "7️⃣"],      difficulty: "medium", aliases: ["svt"] },
  { id: 15, answer: "SHINEE",       clues: ["✨", "💎"],                difficulty: "medium", aliases: ["shine e"] },
  { id: 16, answer: "EXID",         clues: ["🔚", "🆔"],                difficulty: "medium", aliases: [] },
  { id: 17, answer: "4MINUTE",      clues: ["4️⃣", "⏱️"],              difficulty: "medium", aliases: ["four minute", "4 minute"] },
  { id: 18, answer: "BIGBANG",      clues: ["💥", "💥"],                difficulty: "medium", aliases: ["big bang"] },

  // Hard
  { id: 19, answer: "LOONA",        clues: ["🌙"],                      difficulty: "hard",   aliases: ["이달의 소녀"] },
  { id: 20, answer: "KARD",         clues: ["🃏"],                      difficulty: "hard",   aliases: [] },
  { id: 21, answer: "WEKI MEKI",    clues: ["📅", "👩🏻‍🔧"],            difficulty: "hard",   aliases: ["wekimeki"] },
  { id: 23, answer: "DREAMCATCHER", clues: ["😴", "💭", "🕸️"],          difficulty: "hard",   aliases: ["dream catcher"] },
  { id: 24, answer: "GFRIEND",      clues: ["👧", "👫"],                difficulty: "hard",   aliases: ["g friend", "girlfriend"] },
  { id: 25, answer: "PENTAGON",     clues: ["⬠", "5️⃣"],               difficulty: "hard",   aliases: [] },
];

export default questions;

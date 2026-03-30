import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy (8 questions) - obvious symbol-based clues for the most recognizable signs
  { id: 1,  answer: "Aries",       clues: ["♈", "🐏", "🔥"],           difficulty: "easy",   aliases: ["the ram"],                          hint: "March 21 - April 19" },
  { id: 2,  answer: "Taurus",      clues: ["♉", "🐂", "🌍"],           difficulty: "easy",   aliases: ["the bull"],                         hint: "April 20 - May 20" },
  { id: 3,  answer: "Leo",         clues: ["♌", "🦁", "🔥"],           difficulty: "easy",   aliases: ["the lion"],                         hint: "July 23 - August 22" },
  { id: 4,  answer: "Scorpio",     clues: ["♏", "🦂", "💀"],           difficulty: "easy",   aliases: ["the scorpion", "scorpius"],         hint: "October 23 - November 21" },
  { id: 5,  answer: "Pisces",      clues: ["♓", "🐟", "🌊"],           difficulty: "easy",   aliases: ["the fish", "the fishes"],           hint: "February 19 - March 20" },
  { id: 6,  answer: "Cancer",      clues: ["♋", "🦀", "🌙"],           difficulty: "easy",   aliases: ["the crab"],                         hint: "June 21 - July 22" },
  { id: 7,  answer: "Gemini",      clues: ["♊", "👯", "💨"],           difficulty: "easy",   aliases: ["the twins"],                        hint: "May 21 - June 20" },
  { id: 8,  answer: "Sagittarius", clues: ["♐", "🏹", "🔥"],           difficulty: "easy",   aliases: ["the archer", "sag"],                hint: "November 22 - December 21" },

  // Medium (8 questions) - mix of symbol and personality clues
  { id: 9,  answer: "Libra",       clues: ["♎", "⚖️", "💎"],           difficulty: "medium", aliases: ["the scales"],                       hint: "September 23 - October 22" },
  { id: 10, answer: "Virgo",       clues: ["♍", "🌾", "📋"],           difficulty: "medium", aliases: ["the maiden", "the virgin"],         hint: "August 23 - September 22" },
  { id: 11, answer: "Capricorn",   clues: ["♑", "🐐", "🏔️"],          difficulty: "medium", aliases: ["the goat", "the sea goat"],         hint: "December 22 - January 19" },
  { id: 12, answer: "Aquarius",    clues: ["♒", "🏺", "💨"],           difficulty: "medium", aliases: ["the water bearer"],                 hint: "January 20 - February 18" },
  { id: 13, answer: "Aries",       clues: ["🏃‍♂️", "⚡", "👊"],         difficulty: "medium", aliases: ["the ram"],                          hint: "March 21 - April 19" },
  { id: 14, answer: "Taurus",      clues: ["🍷", "🛋️", "😤"],          difficulty: "medium", aliases: ["the bull"],                         hint: "April 20 - May 20" },
  { id: 15, answer: "Leo",         clues: ["👑", "🎭", "☀️"],           difficulty: "medium", aliases: ["the lion"],                         hint: "July 23 - August 22" },
  { id: 16, answer: "Scorpio",     clues: ["🕵️", "💀", "🖤"],          difficulty: "medium", aliases: ["the scorpion", "scorpius"],         hint: "October 23 - November 21" },

  // Hard (8 questions) - abstract personality/trait-based clues
  { id: 17, answer: "Gemini",      clues: ["🗣️", "🎭", "🔀"],          difficulty: "hard",   aliases: ["the twins"],                        hint: "May 21 - June 20" },
  { id: 18, answer: "Cancer",      clues: ["🏠", "😢", "🫂"],          difficulty: "hard",   aliases: ["the crab"],                         hint: "June 21 - July 22" },
  { id: 19, answer: "Virgo",       clues: ["🔬", "✅", "🧹"],          difficulty: "hard",   aliases: ["the maiden", "the virgin"],         hint: "August 23 - September 22" },
  { id: 20, answer: "Libra",       clues: ["🤝", "🪞", "💐"],          difficulty: "hard",   aliases: ["the scales"],                       hint: "September 23 - October 22" },
  { id: 21, answer: "Sagittarius", clues: ["✈️", "📚", "🤣"],          difficulty: "hard",   aliases: ["the archer", "sag"],                hint: "November 22 - December 21" },
  { id: 22, answer: "Capricorn",   clues: ["💼", "🏆", "🧱"],          difficulty: "hard",   aliases: ["the goat", "the sea goat"],         hint: "December 22 - January 19" },
  { id: 23, answer: "Aquarius",    clues: ["🛸", "🧪", "✊"],          difficulty: "hard",   aliases: ["the water bearer"],                 hint: "January 20 - February 18" },
  { id: 24, answer: "Pisces",      clues: ["🎨", "😴", "💫"],          difficulty: "hard",   aliases: ["the fish", "the fishes"],           hint: "February 19 - March 20" },
];

export default questions;

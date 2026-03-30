import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy (9 questions) - universally known chains/items
  { id: 1,  answer: "McDonald's",       clues: ["🤡", "🍔", "🟡", "Ⓜ️"],       difficulty: "easy",   aliases: ["McDonalds", "Mcdonalds", "mcdonald's", "mcdonalds", "Mickey D's"],  hint: "Golden arches" },
  { id: 2,  answer: "KFC",              clues: ["🐔", "🍗", "🪣", "👴"],        difficulty: "easy",   aliases: ["Kentucky Fried Chicken"],     hint: "The Colonel's secret recipe" },
  { id: 3,  answer: "Pizza Hut",        clues: ["🍕", "🛖", "📦"],              difficulty: "easy",   aliases: ["Pizzahut", "Pizza hut"],      hint: "Red roof logo" },
  { id: 4,  answer: "Starbucks",        clues: ["⭐", "💵", "☕", "🧜‍♀️"],     difficulty: "easy",   aliases: ["Star Bucks", "Starbuck"],     hint: "Mermaid logo, green cups" },
  { id: 5,  answer: "Subway",           clues: ["🥖", "🥬", "🚇"],              difficulty: "easy",   aliases: ["Sub Way"],                    hint: "Eat Fresh" },
  { id: 6,  answer: "Burger King",      clues: ["🍔", "👑"],                     difficulty: "easy",   aliases: ["Burgerking", "BK"],           hint: "Have It Your Way" },
  { id: 7,  answer: "Taco Bell",        clues: ["🌮", "🔔"],                     difficulty: "easy",   aliases: ["Tacobell", "Taco bell"],      hint: "Think Outside the Bun" },
  { id: 8,  answer: "Domino's",         clues: ["🍕", "🁡", "🛵"],              difficulty: "easy",   aliases: ["Dominos", "Domino"],           hint: "30 minutes or less" },
  { id: 9,  answer: "Wendy's",          clues: ["👧", "🔴", "🍔", "🥤"],        difficulty: "easy",   aliases: ["Wendys", "Wendy"],             hint: "Red-haired girl logo" },

  // Medium (8 questions) - well-known but slightly trickier
  { id: 10, answer: "Big Mac",          clues: ["🍔", "📏", "🔝"],              difficulty: "medium", aliases: ["Bigmac", "Big mac"],           hint: "Two all-beef patties, special sauce" },
  { id: 11, answer: "Chicken McNuggets", clues: ["🐔", "🟡", "6️⃣", "📦"],      difficulty: "medium", aliases: ["McNuggets", "Mcnuggets", "Chicken Mcnuggets", "Nuggets"], hint: "Golden bite-sized pieces from McDonald's" },
  { id: 12, answer: "Whopper",          clues: ["🍔", "🔥", "👑", "💪"],        difficulty: "medium", aliases: [],                              hint: "Burger King's flagship burger" },
  { id: 13, answer: "Happy Meal",       clues: ["😊", "🍔", "🎁", "👶"],        difficulty: "medium", aliases: ["Happymeal", "Happy meal"],     hint: "Comes with a toy inside" },
  { id: 14, answer: "Frosty",           clues: ["🥤", "🍫", "❄️", "🥶"],        difficulty: "medium", aliases: [],                              hint: "Wendy's frozen chocolate treat" },
  { id: 15, answer: "Frappuccino",      clues: ["☕", "🧊", "🥛", "🍦"],        difficulty: "medium", aliases: ["Frap", "Frappacino", "Frappuchino"], hint: "Starbucks blended iced drink" },
  { id: 16, answer: "Hot Dog",          clues: ["🌭", "🔥", "🐕"],              difficulty: "medium", aliases: ["Hotdog", "Hot dog"],           hint: "Classic ballpark food" },
  { id: 17, answer: "Fish and Chips",   clues: ["🐟", "➕", "🍟", "🇬🇧"],      difficulty: "medium", aliases: ["Fish & Chips", "Fish n Chips", "Fish and chips", "Fish & chips"], hint: "British pub classic" },

  // Hard (8 questions) - specific items or less global chains
  { id: 18, answer: "Five Guys",        clues: ["5️⃣", "👨", "👨", "👨", "👨", "👨"], difficulty: "hard", aliases: ["5 Guys", "Fiveguys", "Five guys"], hint: "Famous for peanuts and burgers" },
  { id: 19, answer: "Chick-fil-A",      clues: ["🐔", "✝️", "🅰️"],             difficulty: "hard",   aliases: ["Chick fil A", "Chickfila", "Chick-Fil-A", "Chic fil a"], hint: "Closed on Sundays" },
  { id: 20, answer: "In-N-Out",         clues: ["➡️", "🍔", "⬅️", "🌴"],       difficulty: "hard",   aliases: ["In N Out", "InNOut", "In and Out", "In-N-Out Burger"], hint: "Secret menu, California classic" },
  { id: 21, answer: "Panda Express",    clues: ["🐼", "🚂", "🥡"],              difficulty: "hard",   aliases: ["Pandaexpress", "Panda express"], hint: "Orange chicken is the top seller" },
  { id: 22, answer: "Shake Shack",      clues: ["🥤", "🫨", "🛖"],              difficulty: "hard",   aliases: ["ShakeShack", "Shake shack"],  hint: "Started as a NYC hot dog cart" },
  { id: 23, answer: "Popeyes",          clues: ["🐔", "⚓", "🫘", "🌶️"],       difficulty: "hard",   aliases: ["Popeye's", "Popeye"],         hint: "Louisiana-style chicken" },
  { id: 24, answer: "Krispy Kreme",     clues: ["🍩", "🟢", "🔴", "🤤"],       difficulty: "hard",   aliases: ["Krispy Creme", "Krispykreme", "Krispy kreme"], hint: "Hot light means fresh doughnuts" },
  { id: 25, answer: "Chipotle",         clues: ["🌯", "🌶️", "🥑", "🇲🇽"],     difficulty: "hard",   aliases: ["Chipotles", "Chipotle Mexican Grill"], hint: "Build-your-own burrito bowl" },
];

export default questions;

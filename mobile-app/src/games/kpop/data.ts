import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "BLACKPINK",    clues: ["🖤", "🩷"],                difficulty: "easy",   aliases: ["black pink"],                hint: "Famous song: Kill This Love" },
  { id: 2,  answer: "TWICE",        clues: ["2️⃣", "🧊"],               difficulty: "easy",   aliases: ["2ice"],                       hint: "Famous song: Cheer Up" },
  { id: 3,  answer: "BTS",          clues: ["🐝", "🫖", "🅂"],          difficulty: "easy",   aliases: ["bangtan"],                    hint: "Famous song: Dynamite" },
  { id: 4,  answer: "EXO",          clues: ["🄴", "😘"],                difficulty: "easy",   aliases: [],                             hint: "Famous song: Growl" },
  { id: 5,  answer: "GOT7",         clues: ["🐐", "️"],                difficulty: "easy",   aliases: ["got 7"],                      hint: "Famous song: Hard Carry" },
  { id: 6,  answer: "MAMAMOO",      clues: ["👩", "🐄", "🗣️"],          difficulty: "easy",   aliases: ["mama moo"],                   hint: "Famous song: Starry Night" },
  { id: 7,  answer: "RED VELVET",   clues: ["🔴", "🍰"],                difficulty: "easy",   aliases: ["redvelvet"],                  hint: "Famous song: Psycho" },
  { id: 8,  answer: "MONSTA X",     clues: ["👹", "✖️"],                difficulty: "easy",   aliases: ["monsta x", "monstax"],        hint: "Famous song: Hero" },
  { id: 9,  answer: "PSY",          clues: ["🐴", "💃", "😎"],          difficulty: "easy",   aliases: [],                             hint: "Famous song: Gangnam Style" },
  { id: 10, answer: "IU",           clues: ["👁️", "🫵"],               difficulty: "easy",   aliases: ["lee ji-eun"],                 hint: "Famous song: Good Day" },
  { id: 11, answer: "SUPER JUNIOR", clues: ["🦸", "👶"],                difficulty: "easy",   aliases: ["suju", "super junior"],       hint: "Famous song: Sorry, Sorry" },
  { id: 12, answer: "GIRLS GENERATION", clues: ["👧", "👧", "👧"],      difficulty: "easy",   aliases: ["snsd", "girls' generation", "girls generation"], hint: "Famous song: Gee" },

  // Medium
  { id: 13, answer: "STRAY KIDS",   clues: ["🅂", "📥", "👶", "👶"],   difficulty: "medium", aliases: ["straykids", "skz"],           hint: "Famous song: God's Menu" },
  { id: 14, answer: "ATEEZ",        clues: ["🄰", "🍵", "💤"],          difficulty: "medium", aliases: [],                             hint: "Famous song: Fireworks" },
  { id: 15, answer: "ITZY",         clues: ["🫵", "🌊"],                difficulty: "medium", aliases: [],                             hint: "Famous song: Dalla Dalla" },
  { id: 16, answer: "AESPA",        clues: ["æ", "🧖🏻‍♀️"],         difficulty: "medium", aliases: [],                             hint: "Famous song: Next Level" },
  { id: 17, answer: "TXT",          clues: ["🫖", "🅇", "🫖"],          difficulty: "medium", aliases: ["tomorrow x together"],        hint: "Famous song: 0X1=LOVESONG" },
  { id: 18, answer: "SEVENTEEN",    clues: ["1️⃣", "7️⃣"],      difficulty: "medium", aliases: ["svt"],                        hint: "Famous song: Very Nice" },
  { id: 19, answer: "SHINEE",       clues: ["✨", "💎"],                difficulty: "medium", aliases: ["shine e"],                    hint: "Famous song: Lucifer" },
  { id: 20, answer: "EXID",         clues: ["🔚", "🆔"],                difficulty: "medium", aliases: [],                             hint: "Famous song: Up & Down" },
  { id: 21, answer: "4MINUTE",      clues: ["4️⃣", "⏱️"],              difficulty: "medium", aliases: ["four minute", "4 minute"],   hint: "Famous song: Crazy" },
  { id: 22, answer: "BIGBANG",      clues: ["💥", "💥"],                difficulty: "medium", aliases: ["big bang"],                   hint: "Famous song: Fantastic Baby" },
  { id: 23, answer: "LISA",         clues: ["🇹🇭", "💃", "🐱"],       difficulty: "medium", aliases: ["lalisa"],                     hint: "Famous song: LALISA — BLACKPINK member from Thailand" },
  { id: 24, answer: "JUNGKOOK",     clues: ["🐰", "💜", "🎤"],          difficulty: "medium", aliases: ["jung kook", "jk"],            hint: "Famous song: Seven — youngest BTS member" },
  { id: 25, answer: "ROSE",         clues: ["🌹", "🎸", "🇦🇺"],       difficulty: "medium", aliases: ["rosé", "roseanne"],           hint: "Famous song: On The Ground — BLACKPINK member from Australia" },
  { id: 26, answer: "TAEMIN",       clues: ["✨", "🕺", "🌙"],          difficulty: "medium", aliases: [],                             hint: "Famous song: Move — SHINee member known as dancing king" },
  { id: 27, answer: "HYUNA",        clues: ["🫧", "💋", "🎀"],          difficulty: "medium", aliases: ["hyun-a"],                     hint: "Famous song: Bubble Pop" },
  { id: 28, answer: "ENHYPEN",      clues: ["➖", "🧛", "7️⃣"],         difficulty: "medium", aliases: [],                             hint: "Famous song: Drunk-Dazed — formed on I-LAND" },

  // Hard
  { id: 29, answer: "LOONA",        clues: ["🌙"],                      difficulty: "hard",   aliases: ["이달의 소녀"],                hint: "Famous song: PTT (Paint The Town)" },
  { id: 30, answer: "KARD",         clues: ["🃏"],                      difficulty: "hard",   aliases: [],                             hint: "Famous song: Rumor" },
  { id: 31, answer: "WEKI MEKI",    clues: ["📅", "👩🏻‍🔧"],            difficulty: "hard",   aliases: ["wekimeki"],                   hint: "Famous song: Oopsy" },
  { id: 32, answer: "DREAMCATCHER", clues: ["😴", "💭", "🕸️"],          difficulty: "hard",   aliases: ["dream catcher"],              hint: "Famous song: Scream" },
  { id: 33, answer: "GFRIEND",      clues: ["👧", "👫"],                difficulty: "hard",   aliases: ["g friend", "girlfriend"],     hint: "Famous song: Rough" },
  { id: 34, answer: "PENTAGON",     clues: ["⬠", "5️⃣"],               difficulty: "hard",   aliases: [],                             hint: "Famous song: Shine" },
  { id: 35, answer: "SUNMI",        clues: ["☀️", "🌊", "💃"],          difficulty: "hard",   aliases: [],                             hint: "Famous song: Gashina — former Wonder Girls member" },
  { id: 36, answer: "ZICO",         clues: ["👑", "🎤", "🅱️"],          difficulty: "hard",   aliases: [],                             hint: "Famous song: Any Song — former Block B leader" },
  { id: 37, answer: "CHUNGHA",      clues: ["💃", "🌟", "🔥"],          difficulty: "hard",   aliases: ["chung ha"],                   hint: "Famous song: Snapping — former I.O.I member" },
  { id: 38, answer: "JACKSON WANG", clues: ["🇭🇰", "🐉", "🎤"],       difficulty: "hard",   aliases: ["jackson"],                    hint: "Famous song: 100 Ways — GOT7 member from Hong Kong" },
  { id: 39, answer: "DAWN",         clues: ["🌅", "🎵", "💛"],          difficulty: "hard",   aliases: [],                             hint: "Famous song: Dawndididawn — former PENTAGON member" },
  { id: 40, answer: "HWASA",        clues: ["🔥", "👠", "🎤"],          difficulty: "hard",   aliases: [],                             hint: "Famous song: Maria — MAMAMOO member" },
];

export default questions;

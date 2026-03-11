import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "Paris",          clues: ["🇫🇷", "🗼"],  difficulty: "easy",   aliases: [],                                    hint: "France — City of Light" },
  { id: 2,  answer: "Tokyo",          clues: ["🇯🇵", "⛩️"], difficulty: "easy",   aliases: [],                                    hint: "Japan — Most populous city in the world" },
  { id: 3,  answer: "London",         clues: ["🇬🇧", "👑"],  difficulty: "easy",   aliases: [],                                    hint: "United Kingdom — Home of Big Ben" },
  { id: 4,  answer: "Rome",           clues: ["🇮🇹", "🏛️"], difficulty: "easy",   aliases: ["roma"],                              hint: "Italy — The Eternal City" },
  { id: 5,  answer: "Berlin",         clues: ["🇩🇪", "🍺"],  difficulty: "easy",   aliases: [],                                    hint: "Germany — Famous wall fell here in 1989" },
  { id: 6,  answer: "Madrid",         clues: ["🇪🇸", "💃"],  difficulty: "easy",   aliases: [],                                    hint: "Spain — Geographic center of the Iberian Peninsula" },
  { id: 7,  answer: "Washington D.C.", clues: ["🇺🇸", "🏛️"], difficulty: "easy",   aliases: ["washington dc", "washington", "dc"], hint: "United States — Named after the first US president" },
  { id: 8,  answer: "Beijing",        clues: ["🇨🇳", "🐉"],  difficulty: "easy",   aliases: ["peking"],                            hint: "China — Home of the Forbidden City" },

  // Medium
  { id: 9,  answer: "Canberra",       clues: ["🇦🇺", "🦘"],  difficulty: "medium", aliases: [],                                    hint: "Australia — Not Sydney or Melbourne" },
  { id: 10, answer: "Brasília",       clues: ["🇧🇷", "🌴"],  difficulty: "medium", aliases: ["brasilia"],                          hint: "Brazil — Purpose-built in the 1960s, not Rio" },
  { id: 11, answer: "Ottawa",         clues: ["🇨🇦", "🍁"],  difficulty: "medium", aliases: [],                                    hint: "Canada — Not Toronto or Vancouver" },
  { id: 12, answer: "Mexico City",    clues: ["🇲🇽", "🌮"],  difficulty: "medium", aliases: ["ciudad de mexico", "cdmx"],          hint: "Mexico — One of the largest cities in the world" },
  { id: 13, answer: "Moscow",         clues: ["🇷🇺", "❄️"],  difficulty: "medium", aliases: ["moskva"],                            hint: "Russia — Located on the Moskva River" },
  { id: 14, answer: "New Delhi",      clues: ["🇮🇳", "🐘"],  difficulty: "medium", aliases: ["delhi"],                             hint: "India — Built next to the ancient city of Delhi" },
  { id: 15, answer: "Stockholm",      clues: ["🇸🇪", "👑"],  difficulty: "medium", aliases: [],                                    hint: "Sweden — Built on 14 islands" },
  { id: 16, answer: "Buenos Aires",   clues: ["🇦🇷", "🥩"],  difficulty: "medium", aliases: [],                                    hint: "Argentina — The Paris of South America" },
  { id: 17, answer: "Cairo",          clues: ["🇪🇬", "🐪"],  difficulty: "medium", aliases: [],                                    hint: "Egypt — Near the Pyramids of Giza" },

  // Hard
  { id: 18, answer: "Wellington",     clues: ["🇳🇿", "🥝"],  difficulty: "hard",   aliases: [],                                    hint: "New Zealand — Southernmost capital of a sovereign state" },
  { id: 19, answer: "Astana",         clues: ["🇰🇿", "🌾"],  difficulty: "hard",   aliases: ["nur-sultan", "nursultan"],           hint: "Kazakhstan — Has been renamed multiple times since 1991" },
  { id: 20, answer: "Islamabad",      clues: ["🇵🇰", "🕌"],  difficulty: "hard",   aliases: [],                                    hint: "Pakistan — Purpose-built capital, replaced Karachi" },
  { id: 21, answer: "Abuja",          clues: ["🇳🇬", "🦅"],  difficulty: "hard",   aliases: [],                                    hint: "Nigeria — Replaced Lagos as capital in 1991" },
  { id: 22, answer: "Rabat",          clues: ["🇲🇦", "🌙"],  difficulty: "hard",   aliases: [],                                    hint: "Morocco — Not Casablanca" },
  { id: 23, answer: "Nairobi",        clues: ["🇰🇪", "🦁"],  difficulty: "hard",   aliases: [],                                    hint: "Kenya — Name means 'cool water' in Maasai" },
  { id: 24, answer: "Kuala Lumpur",   clues: ["🇲🇾", "🏙️"], difficulty: "hard",   aliases: ["kl"],                                hint: "Malaysia — Home of the Petronas Twin Towers" },
  { id: 25, answer: "Reykjavik",      clues: ["🇮🇸", "🌋"],  difficulty: "hard",   aliases: ["reykjavík"],                         hint: "Iceland — Northernmost capital of a sovereign state" },
];

export default questions;

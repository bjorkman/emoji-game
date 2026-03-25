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
  { id: 9,  answer: "Seoul",          clues: ["🇰🇷", "🎵"],  difficulty: "easy",   aliases: [],                                    hint: "South Korea — K-pop capital of the world" },
  { id: 10, answer: "Athens",         clues: ["🇬🇷", "🏛️"], difficulty: "easy",   aliases: [],                                    hint: "Greece — Birthplace of democracy" },
  { id: 11, answer: "Bangkok",        clues: ["🇹🇭", "🛕"],  difficulty: "easy",   aliases: ["krung thep"],                        hint: "Thailand — Has the longest city name in the world" },
  { id: 12, answer: "Lisbon",         clues: ["🇵🇹", "⛵"],  difficulty: "easy",   aliases: ["lisboa"],                            hint: "Portugal — City of Seven Hills on the Tagus River" },

  // Medium
  { id: 13, answer: "Canberra",       clues: ["🇦🇺", "🦘"],  difficulty: "medium", aliases: [],                                    hint: "Australia — Not Sydney or Melbourne" },
  { id: 14, answer: "Brasília",       clues: ["🇧🇷", "🌴"],  difficulty: "medium", aliases: ["brasilia"],                          hint: "Brazil — Purpose-built in the 1960s, not Rio" },
  { id: 15, answer: "Ottawa",         clues: ["🇨🇦", "🍁"],  difficulty: "medium", aliases: [],                                    hint: "Canada — Not Toronto or Vancouver" },
  { id: 16, answer: "Mexico City",    clues: ["🇲🇽", "🌮"],  difficulty: "medium", aliases: ["ciudad de mexico", "cdmx"],          hint: "Mexico — One of the largest cities in the world" },
  { id: 17, answer: "Moscow",         clues: ["🇷🇺", "❄️"],  difficulty: "medium", aliases: ["moskva"],                            hint: "Russia — Located on the Moskva River" },
  { id: 18, answer: "New Delhi",      clues: ["🇮🇳", "🐘"],  difficulty: "medium", aliases: ["delhi"],                             hint: "India — Built next to the ancient city of Delhi" },
  { id: 19, answer: "Stockholm",      clues: ["🇸🇪", "👑"],  difficulty: "medium", aliases: [],                                    hint: "Sweden — Built on 14 islands" },
  { id: 20, answer: "Buenos Aires",   clues: ["🇦🇷", "🥩"],  difficulty: "medium", aliases: [],                                    hint: "Argentina — The Paris of South America" },
  { id: 21, answer: "Cairo",          clues: ["🇪🇬", "🐪"],  difficulty: "medium", aliases: [],                                    hint: "Egypt — Near the Pyramids of Giza" },
  { id: 22, answer: "Lima",           clues: ["🇵🇪", "🦙"],  difficulty: "medium", aliases: [],                                    hint: "Peru — Largest city on the Pacific coast of South America" },
  { id: 23, answer: "Jakarta",        clues: ["🇮🇩", "🌋"],  difficulty: "medium", aliases: [],                                    hint: "Indonesia — One of the most densely populated cities on Earth" },
  { id: 24, answer: "Hanoi",          clues: ["🇻🇳", "🍜"],  difficulty: "medium", aliases: [],                                    hint: "Vietnam — City of the Ascending Dragon" },
  { id: 25, answer: "Warsaw",         clues: ["🇵🇱", "🧱"],  difficulty: "medium", aliases: ["warszawa"],                          hint: "Poland — Rebuilt almost entirely after World War II" },
  { id: 26, answer: "Oslo",           clues: ["🇳🇴", "🎿"],  difficulty: "medium", aliases: [],                                    hint: "Norway — Home of the Nobel Peace Prize" },
  { id: 27, answer: "Amsterdam",      clues: ["🇳🇱", "🌷"],  difficulty: "medium", aliases: [],                                    hint: "Netherlands — City of Canals" },
  { id: 28, answer: "Pretoria",       clues: ["🇿🇦", "🦁"],  difficulty: "medium", aliases: ["tshwane"],                           hint: "South Africa — One of three capital cities in this country" },

  // Hard
  { id: 29, answer: "Wellington",     clues: ["🇳🇿", "🥝"],  difficulty: "hard",   aliases: [],                                    hint: "New Zealand — Southernmost capital of a sovereign state" },
  { id: 30, answer: "Astana",         clues: ["🇰🇿", "🌾"],  difficulty: "hard",   aliases: ["nur-sultan", "nursultan"],           hint: "Kazakhstan — Has been renamed multiple times since 1991" },
  { id: 31, answer: "Islamabad",      clues: ["🇵🇰", "🕌"],  difficulty: "hard",   aliases: [],                                    hint: "Pakistan — Purpose-built capital, replaced Karachi" },
  { id: 32, answer: "Abuja",          clues: ["🇳🇬", "🦅"],  difficulty: "hard",   aliases: [],                                    hint: "Nigeria — Replaced Lagos as capital in 1991" },
  { id: 33, answer: "Rabat",          clues: ["🇲🇦", "🌙"],  difficulty: "hard",   aliases: [],                                    hint: "Morocco — Not Casablanca" },
  { id: 34, answer: "Nairobi",        clues: ["🇰🇪", "🦁"],  difficulty: "hard",   aliases: [],                                    hint: "Kenya — Name means 'cool water' in Maasai" },
  { id: 35, answer: "Kuala Lumpur",   clues: ["🇲🇾", "🏙️"], difficulty: "hard",   aliases: ["kl"],                                hint: "Malaysia — Home of the Petronas Twin Towers" },
  { id: 36, answer: "Reykjavik",      clues: ["🇮🇸", "🌋"],  difficulty: "hard",   aliases: ["reykjavík"],                         hint: "Iceland — Northernmost capital of a sovereign state" },
  { id: 37, answer: "Manila",         clues: ["🇵🇭", "🏝️"], difficulty: "hard",   aliases: [],                                    hint: "Philippines — Named after a flowering mangrove plant" },
  { id: 38, answer: "Prague",         clues: ["🇨🇿", "🏰"],  difficulty: "hard",   aliases: ["praha"],                             hint: "Czech Republic — City of a Hundred Spires" },
  { id: 39, answer: "Bucharest",      clues: ["🇷🇴", "🏛️"], difficulty: "hard",   aliases: ["bucuresti"],                         hint: "Romania — Once called the Little Paris of the East" },
  { id: 40, answer: "Havana",         clues: ["🇨🇺", "🚗"],  difficulty: "hard",   aliases: ["la habana"],                         hint: "Cuba — Famous for its vintage cars and colorful buildings" },
];

export default questions;

import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy (9 questions) - globally famous clubs
  { id: 1,  answer: "Real Madrid",       clues: ["👑", "⚪", "🇪🇸"],          difficulty: "easy",   aliases: ["real", "rmcf", "real madrid cf", "los blancos"],                          hint: "The royal whites from Spain's capital" },
  { id: 2,  answer: "Barcelona",         clues: ["🔵", "🔴", "🇪🇸"],          difficulty: "easy",   aliases: ["barca", "fc barcelona", "fcb", "blaugrana"],                              hint: "More than a club, based in Catalonia" },
  { id: 3,  answer: "Manchester United", clues: ["🔴", "😈", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],      difficulty: "easy",   aliases: ["man utd", "man united", "mufc", "man u", "united"],                       hint: "The Red Devils from Old Trafford" },
  { id: 4,  answer: "Liverpool",         clues: ["🔴", "🐦", "🎵"],           difficulty: "easy",   aliases: ["lfc", "liverpool fc", "the reds"],                                        hint: "You'll Never Walk Alone" },
  { id: 5,  answer: "Bayern Munich",     clues: ["🔴", "⚪", "🥨"],           difficulty: "easy",   aliases: ["bayern", "bayern munchen", "fc bayern", "fc bayern munchen", "fcb munich"], hint: "Bavarian giants, most titles in Germany" },
  { id: 6,  answer: "PSG",              clues: ["🗼", "🔵", "🔴"],           difficulty: "easy",   aliases: ["paris saint-germain", "paris saint germain", "paris sg", "paris"],         hint: "The Parisian club backed by Qatar" },
  { id: 7,  answer: "Juventus",         clues: ["⬛", "⬜", "🦓"],           difficulty: "easy",   aliases: ["juve", "juventus fc", "the old lady", "la vecchia signora"],               hint: "Turin's black and white zebras" },
  { id: 8,  answer: "Chelsea",          clues: ["🔵", "🦁", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],      difficulty: "easy",   aliases: ["chelsea fc", "cfc", "the blues"],                                         hint: "West London blues with a lion crest" },
  { id: 9,  answer: "AC Milan",         clues: ["🔴", "⚫", "😈"],           difficulty: "easy",   aliases: ["milan", "ac milan 1899", "rossoneri", "acm"],                              hint: "The red and black devils of Milan" },

  // Medium (8 questions) - well-known European clubs
  { id: 10, answer: "AIK",              clues: ["🖤", "💛", "🇸🇪"],          difficulty: "medium", aliases: ["aik fotboll", "aik stockholm", "gnaget", "aik ff"],                       hint: "Stockholm's oldest football club, black and gold" },
  { id: 11, answer: "Borussia Dortmund", clues: ["💛", "🖤", "🧱"],          difficulty: "medium", aliases: ["dortmund", "bvb", "borussia", "bvb 09"],                                  hint: "The Yellow Wall is their famous stand" },
  { id: 12, answer: "Arsenal",          clues: ["🔴", "🔫", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],      difficulty: "medium", aliases: ["arsenal fc", "afc", "the gunners"],                                      hint: "North London's Gunners" },
  { id: 13, answer: "Atletico Madrid",  clues: ["🔴", "⬜", "🐻"],           difficulty: "medium", aliases: ["atletico", "atleti", "atletico de madrid", "atm"],                         hint: "Madrid's other team, the bear and the tree" },
  { id: 14, answer: "Inter Milan",      clues: ["🔵", "⚫", "🐍"],           difficulty: "medium", aliases: ["inter", "internazionale", "inter fc", "fc internazionale"],                hint: "The Nerazzurri serpent from Milan" },
  { id: 15, answer: "Napoli",           clues: ["🔵", "🌋", "🍕"],           difficulty: "medium", aliases: ["ssc napoli", "napoli fc", "gli azzurri"],                                  hint: "Southern Italian club near Vesuvius" },
  { id: 16, answer: "Tottenham",        clues: ["⚪", "🐓", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],      difficulty: "medium", aliases: ["spurs", "tottenham hotspur", "thfc", "tottenham fc"],                     hint: "The cockerel on their crest" },
  { id: 17, answer: "Ajax",             clues: ["🔴", "⚪", "🇳🇱"],          difficulty: "medium", aliases: ["ajax amsterdam", "afc ajax", "ajax fc"],                                   hint: "Dutch giants named after a Greek hero" },

  // Hard (8 questions) - still recognizable but trickier
  { id: 18, answer: "Roma",             clues: ["🐺", "🟡", "🔴"],           difficulty: "hard",   aliases: ["as roma", "roma fc", "la lupa"],                                           hint: "The she-wolf raised Romulus and Remus" },
  { id: 19, answer: "Marseille",        clues: ["🔵", "⚪", "⛵"],           difficulty: "hard",   aliases: ["om", "olympique de marseille", "olympique marseille"],                      hint: "France's passionate port city club" },
  { id: 20, answer: "Benfica",          clues: ["🔴", "🦅", "🇵🇹"],          difficulty: "hard",   aliases: ["sl benfica", "benfica lisbon", "sport lisboa e benfica"],                   hint: "Lisbon's eagles in red" },
  { id: 21, answer: "Celtic",           clues: ["🍀", "💚", "🏴󠁧󠁢󠁳󠁣󠁴󠁿"],      difficulty: "hard",   aliases: ["celtic fc", "celtic glasgow", "the bhoys", "the hoops"],                   hint: "Glasgow's green and white hoops" },
  { id: 22, answer: "Porto",            clues: ["🔵", "⚪", "🐉"],           difficulty: "hard",   aliases: ["fc porto", "porto fc", "fcp"],                                             hint: "Portuguese dragons in blue and white" },
  { id: 23, answer: "Lazio",            clues: ["🦅", "🔵", "⚪"],           difficulty: "hard",   aliases: ["ss lazio", "lazio roma", "lazio fc"],                                      hint: "Rome's sky blue eagle" },
  { id: 24, answer: "Lyon",             clues: ["🦁", "🔵", "🔴"],           difficulty: "hard",   aliases: ["olympique lyonnais", "ol", "olympique lyon"],                               hint: "French club with a lion emblem" },
  { id: 25, answer: "Sevilla",          clues: ["⚪", "🔴", "🏟️"],           difficulty: "hard",   aliases: ["sevilla fc", "sfc", "sevilla futbol club"],                                 hint: "Andalusian club, Europa League kings" },
];

export default questions;

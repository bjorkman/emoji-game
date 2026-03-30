import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy (9) - universally known anime characters
  { id: 1,  answer: "Naruto",            clues: ["🍥", "🦊", "🍜"],      difficulty: "easy",   aliases: ["naruto uzumaki", "uzumaki naruto"],                          hint: "A ninja with a fox spirit sealed inside him" },
  { id: 2,  answer: "Goku",              clues: ["🐒", "💪", "🟠"],      difficulty: "easy",   aliases: ["son goku", "kakarot", "son gokou"],                          hint: "Saiyan warrior who loves fighting and food" },
  { id: 3,  answer: "Sailor Moon",       clues: ["🌙", "👸", "✨"],      difficulty: "easy",   aliases: ["usagi tsukino", "tsukino usagi", "usagi", "serena"],          hint: "A clumsy schoolgirl who transforms to fight evil by moonlight" },
  { id: 4,  answer: "Pikachu",           clues: ["⚡", "🐭", "💛"],      difficulty: "easy",   aliases: [],                                                             hint: "The most famous electric-type pocket monster" },
  { id: 5,  answer: "Luffy",             clues: ["🏴‍☠️", "🍖", "💪"],  difficulty: "easy",   aliases: ["monkey d luffy", "monkey d. luffy", "straw hat luffy"],       hint: "A rubber pirate who wants to be king" },
  { id: 6,  answer: "Totoro",            clues: ["🌳", "☂️", "😺"],      difficulty: "easy",   aliases: ["my neighbor totoro"],                                         hint: "A giant fluffy forest spirit from a Ghibli film" },
  { id: 7,  answer: "Eren Yeager",       clues: ["🧱", "⚔️", "😡"],     difficulty: "easy",   aliases: ["eren jaeger", "eren", "eren yeager"],                         hint: "He swore to destroy every last one of the titans" },
  { id: 8,  answer: "Gon Freecss",       clues: ["🎣", "🌿", "👦"],      difficulty: "easy",   aliases: ["gon", "gon freecs"],                                          hint: "A boy searching for his absent hunter father" },
  { id: 9,  answer: "Tanjiro Kamado",    clues: ["🌊", "👃", "😈"],      difficulty: "easy",   aliases: ["tanjiro", "kamado tanjiro"],                                   hint: "A kind demon slayer with an incredible sense of smell" },

  // Medium (8) - popular but need some anime knowledge
  { id: 10, answer: "Levi Ackerman",     clues: ["🧹", "⚔️", "🦅"],     difficulty: "medium", aliases: ["levi", "captain levi", "rivai ackerman"],                     hint: "Humanity's strongest soldier who loves cleanliness" },
  { id: 11, answer: "Vegeta",            clues: ["👑", "💪", "😤"],      difficulty: "medium", aliases: ["prince vegeta", "vegeta prince of saiyans"],                   hint: "The proud prince of a warrior alien race" },
  { id: 12, answer: "Spike Spiegel",     clues: ["🚬", "🚀", "🥋"],     difficulty: "medium", aliases: ["spike"],                                                       hint: "A laid-back bounty hunter in space with a jazzy soundtrack" },
  { id: 13, answer: "Itachi Uchiha",     clues: ["👁️", "🐦‍⬛", "🌙"], difficulty: "medium", aliases: ["itachi", "uchiha itachi"],                                     hint: "He massacred his own clan to protect his village" },
  { id: 14, answer: "Mikasa Ackerman",   clues: ["🧣", "⚔️", "❤️"],     difficulty: "medium", aliases: ["mikasa"],                                                      hint: "A fierce soldier who always protects her childhood friend" },
  { id: 15, answer: "Deku",              clues: ["🥦", "💚", "✊"],      difficulty: "medium", aliases: ["izuku midoriya", "midoriya izuku", "midoriya", "izuku"],       hint: "A quirkless boy who inherits the greatest power" },
  { id: 16, answer: "Killua Zoldyck",    clues: ["⚡", "🐱", "🔪"],     difficulty: "medium", aliases: ["killua", "zoldyck killua"],                                    hint: "An assassin kid who befriends a boy on a fishing rod quest" },
  { id: 17, answer: "Asuka Langley",     clues: ["🤖", "🔴", "😠"],     difficulty: "medium", aliases: ["asuka", "asuka langley soryu", "asuka langley shikinami"],     hint: "A fiery redhead who pilots a giant red mecha" },

  // Hard (8) - deep cuts for anime fans
  { id: 18, answer: "Light Yagami",      clues: ["📓", "💀", "🍎"],      difficulty: "hard",   aliases: ["light", "yagami light", "kira"],                               hint: "A genius student who finds a supernatural notebook" },
  { id: 19, answer: "Guts",              clues: ["🗡️", "🖤", "🫳"],     difficulty: "hard",   aliases: ["the black swordsman", "gatsu"],                                hint: "A lone mercenary wielding an impossibly huge sword" },
  { id: 20, answer: "Rei Ayanami",       clues: ["🔵", "🤖", "😶"],     difficulty: "hard",   aliases: ["rei", "ayanami rei"],                                          hint: "A mysterious, emotionless pilot of a giant mecha" },
  { id: 21, answer: "Lelouch",           clues: ["👁️", "♟️", "👑"],     difficulty: "hard",   aliases: ["lelouch lamperouge", "lelouch vi britannia", "zero"],          hint: "An exiled prince with the power of absolute obedience" },
  { id: 22, answer: "Edward Elric",      clues: ["🦾", "⚗️", "🤏"],     difficulty: "hard",   aliases: ["ed", "edward", "fullmetal", "elric edward"],                   hint: "A short alchemist with a metal arm and leg" },
  { id: 23, answer: "Roronoa Zoro",      clues: ["🗡️", "🗡️", "🗡️"],   difficulty: "hard",   aliases: ["zoro", "zolo", "roronoa zoro", "pirate hunter zoro"],          hint: "A swordsman who wields three blades at once" },
  { id: 24, answer: "Mob",               clues: ["👻", "💯", "😐"],      difficulty: "hard",   aliases: ["shigeo kageyama", "kageyama shigeo"],                          hint: "An unassuming psychic boy who bottles up his emotions" },
  { id: 25, answer: "Johan Liebert",     clues: ["👱", "😈", "🧊"],      difficulty: "hard",   aliases: ["johan", "the monster", "the nameless monster"],                hint: "A charming, terrifying serial manipulator from Germany" },
];

export default questions;

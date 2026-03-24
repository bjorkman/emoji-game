import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "The Lion King",       clues: ["👑", "🦁", "🌅"],      difficulty: "easy",   aliases: ["lion king"],               hint: "Disney classic — 'Hakuna Matata'" },
  { id: 2,  answer: "Frozen",              clues: ["❄️", "👸", "⛄"],      difficulty: "easy",   aliases: [],                          hint: "Disney — 'Let It Go'" },
  { id: 3,  answer: "Finding Nemo",        clues: ["🐠", "🌊", "🔍"],      difficulty: "easy",   aliases: ["nemo"],                    hint: "Pixar — a clownfish searches the whole ocean" },
  { id: 4,  answer: "Toy Story",           clues: ["🤠", "🚀", "🧸"],      difficulty: "easy",   aliases: [],                          hint: "Pixar — toys come alive when humans leave" },
  { id: 5,  answer: "The Little Mermaid",  clues: ["🧜‍♀️", "🐚", "🌊"], difficulty: "easy",   aliases: ["little mermaid"],          hint: "Disney — she wants to be part of your world" },
  { id: 6,  answer: "Shrek",               clues: ["🧅", "🟢", "🐉"],      difficulty: "easy",   aliases: [],                          hint: "DreamWorks — a grumpy green ogre from a swamp" },
  { id: 7,  answer: "Cars",                clues: ["🏎️", "⚡", "🏁"],     difficulty: "easy",   aliases: [],                          hint: "Pixar — a racing car gets lost in a small town" },
  { id: 8,  answer: "Up",                  clues: ["🎈", "🏠", "👴"],      difficulty: "easy",   aliases: [],                          hint: "Pixar — a house floats away on thousands of balloons" },

  // Medium
  { id: 9,  answer: "Moana",               clues: ["🌊", "🌺", "⛵"],      difficulty: "medium", aliases: [],                          hint: "Disney — a Polynesian girl sails to save her island" },
  { id: 10, answer: "Coco",                clues: ["💀", "🎸", "🌸"],      difficulty: "medium", aliases: [],                          hint: "Pixar — set during Día de los Muertos in Mexico" },
  { id: 11, answer: "Zootopia",            clues: ["🦊", "🐰", "🚔"],      difficulty: "medium", aliases: ["zootropolis"],              hint: "Disney — a bunny becomes a police officer in a city of animals" },
  { id: 12, answer: "Inside Out",          clues: ["🧠", "😊", "😢"],      difficulty: "medium", aliases: [],                          hint: "Pixar — your emotions have a life of their own" },
  { id: 13, answer: "Ratatouille",         clues: ["🐀", "👨‍🍳", "🍽️"],  difficulty: "medium", aliases: [],                          hint: "Pixar — a rat dreams of cooking in Paris" },
  { id: 14, answer: "WALL-E",              clues: ["🤖", "🌍", "♻️"],      difficulty: "medium", aliases: ["walle", "wall e"],          hint: "Pixar — a lonely robot left behind on a trashed Earth" },
  { id: 15, answer: "Kung Fu Panda",       clues: ["🐼", "🥋", "🏮"],      difficulty: "medium", aliases: ["kungfu panda"],             hint: "DreamWorks — a clumsy panda becomes a kung fu master" },
  { id: 16, answer: "Aladdin",             clues: ["🧞‍♂️", "🪔", "✨"],  difficulty: "medium", aliases: [],                          hint: "Disney — three wishes from a magic lamp" },
  { id: 17, answer: "The Incredibles",     clues: ["🦸‍♂️", "👨‍👩‍👧‍👦", "🦹"], difficulty: "medium", aliases: ["incredibles"],       hint: "Pixar — a superhero family living in disguise" },

  // Hard
  { id: 18, answer: "Spirited Away",       clues: ["🛁", "👧", "🐉"],      difficulty: "hard",   aliases: [],                          hint: "Studio Ghibli — a girl trapped in a spirit bathhouse" },
  { id: 19, answer: "Encanto",             clues: ["🏡", "🎁", "🌺"],      difficulty: "hard",   aliases: [],                          hint: "Disney — a magical Colombian family, each with a gift" },
  { id: 20, answer: "Luca",                clues: ["🌊", "🏍️", "🇮🇹"],  difficulty: "hard",   aliases: [],                          hint: "Pixar — sea monsters discover an Italian coastal village" },
  { id: 21, answer: "Brave",               clues: ["🏹", "🐻", "🏴󠁧󠁢󠁳󠁣󠁴󠁿"], difficulty: "hard",  aliases: [],                          hint: "Pixar — a Scottish princess accidentally turns her mum into a bear" },
  { id: 22, answer: "Coraline",            clues: ["🪡", "👁️", "🖤"],     difficulty: "hard",   aliases: [],                          hint: "Stop-motion — a girl finds a creepy parallel world behind a secret door" },
  { id: 23, answer: "The Princess and the Frog", clues: ["🐸", "👸", "🎺"], difficulty: "hard", aliases: ["princess and the frog"],    hint: "Disney — set in jazz-era New Orleans" },
  { id: 24, answer: "Bolt",                clues: ["⚡", "🐕", "🎬"],      difficulty: "hard",   aliases: [],                          hint: "Disney — a dog who thinks his TV superpowers are real" },
  { id: 25, answer: "Atlantis",            clues: ["🌊", "🗺️", "💎"],     difficulty: "hard",   aliases: ["atlantis the lost empire"], hint: "Disney — explorers search for a lost underwater city" },
];

export default questions;

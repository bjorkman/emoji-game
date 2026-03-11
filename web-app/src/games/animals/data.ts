import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "Dog",         clues: ["🦴", "🎾", "🐾"],    difficulty: "easy",   aliases: ["puppy"] },
  { id: 2,  answer: "Cat",         clues: ["🐟", "🌙", "🧶"],    difficulty: "easy",   aliases: ["kitten"] },
  { id: 3,  answer: "Elephant",    clues: ["👃", "💧", "🌍"],    difficulty: "easy",   aliases: [] },
  { id: 4,  answer: "Lion",        clues: ["👑", "🌾", "🐾"],    difficulty: "easy",   aliases: [] },
  { id: 5,  answer: "Rabbit",      clues: ["🥕", "👂", "🌿"],    difficulty: "easy",   aliases: ["bunny", "hare"] },
  { id: 6,  answer: "Penguin",     clues: ["🧊", "🐟", "🤵"],    difficulty: "easy",   aliases: [] },
  { id: 7,  answer: "Duck",        clues: ["🌊", "🍞", "🟡"],    difficulty: "easy",   aliases: ["duckling"] },
  { id: 8,  answer: "Giraffe",     clues: ["🌍", "🍃", "🔝"],    difficulty: "easy",   aliases: [] },

  // Medium
  { id: 9,  answer: "Zebra",       clues: ["🌍", "🖤", "🤍"],    difficulty: "medium", aliases: [] },
  { id: 10, answer: "Dolphin",     clues: ["🌊", "😊", "🐟"],    difficulty: "medium", aliases: [] },
  { id: 11, answer: "Bear",        clues: ["🍯", "🌲", "😴"],    difficulty: "medium", aliases: ["grizzly", "grizzly bear"] },
  { id: 12, answer: "Owl",         clues: ["🌙", "👀", "📚"],    difficulty: "medium", aliases: [] },
  { id: 13, answer: "Frog",        clues: ["🌧️", "🌿", "💚"],   difficulty: "medium", aliases: ["toad"] },
  { id: 14, answer: "Parrot",      clues: ["🌴", "🎨", "🗣️"],   difficulty: "medium", aliases: [] },
  { id: 15, answer: "Monkey",      clues: ["🌿", "🍌", "😄"],    difficulty: "medium", aliases: [] },
  { id: 16, answer: "Koala",       clues: ["🌿", "😴", "🇦🇺"], difficulty: "medium", aliases: ["koala bear"] },
  { id: 17, answer: "Flamingo",    clues: ["🩷", "🦵", "🌅"],    difficulty: "medium", aliases: [] },

  // Hard
  { id: 18, answer: "Octopus",     clues: ["🌊", "💜", "8️⃣"],   difficulty: "hard",   aliases: [] },
  { id: 19, answer: "Seahorse",    clues: ["🌊", "🐴", "🤰"],    difficulty: "hard",   aliases: ["sea horse"] },
  { id: 20, answer: "Peacock",     clues: ["💚", "💙", "👁️"],   difficulty: "hard",   aliases: [] },
  { id: 21, answer: "Chameleon",   clues: ["🎨", "🌿", "👀"],    difficulty: "hard",   aliases: [] },
  { id: 22, answer: "Turtle",      clues: ["🌊", "🏠", "🐌"],    difficulty: "hard",   aliases: ["tortoise"] },
  { id: 23, answer: "Sloth",        clues: ["😴", "🙃", "🌳"],    difficulty: "hard",   aliases: [] },
  { id: 24, answer: "Narwhal",     clues: ["🌊", "🦄", "❄️"],    difficulty: "hard",   aliases: [] },
  { id: 25, answer: "Capybara",    clues: ["🇧🇷", "🌊", "🐹"],  difficulty: "hard",   aliases: [] },
];

export default questions;

import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "Dog",         clues: ["🦴", "🎾", "🐾"],    difficulty: "easy",   aliases: ["puppy"],                   hint: "Domesticated for over 15,000 years" },
  { id: 2,  answer: "Cat",         clues: ["🐟", "🌙", "🧶"],    difficulty: "easy",   aliases: ["kitten"],                  hint: "Spends up to 16 hours a day sleeping" },
  { id: 3,  answer: "Elephant",    clues: ["👃", "💧", "🌍"],    difficulty: "easy",   aliases: [],                          hint: "Largest land animal on Earth" },
  { id: 4,  answer: "Lion",        clues: ["👑", "🌾", "🐾"],    difficulty: "easy",   aliases: [],                          hint: "Only big cat that lives in groups (prides)" },
  { id: 5,  answer: "Rabbit",      clues: ["🥕", "👂", "🌿"],    difficulty: "easy",   aliases: ["bunny", "hare"],           hint: "Teeth never stop growing" },
  { id: 6,  answer: "Penguin",     clues: ["🧊", "🐟", "🤵"],    difficulty: "easy",   aliases: [],                          hint: "Bird that cannot fly but can swim at 25 mph" },
  { id: 7,  answer: "Duck",        clues: ["🌊", "🍞", "🟡"],    difficulty: "easy",   aliases: ["duckling"],                hint: "Waterproof feathers thanks to a preen gland" },
  { id: 8,  answer: "Giraffe",     clues: ["🌍", "🍃", "🔝"],    difficulty: "easy",   aliases: [],                          hint: "Tallest living terrestrial animal" },

  // Medium
  { id: 9,  answer: "Zebra",       clues: ["🌍", "🖤", "🤍"],    difficulty: "medium", aliases: [],                          hint: "Every individual has a unique stripe pattern" },
  { id: 10, answer: "Dolphin",     clues: ["🌊", "😊", "🐟"],    difficulty: "medium", aliases: [],                          hint: "Sleeps with one eye open" },
  { id: 11, answer: "Bear",        clues: ["🍯", "🌲", "😴"],    difficulty: "medium", aliases: ["grizzly", "grizzly bear"], hint: "Heartbeat drops to 8 beats per minute during hibernation" },
  { id: 12, answer: "Owl",         clues: ["🌙", "👀", "📚"],    difficulty: "medium", aliases: [],                          hint: "Cannot move its eyeballs — rotates its head instead" },
  { id: 13, answer: "Frog",        clues: ["🌧️", "🌿", "💚"],   difficulty: "medium", aliases: ["toad"],                    hint: "Drinks water through its skin, not its mouth" },
  { id: 14, answer: "Parrot",      clues: ["🌴", "🎨", "🗣️"],   difficulty: "medium", aliases: [],                          hint: "Can live for over 80 years" },
  { id: 15, answer: "Monkey",      clues: ["🌿", "🍌", "😄"],    difficulty: "medium", aliases: [],                          hint: "Has fingerprints almost identical to humans" },
  { id: 16, answer: "Koala",       clues: ["🌿", "😴", "🇦🇺"], difficulty: "medium", aliases: ["koala bear"],              hint: "Eats only eucalyptus leaves, which are toxic to most animals" },
  { id: 17, answer: "Flamingo",    clues: ["🩷", "🦵", "🌅"],    difficulty: "medium", aliases: [],                          hint: "Born white — pink color comes from its diet" },

  // Hard
  { id: 18, answer: "Octopus",     clues: ["🌊", "💜", "8️⃣"],   difficulty: "hard",   aliases: [],                          hint: "Has three hearts and blue blood" },
  { id: 19, answer: "Seahorse",    clues: ["🌊", "🐴", "🤰"],    difficulty: "hard",   aliases: ["sea horse"],               hint: "The male carries and gives birth to the young" },
  { id: 20, answer: "Peacock",     clues: ["💚", "💙", "👁️"],   difficulty: "hard",   aliases: [],                          hint: "Its tail is called a train, not a tail" },
  { id: 21, answer: "Chameleon",   clues: ["🎨", "🌿", "👀"],    difficulty: "hard",   aliases: [],                          hint: "Each eye can move independently" },
  { id: 22, answer: "Turtle",      clues: ["🌊", "🏠", "🐌"],    difficulty: "hard",   aliases: ["tortoise"],                hint: "Some species can live over 200 years" },
  { id: 23, answer: "Sloth",       clues: ["😴", "🙃", "🌳"],    difficulty: "hard",   aliases: [],                          hint: "Takes two weeks to digest a single meal" },
  { id: 24, answer: "Narwhal",     clues: ["🌊", "🦄", "❄️"],    difficulty: "hard",   aliases: [],                          hint: "Its 'horn' is actually a tooth that grows up to 10 feet" },
  { id: 25, answer: "Capybara",    clues: ["🇧🇷", "🌊", "🐹"],  difficulty: "hard",   aliases: [],                          hint: "World's largest rodent" },
];

export default questions;

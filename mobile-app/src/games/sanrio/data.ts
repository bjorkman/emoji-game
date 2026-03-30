import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy
  { id: 1,  answer: "Hello Kitty",       clues: ["🐱", "🎀", "❤️"],          difficulty: "easy",   aliases: ["hellokitty", "kitty", "kitty white"],              hint: "The face of Sanrio since 1974" },
  { id: 2,  answer: "Cinnamoroll",        clues: ["☁️", "🐶", "🧁"],          difficulty: "easy",   aliases: ["cinnamon", "cinnamon roll"],                       hint: "A white puppy who flies with his ears" },
  { id: 3,  answer: "My Melody",          clues: ["🐰", "🩷", "🎵"],          difficulty: "easy",   aliases: ["mymelody", "melody"],                              hint: "A pink-hooded bunny who loves music" },
  { id: 4,  answer: "Kuromi",             clues: ["🐰", "💜", "💀"],          difficulty: "easy",   aliases: [],                                                  hint: "My Melody's mischievous rival" },
  { id: 5,  answer: "Pompompurin",        clues: ["🐶", "🍮", "👒"],          difficulty: "easy",   aliases: ["purin", "pompom purin", "pom pom purin"],          hint: "A golden retriever in a brown beret" },
  { id: 6,  answer: "Keroppi",            clues: ["🐸", "🏊", "💚"],          difficulty: "easy",   aliases: ["kerokerokeroppi", "kerokero keroppi"],             hint: "An adventurous frog who loves swimming" },
  { id: 7,  answer: "Badtz-Maru",         clues: ["🐧", "😎", "⭐"],          difficulty: "easy",   aliases: ["badtz maru", "badtzmaru", "bad badtz-maru"],      hint: "A spiky-haired penguin with attitude" },

  // Medium
  { id: 8,  answer: "Little Twin Stars",  clues: ["⭐", "👫", "🌙"],          difficulty: "medium", aliases: ["lala and kiki", "kiki and lala", "little twin star", "twinstars"], hint: "Star siblings Kiki and Lala" },
  { id: 9,  answer: "Pochacco",           clues: ["🐶", "⚽", "⚪"],          difficulty: "medium", aliases: [],                                                  hint: "A sporty white dog with floppy black ears" },
  { id: 10, answer: "Tuxedosam",          clues: ["🐧", "🎩", "❄️"],          difficulty: "medium", aliases: ["tuxedo sam"],                                      hint: "A dapper penguin in a bow tie" },
  { id: 11, answer: "Chococat",           clues: ["🐱", "🍫", "🖤"],          difficulty: "medium", aliases: ["choco cat"],                                       hint: "A black cat with chocolate-chip-shaped whiskers" },
  { id: 12, answer: "Gudetama",           clues: ["🥚", "😴", "💛"],          difficulty: "medium", aliases: ["gude tama"],                                       hint: "The laziest egg in the world" },
  { id: 13, answer: "Aggretsuko",         clues: ["🦊", "🎤", "😡"],          difficulty: "medium", aliases: ["aggressive retsuko", "retsuko"],                   hint: "An office worker red panda who does death metal karaoke" },
  { id: 14, answer: "Dear Daniel",        clues: ["🐱", "💙", "🎵"],          difficulty: "medium", aliases: ["daniel star", "daniel"],                           hint: "Hello Kitty's childhood friend and boyfriend" },

  // Hard
  { id: 15, answer: "Cinnamoangels",      clues: ["👼", "☁️", "🤍"],          difficulty: "hard",   aliases: ["cinnamo angels", "cinnamoangel"],                  hint: "Cinnamoroll's angel companions" },
  { id: 16, answer: "Corocorokuririn",    clues: ["🐹", "🌻", "🌀"],          difficulty: "hard",   aliases: ["kuririn", "corocoro kuririn"],                     hint: "A round hamster who loves sunflower seeds" },
  { id: 17, answer: "Marumofubiyori",     clues: ["🐻", "☁️", "♨️"],          difficulty: "hard",   aliases: ["moppu", "marumofubi yori"],                        hint: "A bear who loves hot springs and hiding in corners" },
  { id: 18, answer: "Wish Me Mell",       clues: ["🐰", "🌸", "🍯"],          difficulty: "hard",   aliases: ["wishmemell", "mell"],                              hint: "A honey-collecting bunny from Merci Hills" },
  { id: 19, answer: "Hangyodon",          clues: ["🐟", "👽", "🌊"],          difficulty: "hard",   aliases: ["hangyodon man"],                                   hint: "A half-fish creature from the deep sea" },
  { id: 20, answer: "Tabo",               clues: ["🐸", "🧢", "💭"],          difficulty: "hard",   aliases: [],                                                  hint: "A daydreaming frog in a baseball cap" },
];

export default questions;

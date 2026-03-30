import { type Question } from '../../core/types';

const questions: Question[] = [
  // Easy (9 questions) - universally known memes
  { id: 1,  answer: "Distracted Boyfriend",   clues: ["👫", "😍", "👀"],       difficulty: "easy",   aliases: ["distracted bf", "jealous girlfriend", "man looking at other woman", "guy looking back"],  hint: "Stock photo — a guy checks out another woman while his girlfriend glares" },
  { id: 2,  answer: "This Is Fine",           clues: ["🐶", "☕", "🔥"],       difficulty: "easy",   aliases: ["this is fine dog", "everything is fine", "fire dog"],                                     hint: "A cartoon dog sits calmly in a burning room" },
  { id: 3,  answer: "Rickroll",               clues: ["🎤", "🕺", "🙅‍♂️"],  difficulty: "easy",   aliases: ["rick roll", "rick astley", "never gonna give you up"],                                    hint: "Never gonna give you up, never gonna let you down" },
  { id: 4,  answer: "Doge",                   clues: ["🐕", "😮", "✨"],       difficulty: "easy",   aliases: ["doge meme", "shiba inu meme", "such wow", "much wow"],                                   hint: "Such wow. Much amaze. A Shiba Inu with comic sans text" },
  { id: 5,  answer: "Nyan Cat",               clues: ["🐱", "🌈", "🍞"],       difficulty: "easy",   aliases: ["nyan", "pop tart cat", "rainbow cat"],                                                   hint: "A pixelated cat with a pastry body flies through space trailing a rainbow" },
  { id: 6,  answer: "Pepe the Frog",          clues: ["🐸", "😏", "💚"],       difficulty: "easy",   aliases: ["pepe", "feels good man", "sad frog", "rare pepe"],                                       hint: "A green cartoon frog — 'Feels good man'" },
  { id: 7,  answer: "Surprised Pikachu",      clues: ["⚡", "😮", "😲"],       difficulty: "easy",   aliases: ["pikachu meme", "shocked pikachu", "pikachu face", "pikachu surprised"],                  hint: "A Pokemon with a wide-open mouth, used for obvious outcomes" },
  { id: 8,  answer: "Drake Hotline Bling",    clues: ["🙅‍♂️", "🙆‍♂️", "🎵"], difficulty: "easy", aliases: ["drake meme", "drake", "hotline bling", "drake approve", "drake disapprove"],              hint: "A rapper in two panels — rejecting one thing, approving another" },
  { id: 9,  answer: "Crying Michael Jordan",  clues: ["🏀", "😭", "🏆"],       difficulty: "easy",   aliases: ["crying jordan", "jordan crying", "michael jordan crying"],                                hint: "A basketball legend's tearful Hall of Fame speech became a reaction image" },

  // Medium (8 questions) - well-known but slightly harder
  { id: 10, answer: "Stonks",                 clues: ["📈", "🤵", "💰"],       difficulty: "medium", aliases: ["stonks meme", "stonks man", "meme man stonks", "not stonks"],                             hint: "A 3D-rendered mannequin head in a suit with a green arrow going up" },
  { id: 11, answer: "Woman Yelling at Cat",   clues: ["😡", "👩", "🐱"],       difficulty: "medium", aliases: ["woman yelling at a cat", "cat at dinner table", "smudge the cat", "confused cat"],       hint: "Two images combined — an angry reality TV star and a confused white cat at a dinner table" },
  { id: 12, answer: "Change My Mind",         clues: ["☕", "📋", "🤔"],       difficulty: "medium", aliases: ["prove me wrong", "steven crowder", "crowder meme"],                                      hint: "A man sits at a folding table with a sign, inviting debate" },
  { id: 13, answer: "Expanding Brain",        clues: ["🧠", "💡", "🌌"],       difficulty: "medium", aliases: ["galaxy brain", "brain meme", "brain expanding", "big brain"],                            hint: "Four panels showing a brain getting bigger and more cosmic with each idea" },
  { id: 14, answer: "Roll Safe",              clues: ["☝️", "😏", "🧠"],       difficulty: "medium", aliases: ["think about it", "thinking meme", "you cant fail", "pointing at head", "smart meme"],    hint: "A man tapping his temple with a sly grin — can't fail if you don't try" },
  { id: 15, answer: "Two Buttons",            clues: ["🔴", "🔵", "😰"],       difficulty: "medium", aliases: ["daily struggle", "two button meme", "hard choice"],                                      hint: "A sweating man must choose between two buttons" },
  { id: 16, answer: "Hide the Pain Harold",   clues: ["👴", "😀", "😢"],       difficulty: "medium", aliases: ["harold", "hide the pain", "pain harold", "stock photo old man"],                         hint: "A stock photo man smiling on the outside but clearly dying inside" },
  { id: 17, answer: "Success Kid",            clues: ["👶", "✊", "😤"],       difficulty: "medium", aliases: ["success baby", "fist pump baby", "i hate sandcastles"],                                   hint: "A toddler on the beach clenching his fist in triumph" },

  // Hard (8 questions) - deeper internet culture
  { id: 18, answer: "Loss",                   clues: ["📰", "4️⃣", "🏥"],       difficulty: "hard",   aliases: ["loss meme", "is this loss", "loss.jpg", "loss comic"],                                   hint: "A four-panel webcomic about a hospital visit, reduced to just lines" },
  { id: 19, answer: "Disaster Girl",          clues: ["👧", "😈", "🔥"],       difficulty: "hard",   aliases: ["evil girl fire", "fire girl meme", "girl fire house"],                                    hint: "A little girl smirks at the camera while a house burns behind her" },
  { id: 20, answer: "Bernie Sanders Mittens", clues: ["🧤", "🪑", "❄️"],       difficulty: "hard",   aliases: ["bernie mittens", "bernie sitting", "bernie chair", "bernie inauguration", "bernie sanders"], hint: "A senator sits bundled up at a presidential inauguration" },
  { id: 21, answer: "Grumpy Cat",             clues: ["🐱", "😾", "❌"],       difficulty: "hard",   aliases: ["grumpy cat meme", "tardar sauce", "no cat", "angry cat"],                                hint: "A feline celebrity famous for looking perpetually annoyed — 'NO.'" },
  { id: 22, answer: "Is This a Pigeon",       clues: ["🦋", "🤷‍♂️", "❓"],   difficulty: "hard",   aliases: ["is this a pigeon meme", "butterfly meme", "anime butterfly", "is this a butterfly"],      hint: "An anime character points at a butterfly and asks a very wrong question" },
  { id: 23, answer: "Shiba Confetti",         clues: ["🐕", "🎊", "😐"],       difficulty: "hard",   aliases: ["cheems", "party dog", "shiba party", "dog with confetti"],                                hint: "A Shiba Inu surrounded by falling confetti with a blank expression" },
  { id: 24, answer: "Keyboard Cat",           clues: ["🐱", "🎹", "🎶"],       difficulty: "hard",   aliases: ["cat piano", "play him off keyboard cat", "piano cat"],                                    hint: "A cat in a shirt 'playing' a keyboard — used to play people off stage" },
  { id: 25, answer: "Trollface",              clues: ["😏", "🖊️", "😤"],      difficulty: "hard",   aliases: ["troll face", "u mad bro", "problem?", "coolface", "troll meme"],                         hint: "A crudely drawn grinning face from the early days of internet trolling" },
];

export default questions;

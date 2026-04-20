import { Audio } from 'expo-av';

let correctSound: Audio.Sound | null = null;
let wrongSound: Audio.Sound | null = null;
// TODO: replace tick.wav with a higher-quality CC0 clock-tick recording.
let tickSound: Audio.Sound | null = null;

export async function preloadSounds(): Promise<void> {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: false });
    const [correct, wrong, tick] = await Promise.all([
      Audio.Sound.createAsync(require('../../assets/sounds/correct.wav')),
      Audio.Sound.createAsync(require('../../assets/sounds/wrong.wav')),
      Audio.Sound.createAsync(require('../../assets/sounds/tick.wav')),
    ]);
    correctSound = correct.sound;
    wrongSound = wrong.sound;
    tickSound = tick.sound;
  } catch {
    // Sounds are optional — fail silently
  }
}

export async function playCorrect(): Promise<void> {
  try {
    if (correctSound) {
      await correctSound.replayAsync();
    }
  } catch {
    // no-op
  }
}

export async function playWrong(): Promise<void> {
  try {
    if (wrongSound) {
      await wrongSound.replayAsync();
    }
  } catch {
    // no-op
  }
}

export async function playTick(): Promise<void> {
  try {
    if (tickSound) {
      await tickSound.replayAsync();
    }
  } catch {
    // no-op
  }
}

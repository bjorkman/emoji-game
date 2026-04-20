import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';

let correctPlayer: AudioPlayer | null = null;
let wrongPlayer: AudioPlayer | null = null;

export async function preloadSounds(): Promise<void> {
  try {
    await setAudioModeAsync({ playsInSilentMode: false });
    correctPlayer = createAudioPlayer(require('../../assets/sounds/correct.wav'));
    wrongPlayer = createAudioPlayer(require('../../assets/sounds/wrong.wav'));
  } catch {
    // Sounds are optional — fail silently
  }
}

export async function playCorrect(): Promise<void> {
  try {
    if (correctPlayer) {
      await correctPlayer.seekTo(0);
      correctPlayer.play();
    }
  } catch {
    // no-op
  }
}

export async function playWrong(): Promise<void> {
  try {
    if (wrongPlayer) {
      await wrongPlayer.seekTo(0);
      wrongPlayer.play();
    }
  } catch {
    // no-op
  }
}

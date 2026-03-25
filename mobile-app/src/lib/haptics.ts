import * as Haptics from 'expo-haptics';

/** Light tap — button presses */
export function hapticSelection(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // no-op on simulator / web
  }
}

/** Positive notification — correct answer, friend accepted */
export function hapticCorrect(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // no-op
  }
}

/** Negative notification — wrong answer, skip */
export function hapticWrong(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch {
    // no-op
  }
}

/** Heavy impact — game completed */
export function hapticSuccess(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {
    // no-op
  }
}

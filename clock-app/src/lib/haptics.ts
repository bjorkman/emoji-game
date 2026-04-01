import * as Haptics from 'expo-haptics';

export function hapticSelection(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // no-op on simulator / web
  }
}

export function hapticCorrect(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // no-op
  }
}

export function hapticWrong(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch {
    // no-op
  }
}

export function hapticSuccess(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {
    // no-op
  }
}

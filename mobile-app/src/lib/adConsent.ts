import { Platform } from 'react-native';
import {
  requestTrackingPermissionsAsync,
  getTrackingPermissionsAsync,
  PermissionStatus,
} from 'expo-tracking-transparency';

export type TrackingStatus = 'granted' | 'denied' | 'undetermined' | 'not-applicable';

/**
 * Request App Tracking Transparency permission (iOS only).
 * Call this at app startup before initializing any ad SDK.
 * Returns the tracking status so the ad SDK can serve
 * personalized or non-personalized ads accordingly.
 */
export async function requestAdTrackingConsent(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') {
    return 'not-applicable';
  }

  const { status } = await requestTrackingPermissionsAsync();

  switch (status) {
    case PermissionStatus.GRANTED:
      return 'granted';
    case PermissionStatus.DENIED:
      return 'denied';
    default:
      return 'undetermined';
  }
}

/**
 * Check current tracking permission without prompting.
 */
export async function getAdTrackingStatus(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') {
    return 'not-applicable';
  }

  const { status } = await getTrackingPermissionsAsync();

  switch (status) {
    case PermissionStatus.GRANTED:
      return 'granted';
    case PermissionStatus.DENIED:
      return 'denied';
    default:
      return 'undetermined';
  }
}

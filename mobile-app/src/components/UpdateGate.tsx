import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import { checkAppVersion, type VersionStatus } from '../services/configService';
import { APP_VERSION } from '../lib/version';

interface Props {
  children: React.ReactNode;
}

// Replace with actual store URLs once published
const STORE_URL = Platform.select({
  ios: 'https://apps.apple.com/app/id_PLACEHOLDER',
  android: 'https://play.google.com/store/apps/details?id=PLACEHOLDER',
  default: '',
});

export default function UpdateGate({ children }: Props) {
  const [status, setStatus] = useState<VersionStatus | 'loading'>('loading');
  const [latest, setLatest] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkAppVersion().then((result) => {
      setStatus(result.status);
      setLatest(result.latest);
    });
  }, []);

  const handleUpdate = useCallback(() => {
    if (STORE_URL) Linking.openURL(STORE_URL);
  }, []);

  // Fail open: show app while loading or if check succeeded
  if (status === 'loading' || status === 'ok') {
    return <>{children}</>;
  }

  // Soft prompt — dismissible
  if (status === 'update_available' && dismissed) {
    return <>{children}</>;
  }

  if (status === 'update_available') {
    return (
      <View style={styles.container}>
        {children}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Update Available</Text>
            <Text style={styles.bannerText}>
              Version {latest} is available (you have {APP_VERSION}).
            </Text>
            <View style={styles.bannerButtons}>
              <TouchableOpacity onPress={() => setDismissed(true)} style={styles.laterButton}>
                <Text style={styles.laterText}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Hard block — cannot dismiss
  return (
    <View style={styles.blockScreen}>
      <Text style={styles.blockEmoji}>🔄</Text>
      <Text style={styles.blockTitle}>Update Required</Text>
      <Text style={styles.blockText}>
        Please update to version {latest} to continue playing.{'\n'}
        You have version {APP_VERSION}.
      </Text>
      <TouchableOpacity onPress={handleUpdate} style={styles.blockButton}>
        <Text style={styles.blockButtonText}>Update Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ─── Soft banner ─────────────────────────────────────────────
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingBottom: 34, // safe area
  },
  bannerContent: {
    padding: 20,
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#f0f0f5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerText: {
    color: '#8888aa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  bannerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  laterButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8888aa',
  },
  laterText: {
    color: '#8888aa',
    fontSize: 14,
    fontWeight: '600',
  },
  updateButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4a90d9',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // ─── Hard block ──────────────────────────────────────────────
  blockScreen: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  blockEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  blockTitle: {
    color: '#f0f0f5',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  blockText: {
    color: '#8888aa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  blockButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4a90d9',
  },
  blockButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

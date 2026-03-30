import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useOTAUpdates } from '../hooks/useOTAUpdates';

export default function OTAUpdateBanner() {
  const { isReady, applyUpdate } = useOTAUpdates();
  const [dismissed, setDismissed] = useState(false);

  if (!isReady || dismissed) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.title}>A new version is ready!</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => setDismissed(true)} style={styles.laterButton}>
            <Text style={styles.laterText}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={applyUpdate} style={styles.restartButton}>
            <Text style={styles.restartText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingBottom: 34,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#f0f0f5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  buttons: {
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
  restartButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4a90d9',
  },
  restartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

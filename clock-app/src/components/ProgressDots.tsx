import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CLOCK_GOLD, COLOR_CORRECT, STAR_EMPTY } from '../theme/colors';

interface Props {
  current: number;
  total: number;
}

export default function ProgressDots({ current, total }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => {
        const index = i + 1;
        const isPast = index < current;
        const isCurrent = index === current;

        return (
          <View
            key={i}
            style={[
              styles.dot,
              isPast && styles.past,
              isCurrent && styles.current,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: STAR_EMPTY,
  },
  past: {
    backgroundColor: COLOR_CORRECT,
  },
  current: {
    backgroundColor: CLOCK_GOLD,
    transform: [{ scale: 1.3 }],
  },
});

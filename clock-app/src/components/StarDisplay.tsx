import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type StarRating } from '../core/types';
import { STAR_FILLED, STAR_EMPTY } from '../theme/colors';

interface Props {
  stars: StarRating;
  size?: number;
}

export default function StarDisplay({ stars, size = 48 }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <Text
          key={i}
          style={[
            styles.star,
            { fontSize: size },
            i <= stars ? styles.filled : styles.empty,
          ]}
        >
          {i <= stars ? '\u2B50' : '\u2606'}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  star: {},
  filled: {
    opacity: 1,
  },
  empty: {
    opacity: 0.3,
    color: STAR_EMPTY,
  },
});

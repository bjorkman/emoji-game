import React from 'react';
import { Text, TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_BOLD } from '../../lib/fonts';
import { TEXT_PRIMARY, BORDER_DEFAULT } from '../../theme/colors';

interface Props {
  label: string;
  onPress: () => void;
  colors?: [string, string, string];
  borderOnly?: boolean;
  disabled?: boolean;
  testID?: string;
  style?: ViewStyle;
  small?: boolean;
}

export default function GradientButton({
  label,
  onPress,
  colors,
  borderOnly = false,
  disabled = false,
  testID,
  style,
  small = false,
}: Readonly<Props>) {
  if (borderOnly) {
    return (
      <TouchableOpacity
        style={[
          styles.borderBtn,
          small && styles.small,
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        testID={testID}
      >
        <Text style={[styles.borderLabel, small && styles.smallLabel]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
      style={[disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={colors ?? ['#ff6eb4', '#a855f7', '#6366f1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, small && styles.small]}
      >
        <Text style={[styles.label, small && styles.smallLabel]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  small: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  label: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontFamily: FONT_BOLD,
  },
  smallLabel: {
    fontSize: 14,
  },
  borderBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
  },
  borderLabel: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontFamily: FONT_BOLD,
  },
  disabled: {
    opacity: 0.4,
  },
});

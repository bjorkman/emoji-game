import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, G } from 'react-native-svg';

interface Props {
  hour: number;
  minute: number;
  size?: number;
  showMinuteMarks?: boolean;
}

const HOUR_HAND_COLOR = '#6366f1';
const MINUTE_HAND_COLOR = '#f472b6';
const FACE_COLOR = '#fffbeb';
const BORDER_COLOR = '#fbbf24';
const NUMBER_COLOR = '#1e293b';
const TICK_COLOR = '#94a3b8';
const CENTER_COLOR = '#334155';

export default function AnalogClock({
  hour,
  minute,
  size = 250,
  showMinuteMarks = true,
}: Readonly<Props>) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10;
  const numberRadius = radius - 28;
  const tickOuterRadius = radius - 8;
  const tickInnerRadius = radius - 16;
  const fiveTickInnerRadius = radius - 22;

  // Hand angles (degrees from 12 o'clock)
  const hourAngle = ((hour % 12) * 30 + minute * 0.5) * (Math.PI / 180);
  const minuteAngle = (minute * 6) * (Math.PI / 180);

  // Hand endpoints
  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.72;

  const hourX = cx + hourHandLength * Math.sin(hourAngle);
  const hourY = cy - hourHandLength * Math.cos(hourAngle);
  const minuteX = cx + minuteHandLength * Math.sin(minuteAngle);
  const minuteY = cy - minuteHandLength * Math.cos(minuteAngle);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock face */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={FACE_COLOR}
          stroke={BORDER_COLOR}
          strokeWidth={4}
        />

        {/* Minute tick marks */}
        {showMinuteMarks && Array.from({ length: 60 }, (_, i) => {
          const angle = (i * 6) * (Math.PI / 180);
          const isFive = i % 5 === 0;
          const inner = isFive ? fiveTickInnerRadius : tickInnerRadius;
          return (
            <Line
              key={`tick-${i}`}
              x1={cx + tickOuterRadius * Math.sin(angle)}
              y1={cy - tickOuterRadius * Math.cos(angle)}
              x2={cx + inner * Math.sin(angle)}
              y2={cy - inner * Math.cos(angle)}
              stroke={isFive ? NUMBER_COLOR : TICK_COLOR}
              strokeWidth={isFive ? 2.5 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Numbers 1-12 */}
        {Array.from({ length: 12 }, (_, i) => {
          const num = i + 1;
          const angle = (num * 30) * (Math.PI / 180);
          const x = cx + numberRadius * Math.sin(angle);
          const y = cy - numberRadius * Math.cos(angle);
          return (
            <SvgText
              key={`num-${num}`}
              x={x}
              y={y}
              fill={NUMBER_COLOR}
              fontSize={size * 0.08}
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {num}
            </SvgText>
          );
        })}

        {/* Hour hand */}
        <Line
          x1={cx}
          y1={cy}
          x2={hourX}
          y2={hourY}
          stroke={HOUR_HAND_COLOR}
          strokeWidth={8}
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <Line
          x1={cx}
          y1={cy}
          x2={minuteX}
          y2={minuteY}
          stroke={MINUTE_HAND_COLOR}
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* Center dot */}
        <Circle cx={cx} cy={cy} r={6} fill={CENTER_COLOR} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

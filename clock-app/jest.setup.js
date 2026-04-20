jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  const Text = require('react-native').Text;
  return {
    __esModule: true,
    default: {
      createAnimatedComponent: (Component) => Component,
      View,
      Text,
    },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withTiming: (val) => val,
    withRepeat: (val) => val,
    withDelay: (_delay, val) => val,
    Easing: {
      ease: (t) => t,
      in: () => (t) => t,
      out: () => (t) => t,
      inOut: () => (t) => t,
      quad: (t) => t,
    },
    FadeIn: { duration: () => ({ delay: () => ({}) }) },
    FadeOut: { duration: () => ({}) },
    SlideInDown: { duration: () => ({}) },
    createAnimatedComponent: (Component) => Component,
  };
});

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }) => React.createElement(View, props, children),
  };
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    seekTo: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn(),
  })),
  setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  const createComponent = (name) => {
    const Component = ({ children, ...props }) => React.createElement(View, { ...props, testID: name }, children);
    Component.displayName = name;
    return Component;
  };
  return {
    __esModule: true,
    default: createComponent('Svg'),
    Svg: createComponent('Svg'),
    Circle: createComponent('Circle'),
    Line: createComponent('Line'),
    G: createComponent('G'),
    Text: ({ children, ...props }) => React.createElement(Text, props, children),
    Rect: createComponent('Rect'),
  };
});

jest.mock('expo-constants', () => ({
  expoConfig: { extra: { eas: { projectId: 'test-project-id' } }, version: '1.0.0' },
}));

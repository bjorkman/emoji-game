import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { type GameScreenProps } from '../navigation/types';
import REGISTRY from '../games/registry';
import Game from '../core/Game';
import SplashScreen from '../components/SplashScreen';
import GameCard from '../components/GameCard';
import ProgressBar from '../components/ProgressBar';
import FeedbackBanner from '../components/FeedbackBanner';
import ResultScreen from '../components/ResultScreen';
import Leaderboard from '../components/Leaderboard';

export default function GameScreen({ route, navigation }: Readonly<GameScreenProps>) {
  const { theme } = useTheme();
  const { gameId, challengeId } = route.params;
  const config = REGISTRY[gameId];

  useEffect(() => {
    if (!config) navigation.replace('Home');
  }, [config, navigation]);

  if (!config) return null;

  return (
    <Game
      config={config}
      challengeId={challengeId}
      onGoHome={() => navigation.replace('Home')}
      renderSplash={(props) => (
        <SplashScreen
          config={props.config}
          onPlay={props.onPlay}
          onChooseGame={props.onChooseGame}
        />
      )}
      renderPlaying={(props) => (
        <LinearGradient colors={theme.gradientBg} style={styles.playingGradient}>
        <KeyboardAvoidingView
          style={styles.playingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.config.title}</Text>
            <TouchableOpacity onPress={props.onCancel} hitSlop={12}>
              <Text style={styles.cancelBtn}>✕</Text>
            </TouchableOpacity>
          </View>
          <ProgressBar
            current={props.current}
            total={props.total}
            score={props.score}
            elapsed={props.elapsed}
          />
          <FeedbackBanner
            feedback={props.feedback}
            correctAnswer={props.question.answer}
          />
          <GameCard
            question={props.question}
            inputValue={props.inputValue}
            onInputChange={props.onInputChange}
            onSubmit={props.onSubmit}
            onSkip={props.onSkip}
            feedback={props.feedback}
            placeholder={props.config.inputPlaceholder}
          />
        </KeyboardAvoidingView>
        </LinearGradient>
      )}
      renderResult={(props) => (
        <ResultScreen
          score={props.score}
          total={props.total}
          missed={props.missed}
          grades={props.grades}
          gameId={props.gameId}
          remoteScoreId={props.remoteScoreId}
          onNext={props.onNext}
        />
      )}
      renderLeaderboard={(props) => (
        <Leaderboard
          gameId={props.gameId}
          gameTitle={props.gameTitle}
          latestId={props.latestId}
          challengeId={props.challengeId}
          onReplay={props.onReplay}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  playingGradient: { flex: 1 },
  playingContainer: { flex: 1, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#f0f0f5' },
  cancelBtn: { fontSize: 20, color: '#8888aa', padding: 4 },
});

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TimeInput from '../TimeInput';

describe('TimeInput', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => { jest.runOnlyPendingTimers(); });
    jest.useRealTimers();
  });

  it('renders Check and Skip buttons', () => {
    const { getByText } = render(
      <TimeInput feedback={null} onSubmit={jest.fn()} onSkip={jest.fn()} />,
    );
    expect(getByText('Check')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
  });

  it('calls onSubmit with the typed value when Check pressed', () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <TimeInput feedback={null} onSubmit={onSubmit} onSkip={jest.fn()} />,
    );
    fireEvent.changeText(getByPlaceholderText(/Type the time/i), '3:00');
    fireEvent.press(getByText('Check'));
    expect(onSubmit).toHaveBeenCalledWith('3:00');
  });

  it('calls onSkip when Skip pressed', () => {
    const onSkip = jest.fn();
    const { getByText } = render(
      <TimeInput feedback={null} onSubmit={jest.fn()} onSkip={onSkip} />,
    );
    fireEvent.press(getByText('Skip'));
    expect(onSkip).toHaveBeenCalled();
  });

  it('does not submit empty input', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <TimeInput feedback={null} onSubmit={onSubmit} onSkip={jest.fn()} />,
    );
    fireEvent.press(getByText('Check'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not submit while feedback is shown', () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <TimeInput feedback="correct" onSubmit={onSubmit} onSkip={jest.fn()} />,
    );
    fireEvent.changeText(getByPlaceholderText(/Type the time/i), '3:00');
    fireEvent.press(getByText('Check'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('auto-inserts a colon when user types 3+ bare digits', () => {
    const { getByPlaceholderText } = render(
      <TimeInput feedback={null} onSubmit={jest.fn()} onSkip={jest.fn()} />,
    );
    const input = getByPlaceholderText(/Type the time/i);
    fireEvent.changeText(input, '300');
    expect(input.props.value).toBe('3:00');
  });

  it('filters out disallowed characters', () => {
    const { getByPlaceholderText } = render(
      <TimeInput feedback={null} onSubmit={jest.fn()} onSkip={jest.fn()} />,
    );
    const input = getByPlaceholderText(/Type the time/i);
    fireEvent.changeText(input, '3x!');
    expect(input.props.value).toBe('3');
  });
});

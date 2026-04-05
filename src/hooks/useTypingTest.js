import { useState, useCallback, useRef, useEffect } from 'react';
import { generateWords, getWordCount } from '../data/words';

const STATES = { IDLE: 'idle', RUNNING: 'running', FINISHED: 'finished' };

export function useTypingTest(duration = 30) {
  const [state, setState] = useState(STATES.IDLE);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [wordResults, setWordResults] = useState([]);
  const [charResults, setCharResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [missedKeys, setMissedKeys] = useState({});
  const [wpmHistory, setWpmHistory] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);
  const missedKeysRef = useRef({});
  const wpmHistoryRef = useRef([]);

  const initTest = useCallback(() => {
    const count = getWordCount(duration);
    const newWords = generateWords(count);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTyped('');
    setWordResults([]);
    setCharResults([]);
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    setMissedKeys({});
    setWpmHistory([]);
    setState(STATES.IDLE);
    correctCharsRef.current = 0;
    totalCharsRef.current = 0;
    missedKeysRef.current = {};
    wpmHistoryRef.current = [];
    if (timerRef.current) clearInterval(timerRef.current);
  }, [duration]);

  useEffect(() => {
    initTest();
  }, [initTest]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(Math.ceil(remaining));

      // track WPM over time
      const minutes = elapsed / 60;
      if (minutes > 0) {
        const currentWpm = Math.round(correctCharsRef.current / 5 / minutes);
        wpmHistoryRef.current = [...wpmHistoryRef.current, { time: Math.round(elapsed), wpm: currentWpm }];
        setWpmHistory([...wpmHistoryRef.current]);
        setWpm(currentWpm);
      }

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setState(STATES.FINISHED);
        setMissedKeys({ ...missedKeysRef.current });
      }
    }, 200);
  }, [duration]);

  const handleKeyDown = useCallback((e) => {
    if (state === STATES.FINISHED) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      initTest();
      return;
    }
    if (e.key.length > 1 && e.key !== 'Backspace') return;

    if (state === STATES.IDLE) {
      setState(STATES.RUNNING);
      startTimer();
    }

    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(prev => prev - 1);
        setTyped(prev => prev.slice(0, -1));
        setCharResults(prev => {
          const newResults = [...prev];
          newResults.pop();
          return newResults;
        });
      }
      return;
    }

    if (e.key === ' ') {
      if (typed.length === 0) return;
      const isCorrect = typed === currentWord;
      setWordResults(prev => [...prev, { word: currentWord, typed, correct: isCorrect }]);
      setCurrentWordIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      setTyped('');

      // add space char
      totalCharsRef.current += 1;
      if (isCorrect) correctCharsRef.current += 1;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const minutes = elapsed / 60;
      if (minutes > 0) {
        const total = totalCharsRef.current;
        const correct = correctCharsRef.current;
        setWpm(Math.round(correct / 5 / minutes));
        setAccuracy(total > 0 ? Math.round((correct / total) * 100) : 100);
      }
      return;
    }

    // typing a character
    const charIndex = currentCharIndex;
    const expectedChar = currentWord[charIndex];
    const isCorrect = e.key === expectedChar;

    totalCharsRef.current += 1;
    if (isCorrect) {
      correctCharsRef.current += 1;
    } else {
      const key = expectedChar || e.key;
      missedKeysRef.current[key] = (missedKeysRef.current[key] || 0) + 1;
    }

    setCharResults(prev => [...prev, { char: e.key, expected: expectedChar, correct: isCorrect }]);
    setCurrentCharIndex(prev => prev + 1);
    setTyped(prev => prev + e.key);

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const minutes = elapsed / 60;
    if (minutes > 0.05) {
      const total = totalCharsRef.current;
      const correct = correctCharsRef.current;
      setWpm(Math.round(correct / 5 / minutes));
      setAccuracy(total > 0 ? Math.round((correct / total) * 100) : 100);
    }
  }, [state, words, currentWordIndex, currentCharIndex, typed, initTest, startTimer]);

  const getResults = useCallback(() => {
    const elapsed = duration;
    const minutes = elapsed / 60;
    const finalWpm = minutes > 0 ? Math.round(correctCharsRef.current / 5 / minutes) : 0;
    const total = totalCharsRef.current;
    const correct = correctCharsRef.current;
    const finalAccuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

    return {
      wpm: finalWpm,
      accuracy: finalAccuracy,
      totalChars: total,
      correctChars: correct,
      wrongChars: total - correct,
      duration,
      wordResults,
      missedKeys: missedKeysRef.current,
      wpmHistory: wpmHistoryRef.current,
    };
  }, [duration, wordResults]);

  return {
    state,
    words,
    currentWordIndex,
    currentCharIndex,
    typed,
    wordResults,
    charResults,
    timeLeft,
    wpm,
    accuracy,
    missedKeys,
    wpmHistory,
    handleKeyDown,
    initTest,
    getResults,
    STATES,
  };
}

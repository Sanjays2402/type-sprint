import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import TypingArea from './components/TypingArea';
import ResultsScreen from './components/ResultsScreen';
import KeyboardHeatmap from './components/KeyboardHeatmap';
import Footer from './components/Footer';
import { useTypingTest } from './hooks/useTypingTest';
import { usePersonalBest } from './hooks/usePersonalBest';

function TypingApp() {
  const [duration, setDuration] = useState(() => {
    const stored = localStorage.getItem('ts-duration');
    return stored ? parseInt(stored) : 30;
  });
  const [customDuration, setCustomDuration] = useState(45);
  const [textMode, setTextMode] = useState(() => {
    return localStorage.getItem('ts-textMode') || 'words';
  });
  const [results, setResults] = useState(null);
  const [isNewBest, setIsNewBest] = useState(false);

  const {
    state,
    words,
    currentWordIndex,
    currentCharIndex,
    typed,
    wordResults,
    timeLeft,
    wpm,
    accuracy,
    capsLockOn,
    handleKeyDown,
    initTest,
    getResults,
    STATES,
  } = useTypingTest(duration, 'medium', textMode);

  const { checkAndSave, getBest } = usePersonalBest();

  // Save duration preference
  useEffect(() => {
    localStorage.setItem('ts-duration', duration.toString());
  }, [duration]);

  useEffect(() => {
    localStorage.setItem('ts-textMode', textMode);
  }, [textMode]);

  // Detect finish
  useEffect(() => {
    if (state === STATES.FINISHED) {
      const r = getResults();
      setResults(r);
      const newBest = checkAndSave(duration, r.wpm, r.accuracy);
      setIsNewBest(newBest);
    }
  }, [state, STATES.FINISHED]);

  // Global keydown
  useEffect(() => {
    const handler = (e) => {
      if (state === STATES.FINISHED && e.key === 'Tab') {
        e.preventDefault();
        handleRestart();
        return;
      }
      handleKeyDown(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyDown, state]);

  const handleRestart = useCallback(() => {
    setResults(null);
    setIsNewBest(false);
    initTest();
  }, [initTest]);

  const handleSetDuration = useCallback((d) => {
    setDuration(d);
    setResults(null);
    setIsNewBest(false);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '4rem',
    }}>
      <Header />
      <ModeSelector
        duration={duration}
        setDuration={handleSetDuration}
        customDuration={customDuration}
        setCustomDuration={setCustomDuration}
        textMode={textMode}
        setTextMode={setTextMode}
        disabled={state === STATES.RUNNING}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        marginTop: '2rem',
      }}>
        <AnimatePresence mode="wait">
          {state !== STATES.FINISHED ? (
            <TypingArea
              key="typing"
              words={words}
              currentWordIndex={currentWordIndex}
              currentCharIndex={currentCharIndex}
              typed={typed}
              wordResults={wordResults}
              state={state}
              timeLeft={timeLeft}
              wpm={wpm}
              accuracy={accuracy}
              capsLockOn={capsLockOn}
              STATES={STATES}
            />
          ) : results && (
            <div key="results">
              <ResultsScreen
                results={results}
                isNewBest={isNewBest}
                personalBest={getBest(duration)}
                onRestart={handleRestart}
              />
              <KeyboardHeatmap missedKeys={results.missedKeys} />
            </div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TypingApp />
    </ThemeProvider>
  );
}

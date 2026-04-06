import { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CapsLockWarning from './CapsLockWarning';

export default function TypingArea({
  words,
  currentWordIndex,
  currentCharIndex,
  typed,
  wordResults,
  state,
  timeLeft,
  wpm,
  accuracy,
  capsLockOn,
  STATES,
}) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const activeWordRef = useRef(null);

  // scroll active word into view
  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeWordRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom - 10) {
        active.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [currentWordIndex]);

  const renderedWords = useMemo(() => {
    return words.map((word, wordIdx) => {
      const isCompleted = wordIdx < currentWordIndex;
      const isCurrent = wordIdx === currentWordIndex;
      const result = wordResults[wordIdx];

      const chars = word.split('').map((char, charIdx) => {
        let color = theme.text;
        let borderBottom = 'none';

        if (isCompleted && result) {
          color = result.correct ? theme.textCorrect : theme.textWrong;
        } else if (isCurrent) {
          if (charIdx < typed.length) {
            color = typed[charIdx] === char ? theme.textCorrect : theme.textWrong;
            if (typed[charIdx] !== char) {
              borderBottom = `2px solid ${theme.textWrong}`;
            }
          } else if (charIdx === typed.length) {
            color = theme.textActive;
          }
        }

        return (
          <span
            key={charIdx}
            style={{
              color,
              borderBottom,
              position: 'relative',
              transition: 'color 0.1s ease',
            }}
          >
            {isCurrent && charIdx === typed.length && (
              <motion.span
                layoutId="caret"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: '-1px',
                  top: '2px',
                  width: '2px',
                  height: '1.3em',
                  background: theme.caret,
                  borderRadius: '1px',
                }}
              />
            )}
            {char}
          </span>
        );
      });

      // extra typed characters beyond word length
      if (isCurrent && typed.length > word.length) {
        const extra = typed.slice(word.length).split('').map((char, i) => (
          <span
            key={`extra-${i}`}
            style={{
              color: theme.textWrong,
              opacity: 0.7,
            }}
          >
            {char}
          </span>
        ));
        chars.push(...extra);
      }

      return (
        <span
          key={wordIdx}
          ref={isCurrent ? activeWordRef : null}
          style={{
            marginRight: '0.5em',
            display: 'inline',
            lineHeight: '2.2',
          }}
        >
          {chars}
        </span>
      );
    });
  }, [words, currentWordIndex, typed, wordResults, theme]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      padding: '0 2rem',
      maxWidth: '900px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Caps Lock Warning */}
      <CapsLockWarning show={capsLockOn} />

      {/* Live stats */}
      {state === STATES.RUNNING && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '1.5rem',
            fontWeight: 300,
          }}
        >
          <span style={{ color: theme.accent, fontWeight: 600, fontSize: '2rem' }}>
            {timeLeft}
          </span>
          <span style={{ color: theme.text }}>
            <span style={{ color: theme.textActive, fontWeight: 500 }}>{wpm}</span> wpm
          </span>
          <span style={{ color: theme.text }}>
            <span style={{ color: theme.textActive, fontWeight: 500 }}>{accuracy}</span>%
          </span>
        </motion.div>
      )}

      {state === STATES.IDLE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: theme.text, fontSize: '0.85rem' }}
        >
          start typing to begin...
        </motion.div>
      )}

      {/* Typing text */}
      <div
        ref={containerRef}
        style={{
          fontSize: '1.35rem',
          lineHeight: '2.2',
          maxHeight: '7.5em',
          overflow: 'hidden',
          width: '100%',
          fontFamily: "'JetBrains Mono', monospace",
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* fade overlay at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2em',
          background: `linear-gradient(transparent, ${theme.bg})`,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        {renderedWords}
      </div>
    </div>
  );
}

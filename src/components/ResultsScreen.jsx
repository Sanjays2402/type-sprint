import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ResultsScreen({ results, isNewBest, personalBest, onRestart }) {
  const { theme } = useTheme();

  const statCards = [
    { label: 'wpm', value: results.wpm, color: theme.accent },
    { label: 'accuracy', value: `${results.accuracy}%`, color: theme.textCorrect },
    { label: 'characters', value: results.totalChars, color: theme.textActive },
    { label: 'errors', value: results.wrongChars, color: theme.textWrong },
  ];

  // WPM graph
  const history = results.wpmHistory || [];
  const maxWpm = Math.max(...history.map(h => h.wpm), 1);
  const graphHeight = 120;
  const graphWidth = 500;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
        maxWidth: '700px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {isNewBest && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.textCorrect})`,
            color: '#000',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
          }}
        >
          🏆 NEW PERSONAL BEST!
        </motion.div>
      )}

      {/* Main stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        width: '100%',
      }}>
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: theme.surface,
              borderRadius: '12px',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              border: `1px solid ${theme.border}`,
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: stat.color,
              lineHeight: 1.2,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: theme.text,
              marginTop: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personal best comparison */}
      {personalBest && !isNewBest && (
        <div style={{ color: theme.text, fontSize: '0.8rem' }}>
          personal best: <span style={{ color: theme.accent, fontWeight: 600 }}>{personalBest.wpm} wpm</span>
        </div>
      )}

      {/* WPM over time graph */}
      {history.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            width: '100%',
            maxWidth: `${graphWidth}px`,
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            color: theme.text,
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            wpm over time
          </div>
          <svg
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            style={{ width: '100%', height: 'auto' }}
          >
            {/* grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <line
                key={pct}
                x1={0}
                y1={graphHeight * pct}
                x2={graphWidth}
                y2={graphHeight * pct}
                stroke={theme.border}
                strokeWidth={0.5}
              />
            ))}
            {/* line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              d={history.map((h, i) => {
                const x = (i / (history.length - 1)) * graphWidth;
                const y = graphHeight - (h.wpm / maxWpm) * (graphHeight - 10);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke={theme.accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* dots at start and end */}
            {[history[0], history[history.length - 1]].filter(Boolean).map((h, i) => {
              const idx = i === 0 ? 0 : history.length - 1;
              const x = (idx / (history.length - 1)) * graphWidth;
              const y = graphHeight - (h.wpm / maxWpm) * (graphHeight - 10);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3}
                  fill={theme.accent}
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Restart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          style={{
            padding: '10px 32px',
            borderRadius: '8px',
            border: 'none',
            background: theme.accentDim,
            color: theme.accent,
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          try again
        </motion.button>
        <span style={{ color: theme.text, fontSize: '0.7rem' }}>
          or press <kbd style={{
            background: theme.surface,
            padding: '2px 6px',
            borderRadius: '3px',
            border: `1px solid ${theme.border}`,
          }}>tab</kbd> to restart
        </span>
      </motion.div>
    </motion.div>
  );
}

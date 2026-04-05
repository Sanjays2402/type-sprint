import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

function getHeatColor(theme, count, max) {
  if (!count || max === 0) return theme.keyHeat0;
  const ratio = count / max;
  if (ratio < 0.2) return theme.keyHeat1;
  if (ratio < 0.4) return theme.keyHeat2;
  if (ratio < 0.6) return theme.keyHeat3;
  if (ratio < 0.8) return theme.keyHeat4;
  return theme.keyHeat5;
}

export default function KeyboardHeatmap({ missedKeys }) {
  const { theme } = useTheme();

  const entries = Object.entries(missedKeys || {});
  const maxMiss = entries.length > 0 ? Math.max(...entries.map(([, v]) => v)) : 0;

  if (entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div style={{
        fontSize: '0.75rem',
        color: theme.text,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '4px',
      }}>
        missed keys heatmap
      </div>

      {ROWS.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'flex',
            gap: '4px',
            marginLeft: rowIdx === 1 ? '20px' : rowIdx === 2 ? '40px' : 0,
          }}
        >
          {row.map((key) => {
            const count = missedKeys[key] || 0;
            const bg = getHeatColor(theme, count, maxMiss);

            return (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + Math.random() * 0.3 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: count > 0 ? 600 : 400,
                  fontFamily: 'inherit',
                  background: bg,
                  color: count > 0 ? '#fff' : theme.keyText,
                  position: 'relative',
                  border: `1px solid ${theme.border}`,
                  transition: 'background 0.3s ease',
                }}
              >
                {key}
                {count > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '4px',
                    fontSize: '0.5rem',
                    opacity: 0.8,
                    fontWeight: 700,
                  }}>
                    {count}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '8px',
        fontSize: '0.6rem',
        color: theme.text,
      }}>
        <span>fewer</span>
        {[theme.keyHeat0, theme.keyHeat1, theme.keyHeat2, theme.keyHeat3, theme.keyHeat4, theme.keyHeat5].map((c, i) => (
          <div key={i} style={{
            width: '16px',
            height: '10px',
            borderRadius: '2px',
            background: c,
          }} />
        ))}
        <span>more misses</span>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DURATIONS = [15, 30, 60];
const TEXT_MODES = [
  { key: 'words', label: 'words' },
  { key: 'quotes', label: 'quotes' },
];

export default function ModeSelector({ duration, setDuration, customDuration, setCustomDuration, textMode, setTextMode, disabled }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
        padding: '0.5rem',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        background: theme.surface,
        borderRadius: '8px',
        padding: '4px',
        border: `1px solid ${theme.border}`,
      }}>
        {DURATIONS.map((d) => (
          <motion.button
            key={d}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !disabled && setDuration(d)}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'inherit',
              fontWeight: duration === d ? 600 : 400,
              background: duration === d ? theme.accentDim : 'transparent',
              color: duration === d ? theme.accent : theme.text,
              transition: 'all 0.2s ease',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {d}s
          </motion.button>
        ))}
        <div style={{
          width: '1px',
          height: '20px',
          background: theme.border,
          margin: '0 4px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <input
            type="number"
            min="5"
            max="300"
            value={customDuration}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 5;
              setCustomDuration(val);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disabled) {
                setDuration(customDuration);
              }
            }}
            disabled={disabled}
            style={{
              width: '50px',
              padding: '6px 8px',
              borderRadius: '6px',
              border: `1px solid ${theme.border}`,
              background: !DURATIONS.includes(duration) ? theme.accentDim : 'transparent',
              color: !DURATIONS.includes(duration) ? theme.accent : theme.text,
              fontSize: '0.8rem',
              fontFamily: 'inherit',
              textAlign: 'center',
              opacity: disabled ? 0.5 : 1,
            }}
            placeholder="sec"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !disabled && setDuration(customDuration)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              background: !DURATIONS.includes(duration) ? theme.accentDim : 'transparent',
              color: !DURATIONS.includes(duration) ? theme.accent : theme.text,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            custom
          </motion.button>
        </div>
      </div>

      {/* Text mode toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        background: theme.surface,
        borderRadius: '8px',
        padding: '4px',
        border: `1px solid ${theme.border}`,
        marginLeft: '0.5rem',
      }}>
        {TEXT_MODES.map((m) => (
          <motion.button
            key={m.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !disabled && setTextMode(m.key)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'inherit',
              fontWeight: textMode === m.key ? 600 : 400,
              background: textMode === m.key ? theme.accentDim : 'transparent',
              color: textMode === m.key ? theme.accent : theme.text,
              transition: 'all 0.2s ease',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {m.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

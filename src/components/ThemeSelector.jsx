import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const { theme, themeName, setThemeName, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: `1px solid ${theme.border}`,
          background: theme.surface,
          color: theme.text,
          fontSize: '0.75rem',
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: theme.accent,
        }} />
        {themes[themeName].name}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              marginBottom: '8px',
              background: theme.surface,
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              padding: '4px',
              minWidth: '140px',
              zIndex: 50,
            }}
          >
            {Object.entries(themes).map(([key, t]) => (
              <motion.button
                key={key}
                whileHover={{ background: theme.surfaceHover }}
                onClick={() => {
                  setThemeName(key);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: themeName === key ? theme.accentDim : 'transparent',
                  color: themeName === key ? theme.accent : theme.text,
                  fontSize: '0.75rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: t.accent,
                  border: `1px solid ${t.border}`,
                }} />
                {t.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

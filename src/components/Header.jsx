import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1.5rem 2rem 0.5rem',
        gap: '0.75rem',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: theme.accent,
          letterSpacing: '-0.03em',
        }}>
          type
        </span>
        <span style={{ 
          fontSize: '1.5rem', 
          fontWeight: 300, 
          color: theme.text,
          letterSpacing: '-0.03em',
        }}>
          sprint
        </span>
      </div>
    </motion.header>
  );
}

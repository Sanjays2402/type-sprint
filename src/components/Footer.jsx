import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './ThemeSelector';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        fontSize: '0.7rem',
        color: theme.text,
      }}>
        <span>
          <kbd style={{
            background: theme.surface,
            padding: '2px 6px',
            borderRadius: '3px',
            border: `1px solid ${theme.border}`,
            fontSize: '0.65rem',
          }}>tab</kbd> restart
        </span>
      </div>
      <ThemeSelector />
    </footer>
  );
}

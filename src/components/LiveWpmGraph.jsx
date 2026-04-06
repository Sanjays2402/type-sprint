import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function LiveWpmGraph({ wpmHistory, isRunning }) {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 8, right: 12, bottom: 20, left: 36 };
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    if (wpmHistory.length < 2) {
      ctx.fillStyle = theme.text;
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('wpm graph will appear here...', w / 2, h / 2);
      return;
    }

    const maxWpm = Math.max(...wpmHistory.map(h => h.wpm), 10);
    const minWpm = Math.min(...wpmHistory.map(h => h.wpm), 0);
    const range = maxWpm - minWpm || 1;
    const niceMax = Math.ceil(maxWpm / 10) * 10;
    const niceRange = niceMax - Math.max(0, Math.floor(minWpm / 10) * 10);

    // Grid lines
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 0.5;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (plotH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      // Labels
      const val = Math.round(niceMax - (niceRange / gridLines) * i);
      ctx.fillStyle = theme.text;
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(val.toString(), padding.left - 4, y + 3);
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + plotH);
    gradient.addColorStop(0, theme.accent + '30');
    gradient.addColorStop(1, theme.accent + '05');

    const getX = (i) => padding.left + (i / (wpmHistory.length - 1)) * plotW;
    const getY = (wpm) => {
      const niceMin = Math.max(0, Math.floor(minWpm / 10) * 10);
      return padding.top + plotH - ((wpm - niceMin) / niceRange) * plotH;
    };

    // Fill area
    ctx.beginPath();
    ctx.moveTo(getX(0), padding.top + plotH);
    wpmHistory.forEach((point, i) => {
      ctx.lineTo(getX(i), getY(point.wpm));
    });
    ctx.lineTo(getX(wpmHistory.length - 1), padding.top + plotH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    wpmHistory.forEach((point, i) => {
      if (i === 0) ctx.moveTo(getX(i), getY(point.wpm));
      else ctx.lineTo(getX(i), getY(point.wpm));
    });
    ctx.stroke();

    // Latest point dot
    if (wpmHistory.length > 0) {
      const last = wpmHistory[wpmHistory.length - 1];
      const lx = getX(wpmHistory.length - 1);
      const ly = getY(last.wpm);

      // Glow
      ctx.beginPath();
      ctx.arc(lx, ly, 6, 0, Math.PI * 2);
      ctx.fillStyle = theme.accent + '40';
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(lx, ly, 3, 0, Math.PI * 2);
      ctx.fillStyle = theme.accent;
      ctx.fill();
    }
  }, [wpmHistory, theme]);

  if (!isRunning && wpmHistory.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`,
          background: theme.surface,
        }}
      />
    </motion.div>
  );
}

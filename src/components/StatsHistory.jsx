import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function StatsHistory({ history, stats, onClear, onClose }) {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 16, right: 16, bottom: 28, left: 40 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    // Use last 30 tests
    const data = history.slice(0, 30).reverse();
    const wpms = data.map(d => d.wpm);
    const maxWpm = Math.max(...wpms, 10);
    const niceMax = Math.ceil(maxWpm / 10) * 10 + 10;

    // Grid
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      ctx.fillStyle = theme.text;
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(niceMax - (niceMax / 4) * i).toString(), pad.left - 4, y + 3);
    }

    const getX = (i) => pad.left + (i / Math.max(data.length - 1, 1)) * plotW;
    const getY = (wpm) => pad.top + plotH - (wpm / niceMax) * plotH;

    // Area fill
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    gradient.addColorStop(0, theme.textCorrect + '25');
    gradient.addColorStop(1, theme.textCorrect + '05');

    ctx.beginPath();
    ctx.moveTo(getX(0), pad.top + plotH);
    data.forEach((d, i) => ctx.lineTo(getX(i), getY(d.wpm)));
    ctx.lineTo(getX(data.length - 1), pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = theme.textCorrect;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    data.forEach((d, i) => {
      if (i === 0) ctx.moveTo(getX(i), getY(d.wpm));
      else ctx.lineTo(getX(i), getY(d.wpm));
    });
    ctx.stroke();

    // Dots
    data.forEach((d, i) => {
      ctx.beginPath();
      ctx.arc(getX(i), getY(d.wpm), 3, 0, Math.PI * 2);
      ctx.fillStyle = theme.textCorrect;
      ctx.fill();
    });

    // X-axis label
    ctx.fillStyle = theme.text;
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('recent tests →', w / 2, h - 4);
  }, [history, theme]);

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.bg,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          padding: '2rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: theme.textActive,
          }}>
            📊 stats dashboard
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontFamily: 'inherit',
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* Summary cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          {[
            { label: 'tests', value: stats.totalTests, color: theme.textActive },
            { label: 'avg wpm', value: stats.avgWpm, color: theme.accent },
            { label: 'best wpm', value: stats.maxWpm, color: theme.textCorrect },
            { label: 'avg acc', value: `${stats.avgAccuracy}%`, color: theme.textActive },
          ].map((s) => (
            <div key={s.label} style={{
              background: theme.surface,
              borderRadius: '10px',
              padding: '0.75rem',
              textAlign: 'center',
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.65rem', color: theme.text, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* WPM History Chart */}
        {history.length >= 2 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: theme.text, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              wpm progress (last {Math.min(30, history.length)} tests)
            </div>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '140px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.surface,
              }}
            />
          </div>
        )}

        {/* Recent results table */}
        <div style={{ fontSize: '0.7rem', color: theme.text, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          recent tests
        </div>
        <div style={{
          maxHeight: '200px',
          overflowY: 'auto',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`,
        }}>
          {history.slice(0, 20).map((h, i) => (
            <div key={h.id || i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderBottom: i < Math.min(19, history.length - 1) ? `1px solid ${theme.border}` : 'none',
              fontSize: '0.75rem',
              alignItems: 'center',
            }}>
              <span style={{ color: theme.accent, fontWeight: 600 }}>{h.wpm} wpm</span>
              <span style={{ color: theme.textCorrect }}>{h.accuracy}%</span>
              <span style={{ color: theme.text }}>{h.duration}s</span>
              <span style={{ color: theme.text }}>{h.difficulty || '—'}</span>
              <span style={{ color: theme.text, fontSize: '0.65rem', textAlign: 'right' }}>
                {new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>

        {/* Clear button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { onClear(); onClose(); }}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: `1px solid ${theme.textWrong}30`,
              background: `${theme.textWrong}15`,
              color: theme.textWrong,
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            clear all history
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// useThemeColors.ts
// Returns a complete color palette for the current theme.
// Use this in every component instead of hardcoded rgba() values.
// Static inline styles: use the color string directly.
// Framer Motion `animate` arrays: use the pulse/glow arrays.
import { useTheme } from '../contexts/ThemeContext';

const DARK = {
  bg:               '#050505',
  // Text scale
  textPrimary:      'rgba(255,255,255,0.92)',
  textStrong:       'rgba(255,255,255,0.82)',
  textBright:       'rgba(255,255,255,0.88)',
  textSecondary:    'rgba(255,255,255,0.70)',
  textMid:          'rgba(255,255,255,0.60)',
  textSub:          'rgba(255,255,255,0.55)',
  textMuted:        'rgba(255,255,255,0.45)',
  textDim:          'rgba(255,255,255,0.35)',
  textFaint:        'rgba(255,255,255,0.30)',
  textGhost:        'rgba(255,255,255,0.25)',
  textLabel:        'rgba(255,255,255,0.20)',
  textUltraDim:     'rgba(255,255,255,0.18)',
  textTrace:        'rgba(255,255,255,0.15)',
  textHint:         'rgba(255,255,255,0.12)',
  // Node fills & strokes
  nodeActive:       'rgba(255,255,255,0.85)',
  nodeIdle:         'rgba(255,255,255,0.04)',
  nodeStrokeActive: 'rgba(255,255,255,0.60)',
  nodeStrokeIdle:   'rgba(255,255,255,0.15)',
  nodeStrokeMid:    'rgba(255,255,255,0.20)',
  // Lines
  lineStrong:       'rgba(255,255,255,0.25)',
  lineMid:          'rgba(255,255,255,0.18)',
  line:             'rgba(255,255,255,0.12)',
  lineWeak:         'rgba(255,255,255,0.08)',
  // Borders
  border:           'rgba(255,255,255,0.06)',
  borderMid:        'rgba(255,255,255,0.10)',
  // Misc
  dot:              'rgba(255,255,255,0.70)',
  dotDim:           'rgba(255,255,255,0.35)',
  cursor:           'rgba(255,255,255,0.60)',
  monoCode:         'rgba(255,255,255,0.82)',
  monoComment:      'rgba(255,255,255,0.18)',
  monoLineNum:      'rgba(255,255,255,0.12)',
  // Wrong path (Comparison scene)
  wrongNode:        'rgba(255,100,100,0.40)',
  wrongBorder:      'rgba(255,100,100,0.30)',
  wrongText:        'rgba(255,120,120,0.45)',
  wrongLine:        'rgba(255,100,100,0.12)',
  // SVG fills
  svgActive:        'rgba(255,255,255,0.85)',
  svgIdle:          'rgba(255,255,255,0.25)',
  svgSub:           'rgba(255,255,255,0.15)',
  // Framer Motion animate arrays (can't use CSS vars here)
  nodePulse:        ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.12)'],
  dotGlowPulse:     ['0 0 0 0 rgba(255,255,255,0)', '0 0 16px 4px rgba(255,255,255,0.12)', '0 0 0 0 rgba(255,255,255,0)'],
  productGlowPulse: ['0 0 0 0 rgba(255,255,255,0.0)', '0 0 40px 12px rgba(255,255,255,0.07)', '0 0 0 0 rgba(255,255,255,0.0)'],
  ringPulse:        ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.35)'],
  v2GlowPulse:      ['0 0 0 0 rgba(255,255,255,0)', '0 0 12px 3px rgba(255,255,255,0.1)', '0 0 0 0 rgba(255,255,255,0)'],
  rightGlowPulse:   ['0 0 0 0 rgba(255,255,255,0)', '0 0 10px 2px rgba(255,255,255,0.1)', '0 0 0 0 rgba(255,255,255,0)'],
  chainPulse:       ['rgba(255,255,255,0.20)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.20)'],
  scrollLine:       'rgba(255,255,255,0.20)',
  orbitText:        'rgba(255,255,255,0.50)',
};

const LIGHT = {
  bg:               '#f5f5f3',
  // Text scale
  textPrimary:      'rgba(10,10,10,0.90)',
  textStrong:       'rgba(10,10,10,0.80)',
  textBright:       'rgba(10,10,10,0.86)',
  textSecondary:    'rgba(10,10,10,0.65)',
  textMid:          'rgba(10,10,10,0.55)',
  textSub:          'rgba(10,10,10,0.50)',
  textMuted:        'rgba(10,10,10,0.40)',
  textDim:          'rgba(10,10,10,0.30)',
  textFaint:        'rgba(10,10,10,0.26)',
  textGhost:        'rgba(10,10,10,0.22)',
  textLabel:        'rgba(10,10,10,0.18)',
  textUltraDim:     'rgba(10,10,10,0.15)',
  textTrace:        'rgba(10,10,10,0.12)',
  textHint:         'rgba(10,10,10,0.09)',
  // Node fills & strokes
  nodeActive:       'rgba(10,10,10,0.80)',
  nodeIdle:         'rgba(10,10,10,0.05)',
  nodeStrokeActive: 'rgba(10,10,10,0.50)',
  nodeStrokeIdle:   'rgba(10,10,10,0.12)',
  nodeStrokeMid:    'rgba(10,10,10,0.16)',
  // Lines
  lineStrong:       'rgba(10,10,10,0.20)',
  lineMid:          'rgba(10,10,10,0.14)',
  line:             'rgba(10,10,10,0.09)',
  lineWeak:         'rgba(10,10,10,0.06)',
  // Borders
  border:           'rgba(10,10,10,0.06)',
  borderMid:        'rgba(10,10,10,0.09)',
  // Misc
  dot:              'rgba(10,10,10,0.55)',
  dotDim:           'rgba(10,10,10,0.25)',
  cursor:           'rgba(10,10,10,0.50)',
  monoCode:         'rgba(10,10,10,0.80)',
  monoComment:      'rgba(10,10,10,0.22)',
  monoLineNum:      'rgba(10,10,10,0.14)',
  // Wrong path
  wrongNode:        'rgba(160,50,50,0.35)',
  wrongBorder:      'rgba(160,50,50,0.25)',
  wrongText:        'rgba(140,40,40,0.45)',
  wrongLine:        'rgba(160,50,50,0.10)',
  // SVG fills
  svgActive:        'rgba(10,10,10,0.80)',
  svgIdle:          'rgba(10,10,10,0.22)',
  svgSub:           'rgba(10,10,10,0.12)',
  // Framer Motion animate arrays
  nodePulse:        ['rgba(10,10,10,0.08)', 'rgba(10,10,10,0.65)', 'rgba(10,10,10,0.08)'],
  dotGlowPulse:     ['0 0 0 0 rgba(0,0,0,0)', '0 0 16px 4px rgba(0,0,0,0.07)', '0 0 0 0 rgba(0,0,0,0)'],
  productGlowPulse: ['0 0 0 0 rgba(0,0,0,0.0)', '0 0 40px 12px rgba(0,0,0,0.05)', '0 0 0 0 rgba(0,0,0,0.0)'],
  ringPulse:        ['rgba(10,10,10,0.22)', 'rgba(10,10,10,0.60)', 'rgba(10,10,10,0.22)'],
  v2GlowPulse:      ['0 0 0 0 rgba(0,0,0,0)', '0 0 12px 3px rgba(0,0,0,0.07)', '0 0 0 0 rgba(0,0,0,0)'],
  rightGlowPulse:   ['0 0 0 0 rgba(0,0,0,0)', '0 0 10px 2px rgba(0,0,0,0.07)', '0 0 0 0 rgba(0,0,0,0)'],
  chainPulse:       ['rgba(10,10,10,0.18)', 'rgba(10,10,10,0.50)', 'rgba(10,10,10,0.18)'],
  scrollLine:       'rgba(10,10,10,0.18)',
  orbitText:        'rgba(10,10,10,0.40)',
};

export type ColorPalette = typeof DARK;

export function useThemeColors(): ColorPalette {
  const { theme } = useTheme();
  return theme === 'dark' ? DARK : LIGHT;
}

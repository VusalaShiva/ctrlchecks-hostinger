import type { CSSProperties } from 'react';
import BorderGlow from '@/components/BorderGlow';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export type ThemedBorderGlowVariant =
  | 'default'
  | 'confirmation'
  | 'amber'
  | 'indigo'
  | 'canvas-node';

export interface ThemedBorderGlowProps {
  children: React.ReactNode;
  className?: string;
  variant?: ThemedBorderGlowVariant;
  /** One-shot sweep animation (fast curve) — runs when true on mount / when toggled on */
  animated?: boolean;
  borderRadius?: number;
  glowRadius?: number;
  fillOpacity?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  /** Passed to BorderGlow — higher = stronger inset/outer glow */
  glowIntensity?: number;
  /** Override mesh gradient stops (e.g. execution state on canvas nodes) */
  colors?: string[];
  /** Override HSL triple for glow color vars, e.g. `174 60 51` */
  glowColor?: string;
  innerClassName?: string;
  innerOverflow?: 'auto' | 'visible';
  style?: CSSProperties;
}

function gradientForVariant(variant: ThemedBorderGlowVariant, isLight: boolean): string[] {
  if (variant === 'canvas-node') {
    return isLight
      ? ['#0f766e', '#4338ca', '#075985']
      : ['#a78bfa', '#f472b6', '#38bdf8'];
  }
  if (variant === 'confirmation') {
    return isLight
      ? ['#22c55e', '#14b8a6', '#6366f1']
      : ['#4ade80', '#2dd4bf', '#a78bfa'];
  }
  if (variant === 'amber') {
    return isLight
      ? ['#f59e0b', '#ea580c', '#ca8a04']
      : ['#fbbf24', '#fb923c', '#fcd34d'];
  }
  if (variant === 'indigo') {
    return isLight
      ? ['#6366f1', '#2dd4bf', '#0ea5e9']
      : ['#818cf8', '#5eead4', '#38bdf8'];
  }
  /* default — brand teal / indigo / sky */
  return isLight
    ? ['#14b8a6', '#6366f1', '#0ea5e9']
    : ['#a78bfa', '#f472b6', '#38bdf8'];
}

function glowColorForVariant(variant: ThemedBorderGlowVariant, isLight: boolean): string {
  if (variant === 'canvas-node') {
    return isLight ? '174 58 38' : '174 62 72';
  }
  if (variant === 'confirmation') {
    return isLight ? '142 71 45' : '142 76 65';
  }
  if (variant === 'amber') {
    return isLight ? '38 92 45' : '48 96 70';
  }
  if (variant === 'indigo') {
    return isLight ? '239 84 67' : '239 84 75';
  }
  return isLight ? '174 55 42' : '174 60 72';
}

/**
 * BorderGlow with CtrlChecks light/dark tokens (card background + accent gradients).
 */
export function ThemedBorderGlow({
  children,
  className,
  variant = 'default',
  animated = false,
  borderRadius: borderRadiusProp,
  glowRadius: glowRadiusProp,
  fillOpacity: fillOpacityProp,
  edgeSensitivity: edgeSensitivityProp,
  coneSpread: coneSpreadProp,
  glowIntensity: glowIntensityProp,
  colors: colorsProp,
  glowColor: glowColorProp,
  innerClassName,
  innerOverflow = variant === 'canvas-node' ? 'visible' : 'auto',
  style,
}: ThemedBorderGlowProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isCanvas = variant === 'canvas-node';

  const borderRadius = borderRadiusProp ?? (isCanvas ? 12 : 12);
  const glowRadius = glowRadiusProp ?? (isCanvas ? 52 : 36);
  const fillOpacity =
    fillOpacityProp ?? (isCanvas ? (isLight ? 0.44 : 0.54) : isLight ? 0.3 : 0.48);
  const coneSpread = coneSpreadProp ?? (isCanvas ? 30 : isLight ? 22 : 25);
  const edgeSensitivity =
    edgeSensitivityProp ?? (isCanvas ? (isLight ? 22 : 26) : isLight ? 26 : 30);
  const glowIntensity =
    glowIntensityProp ?? (isCanvas ? (isLight ? 1.28 : 1.38) : 1);

  const colors = colorsProp ?? gradientForVariant(variant, isLight);
  const glowColor = glowColorProp ?? glowColorForVariant(variant, isLight);

  return (
    <BorderGlow
      className={cn(isLight && 'border-glow-theme-light', className)}
      animated={animated}
      borderRadius={borderRadius}
      glowRadius={glowRadius}
      backgroundColor="hsl(var(--card))"
      glowColor={glowColor}
      colors={colors}
      fillOpacity={fillOpacity}
      edgeSensitivity={edgeSensitivity}
      coneSpread={coneSpread}
      glowIntensity={glowIntensity}
      innerOverflow={innerOverflow}
      innerClassName={innerClassName}
      style={style}
    >
      {children}
    </BorderGlow>
  );
}

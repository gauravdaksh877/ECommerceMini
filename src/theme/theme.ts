/**
 * Centralized theme system combining colors, spacing, and typography
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { typography, fontSize, fontFamily } from './fonts';

export const theme = {
  colors,
  spacing,
  typography,
  fontSize,
  fontFamily,
} as const;

export type Theme = typeof theme;

export default theme;

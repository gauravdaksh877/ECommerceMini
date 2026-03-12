/**
 * Centralized spacing scale for consistent layout
 * All spacing values are in pixels
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/**
 * Common padding/margin combinations
 */
export const spacingPresets = {
  container: {
    padding: spacing.lg,
  },
  section: {
    marginVertical: spacing.lg,
  },
  item: {
    marginVertical: spacing.md,
  },
  small: {
    margin: spacing.sm,
  },
} as const;

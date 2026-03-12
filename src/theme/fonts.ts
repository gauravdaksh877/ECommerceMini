/**
 * Centralized typography system using Inter font family
 * Defines font weights and sizes for consistent typography across the app
 */

export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;

/**
 * Font size presets following Material Design scale
 */
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * Typography presets combining font family, size, and weight
 */
export const typography = {
  headline1: {
    fontSize: fontSize.xxxl,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    lineHeight: 40,
  },
  headline2: {
    fontSize: fontSize.xxl,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
    lineHeight: 32,
  },
  headline3: {
    fontSize: fontSize.xl,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semiBold,
    lineHeight: 28,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semiBold,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: fontSize.base,
    fontWeight: '500' as const,
    fontFamily: fontFamily.medium,
    lineHeight: 20,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
    lineHeight: 24,
  },
  bodySm: {
    fontSize: fontSize.sm,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
    lineHeight: 20,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
    lineHeight: 16,
  },
  captionBold: {
    fontSize: fontSize.xs,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semiBold,
    lineHeight: 16,
  },
} as const;

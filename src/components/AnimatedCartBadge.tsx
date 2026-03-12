import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/fonts';

interface AnimatedCartBadgeProps {
  count: number;
}

/**
 * Animated Cart Badge component
 * Shows cart item count with scale animation when count changes
 */
export const AnimatedCartBadge: React.FC<AnimatedCartBadgeProps> = ({
  count,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (count > 0) {
      scaleAnim.setValue(1.3);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [count, scaleAnim]);

  if (count === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.card,
  },
  badgeText: {
    ...typography.captionBold,
    color: '#FFFFFF',
    fontSize: 10,
  },
});

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface SkeletonLoaderProps {
  count?: number;
  numColumns?: number;
}

/**
 * Skeleton Loader component with shimmer effect
 * Displays placeholder cards while data is loading
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 4,
  numColumns = 1,
}) => {
  const shimmerAnim = new Animated.Value(0);

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderSkeletonCard = () => (
    <Animated.View style={[styles.skeletonCard, { opacity }]}>
      <View style={styles.imageSkeletonContainer}>
        <View style={styles.imageSkeleton} />
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.skeletonText, styles.titleSkeleton]} />
        <View style={[styles.skeletonText, styles.categorySkeleton]} />
        <View style={styles.footerContainer}>
          <View style={[styles.skeletonText, styles.priceSkeleton]} />
        </View>
      </View>
    </Animated.View>
  );

  const renderItem = () => renderSkeletonCard();

  return (
    <FlatList
      data={Array.from({ length: count })}
      renderItem={renderItem}
      keyExtractor={(_, index) => `skeleton-${index}`}
      numColumns={numColumns}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  skeletonCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    overflow: 'hidden',
    flex: 1,
  },
  imageSkeletonContainer: {
    height: 180,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSkeleton: {
    width: '90%',
    height: '90%',
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  contentContainer: {
    padding: spacing.md,
  },
  skeletonText: {
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  titleSkeleton: {
    height: 16,
    width: '100%',
  },
  categorySkeleton: {
    height: 12,
    width: '60%',
    marginBottom: spacing.md,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSkeleton: {
    height: 18,
    width: '40%',
  },
});

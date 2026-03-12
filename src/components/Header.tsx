import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Icon, IconSizes } from './Icon';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/fonts';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  showBack?: boolean;
}

/**
 * Reusable Header component for screens
 * Supports back button, title, and right action icon
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  rightIcon,
  onRightPress,
  showBack = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name="arrow-back"
              size={IconSizes.lg}
              color={colors.text.primary}
              family="ionicon"
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={rightIcon}
              size={IconSizes.lg}
              color={colors.text.primary}
              family="ionicon"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.card,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 32,
    justifyContent: 'center',
  },
  rightContainer: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    ...typography.headline3,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
});

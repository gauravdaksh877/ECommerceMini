import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type IconFamily = 'ionicon' | 'material';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
  style?: any;
}

/**
 * Reusable Icon component wrapper around react-native-vector-icons
 * Supports both Ionicons and MaterialIcons
 *
 * @example
 * <Icon name="cart" size={24} color="#007AFF" />
 * <Icon name="trash" size={20} color="#FF3B30" family="material" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000000',
  family = 'ionicon',
  style,
}) => {
  if (family === 'material') {
    return (
      <MaterialIcon name={name} size={size} color={color} style={style} />
    );
  }

  return <IonIcon name={name} size={size} color={color} style={style} />;
};

/**
 * Icon size constants for consistent sizing across the app
 */
export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

/**
 * Common icon names for quick reference
 */
export const IconNames = {
  cart: 'cart',
  cartOutline: 'cart-outline',
  trash: 'trash',
  trash2: 'trash-2',
  plus: 'plus',
  minus: 'minus',
  checkmark: 'checkmark',
  close: 'close',
  arrowBack: 'arrow-back',
  arrowBackOutline: 'arrow-back-outline',
  search: 'search',
  home: 'home',
  homeOutline: 'home-outline',
  star: 'star',
  starOutline: 'star-outline',
  heart: 'heart',
  heartOutline: 'heart-outline',
  settings: 'settings',
  settingsOutline: 'settings-outline',
  menu: 'menu',
  info: 'information-circle',
  infoOutline: 'information-circle-outline',
  warning: 'warning',
  error: 'close-circle',
  success: 'checkmark-circle',
  loading: 'reload',
} as const;

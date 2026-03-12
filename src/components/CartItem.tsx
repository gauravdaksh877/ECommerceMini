import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CartItem } from '../models/Product';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/formatPrice';
import { Icon, IconSizes } from './Icon';

interface CartItemComponentProps {
  item: CartItem;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}) => {
  const lineTotal = item.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onDecreaseQuantity(item.id)}
          >
            <Icon
              name="remove"
              size={IconSizes.sm}
              color={colors.text.primary}
              family="material"
            />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onIncreaseQuantity(item.id)}
          >
            <Icon
              name="add"
              size={IconSizes.sm}
              color={colors.text.primary}
              family="material"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.lineTotal}>{formatPrice(lineTotal)}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
        >
          <Icon
            name="trash"
            size={IconSizes.sm}
            color={colors.error}
            family="ionicon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.background.light,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginHorizontal: 12,
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  lineTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

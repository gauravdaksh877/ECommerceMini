import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Product } from '../models/Product';
import { colors } from '../theme/colors';
import { formatPrice, formatRating } from '../utils/formatPrice';
import { Icon, IconSizes } from './Icon';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                size={IconSizes.sm}
                color={colors.warning}
                family="ionicon"
              />
              <Text style={styles.rating}>
                {formatRating(product.rating.rate)} ({product.rating.count})
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginHorizontal: 6,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    height: 150,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 6,
    lineHeight: 18,
  },
  categoryContainer: {
    marginBottom: 6,
  },
  category: {
    fontSize: 10,
    color: colors.text.secondary,
    textTransform: 'capitalize',
    fontWeight: '500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.background.light,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 11,
    color: colors.text.secondary,
    marginLeft: 3,
  },
});

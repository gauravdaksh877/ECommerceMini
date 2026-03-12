import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { RootState } from '../store/store';
import { colors } from '../theme/colors';
import { useProduct } from '../hooks/useProducts';
import { useToast } from '../components/Toast';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { formatPrice, formatRating } from '../utils/formatPrice';
import { Icon, IconSizes } from '../components/Icon';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const toast = useToast();
  const { product, loading, error } = useProduct(productId);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = product
    ? cartItems.some(item => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    if (!product) return;

    setIsAdding(true);
    dispatch(addToCart(product));
    
    toast.show(`${product.title.substring(0, 30)}... added to cart!`, 'success', 2000);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorView message={error} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorView message="Product not found" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.category}>{product.category}</Text>

            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                size={IconSizes.md}
                color={colors.warning}
                family="ionicon"
              />
              <Text style={styles.rating}>
                {formatRating(product.rating.rate)}
              </Text>
              <Text style={styles.ratingCount}>
                ({product.rating.count} reviews)
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {formatPrice(product.price)}
              </Text>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {product.description}
              </Text>
            </View>

            <View style={styles.spacer} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              isAdding && styles.addToCartButtonDisabled,
            ]}
            onPress={handleAddToCart}
            disabled={isAdding || isInCart}
          >
            <Icon
              name="cart"
              size={IconSizes.md}
              color="#FFFFFF"
              family="ionicon"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.addToCartButtonText}>
              {isAdding
                ? 'Adding...'
                : isInCart
                ? 'Already in Cart'
                : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  imageContainer: {
    height: 300,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  category: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
    textTransform: 'capitalize',
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 28,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: 4,
    marginLeft: 4,
  },

  ratingCount: {
    fontSize: 12,
    color: colors.text.secondary,
  },

  priceContainer: {
    backgroundColor: colors.background.card,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },

  descriptionSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  spacer: {
    height: 80,
  },

  footer: {
    padding: 16,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  addToCartButtonDisabled: {
    opacity: 0.6,
  },

  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
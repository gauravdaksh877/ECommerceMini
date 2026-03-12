import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { RootState } from '../store/store';
import { colors } from '../theme/colors';
import { Icon, IconSizes } from '../components/Icon';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { HeaderBackButtonProps } from '@react-navigation/elements';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
};

export type RootTabParamList = {
  ProductsTab: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const ProductsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerBackTitle: 'Back',
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
         headerLeft: ({ tintColor, onPress }: HeaderBackButtonProps) => (
          <TouchableOpacity
            onPress={onPress}
            style={{ marginLeft: 16, padding: 8 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={IconSizes.md}
              color={tintColor || colors.primary}
              family="ionicon"
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: 'Product Details',
        })}
      />
    </Stack.Navigator>
  );
};

const CartBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.tertiary,
          tabBarStyle: {
            borderTopColor: colors.border,
            paddingBottom: 4,
            height: 56,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="ProductsTab"
          component={ProductsNavigator}
          options={{
            title: 'Products',
            tabBarLabel: 'Products',
            tabBarIcon: ({ color }) => (
              <Icon
                name="home"
                size={IconSizes.md}
                color={color}
                family="ionicon"
              />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 4,
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Cart',
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <View>
                <Icon
                  name="cart"
                  size={IconSizes.md}
                  color={color}
                  family="ionicon"
                />
                <CartBadge count={cartItemCount} />
              </View>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 4,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

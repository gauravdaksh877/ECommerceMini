# E-Commerce Mini App - Quick Reference Guide

## 📋 File Structure Reference

### Essential Files
```
App.tsx                          ← Main entry point (UPDATED)
package.json                     ← Dependencies (UPDATED)
README.md                        ← Full documentation

src/
├── navigation/
│   └── AppNavigator.tsx         ← Navigation setup
├── screens/
│   ├── ProductListScreen.tsx    ← Browse products
│   ├── ProductDetailScreen.tsx  ← Product details
│   └── CartScreen.tsx           ← Shopping cart
├── components/
│   ├── ProductCard.tsx          ← Product display
│   ├── CartItem.tsx             ← Cart item display
│   ├── LoadingView.tsx          ← Loading UI
│   └── ErrorView.tsx            ← Error UI
├── store/
│   ├── store.ts                 ← Redux setup
│   └── cartSlice.ts             ← Cart state
├── services/
│   └── api.ts                   ← API client
├── hooks/
│   └── useProducts.ts           ← Data fetching hooks
├── models/
│   └── Product.ts               ← TypeScript types
├── theme/
│   └── colors.ts                ← Design colors
└── utils/
    └── formatPrice.ts           ← Helper functions
```

## 🚀 Quick Start Commands

### Installation & Setup
```bash
# Install dependencies
npm install

# iOS only: Install pods
cd ios && pod install && cd ..

# Start development server
npm start
```

### Run App
```bash
# Android
npm run android

# iOS
npm run ios

# Both (open both in emulators/simulators)
npm run android && npm run ios
```

### Development Tools
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code
npx prettier --write src/

# Tests
npm test
```

## 🔄 Redux State Example

### Accessing Cart State
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';

// In component:
const { items, total } = useSelector((state: RootState) => state.cart);
const dispatch = useDispatch();

// Add to cart
dispatch(addToCart(product));

// Remove from cart
dispatch(removeFromCart(productId));
```

## 📱 Screen Navigation

### Product List → Detail
```typescript
// In ProductListScreen
const handleProductPress = (product: Product) => {
  navigation.navigate('ProductDetail', { productId: product.id });
};
```

### Detail → Cart
```typescript
// In ProductDetailScreen
navigation.getParent()?.navigate('Cart');
```

### Back Navigation
```typescript
navigation.goBack();
```

## 🎨 Using Design Tokens

```typescript
import { colors } from '../theme/colors';

// Colors available:
colors.primary           // #007AFF
colors.error             // #FF3B30
colors.success           // #34C759
colors.background.primary  // #F2F2F7
colors.background.card     // #FFFFFF
colors.text.primary      // #000000
colors.text.secondary    // #666666
```

## 📡 API Usage

### Fetch Products
```typescript
import { useProducts } from '../hooks/useProducts';

const { products, loading, error } = useProducts();

if (loading) return <LoadingView />;
if (error) return <ErrorView message={error} />;
return <FlatList data={products} ... />;
```

### Fetch Single Product
```typescript
import { useProduct } from '../hooks/useProducts';

const { product, loading, error } = useProduct(productId);
```

### Direct API Calls
```typescript
import { apiService } from '../services/api';

const products = await apiService.fetchProducts();
const product = await apiService.fetchProductById(5);
```

## 🧩 Component Usage

### ProductCard
```typescript
<ProductCard 
  product={product}
  onPress={(product) => navigation.navigate('ProductDetail', { productId })}
/>
```

### CartItemComponent
```typescript
<CartItemComponent
  item={cartItem}
  onIncreaseQuantity={(id) => dispatch(increaseQuantity(id))}
  onDecreaseQuantity={(id) => dispatch(decreaseQuantity(id))}
  onRemove={(id) => dispatch(removeFromCart(id))}
/>
```

### LoadingView
```typescript
if (loading) return <LoadingView />;
```

### ErrorView
```typescript
<ErrorView 
  message="Failed to load products"
  onRetry={() => refetch()}
/>
```

## 🔑 Key Redux Actions

From `src/store/cartSlice.ts`:

```typescript
// Add product (creates new or increments quantity)
dispatch(addToCart(product))

// Remove entire item
dispatch(removeFromCart(productId))

// Increase quantity by 1
dispatch(increaseQuantity(productId))

// Decrease quantity by 1 (min 1)
dispatch(decreaseQuantity(productId))

// Clear entire cart
dispatch(clearCart())
```

## 🎯 Cart Logic Flow

```
Product Card (tap)
  ↓
ProductDetailScreen
  ↓
Click "Add to Cart"
  ↓
dispatch(addToCart(product))
  ↓
Redux updates cart slice
  ↓
Cart badge updates automatically
  ↓
Show confirmation alert
```

## 📊 Data Flow

```
API (fakestoreapi.com)
  ↓
apiService.ts (fetch)
  ↓
useProducts hook (loading/error state)
  ↓
Screen component (passes to FlatList)
  ↓
ProductCard component (display)
```

## ⚠️ Common Patterns

### Handling Network Errors
```typescript
const { products, loading, error } = useProducts();

if (error) {
  return <ErrorView message={error} onRetry={refetch} />;
}
```

### Cart Badge Number
```typescript
const cartCount = useSelector(state => state.cart.items.length);
// Shows dynamic badge on Cart tab
```

### Confirmation Dialogs
```typescript
Alert.alert(
  'Remove Item',
  'Are you sure?',
  [
    { text: 'Cancel', onPress: () => {}, style: 'cancel' },
    { text: 'Remove', onPress: () => dispatch(removeFromCart(id)), style: 'destructive' }
  ]
);
```

## 🧪 Testing

Create tests in `__tests__/` directory:

```typescript
// __tests__/store/cartSlice.test.ts
import cartReducer, { addToCart } from '../../src/store/cartSlice';

const mockProduct = {
  id: 1,
  title: 'Test',
  price: 10,
  description: 'Test product',
  category: 'test',
  image: 'url',
  rating: { rate: 4.5, count: 100 }
};

test('adds product to cart', () => {
  const state = cartReducer(undefined, addToCart(mockProduct));
  expect(state.items).toHaveLength(1);
  expect(state.total).toBe(10);
});
```

## 🔧 Debugging Tips

### See Redux Actions
- Install React Native Debugger
- Open debugger parallel to emulator
- View all dispatch actions

### Check Network Calls
```typescript
// In api.ts, try-catch log errors:
console.error('API Error:', error);
```

### Type Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

### Navigation Debugging
```typescript
// In AppNavigator.tsx, add:
<NavigationContainer
  onReady={() => console.log('Navigation ready')}
  linking={linking}
>
```

## 📦 Adding New Features

### New Screen
1. Create file in `src/screens/`
2. Import in `src/navigation/AppNavigator.tsx`
3. Add to navigator config

### New Redux State
1. Create slice in `src/store/`
2. Register in `configureStore()`
3. Import in components with `useSelector`

### New API Endpoint
1. Add method to `src/services/api.ts`
2. Create custom hook in `src/hooks/`
3. Use hook in component

## 🎓 Key Files to Understand First

1. **App.tsx** - Redux Provider setup
2. **src/navigation/AppNavigator.tsx** - Screen hierarchy
3. **src/store/cartSlice.ts** - State management
4. **src/hooks/useProducts.ts** - Data fetching pattern
5. **src/services/api.ts** - API integration

## ✨ Best Practices Used

✅ Custom hooks for side effects
✅ Redux for cart state
✅ Redux Toolkit for simplicity
✅ TypeScript for type safety
✅ Separate API service layer
✅ Reusable components
✅ Error boundaries
✅ Loading states
✅ Empty states
✅ Alert confirmations

## 📞 Quick Troubleshooting

**App won't start:**
- Run `npm install` again
- Clear Metro cache: `npm start -- --reset-cache`

**Redux not updating cart:**
- Check dispatch is called
- Verify action is imported from cartSlice
- Check Redux DevTools

**Navigation not working:**
- Verify screen name matches
- Check params typing
- Ensure navigation prop is available

**API failing:**
- Check internet connection
- Verify fakestoreapi.com is up
- Check network in console

**Type errors:**
- Run `npx tsc --noEmit`
- Check imports are correct
- Verify interface matches data

---

Happy coding! 🚀

# E-Commerce Mini App

A production-quality React Native TypeScript E-commerce application built with clean architecture principles, Redux Toolkit for state management, and React Navigation for seamless navigation.

## 📋 Project Overview

This is a small e-commerce application that allows users to:
- Browse a catalog of products
- View product details with ratings and descriptions
- Manage a shopping cart with add/remove/quantity features
- Proceed to checkout with order confirmation

The app uses the [FakeStore API](https://fakestoreapi.com) as the backend service and implements best practices for performance, error handling, and code organization.

## 🏗️ Architecture & Structure

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProductCard.tsx   # Product card display component
│   ├── CartItem.tsx      # Shopping cart item component
│   ├── LoadingView.tsx   # Loading state component
│   └── ErrorView.tsx     # Error state component
├── screens/              # Screen components
│   ├── ProductListScreen.tsx    # Products listing with scroll
│   ├── ProductDetailScreen.tsx  # Product details & Add to Cart
│   └── CartScreen.tsx           # Shopping cart management
├── navigation/           # Navigation setup
│   └── AppNavigator.tsx  # Tab and Stack navigation configuration
├── store/                # Redux state management
│   ├── store.ts          # Redux store configuration
│   └── cartSlice.ts      # Cart reducer with actions
├── services/             # API integration
│   └── api.ts            # FakeStore API service
├── hooks/                # Custom React hooks
│   └── useProducts.ts    # Product fetching hooks
├── models/               # TypeScript interfaces
│   └── Product.ts        # Product & CartItem types
├── theme/                # Design tokens
│   └── colors.ts         # Color palette
└── utils/                # Utility functions
    └── formatPrice.ts    # Price & rating formatting
```

### Architecture Principles

1. **Clean Architecture**: Separation of concerns across layers (UI, Business Logic, Data)
2. **Component Composition**: Reusable, single-responsibility components
3. **State Management**: Centralized Redux store for cart state
4. **Async Operations**: Custom hooks for API data fetching
5. **Type Safety**: Comprehensive TypeScript interfaces and types
6. **Error Handling**: Graceful error states and user feedback

## 🛠️ Technology Stack

- **React Native** (v0.84.1) - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** (v6.x) - Navigation library with tab and stack navigators
- **Redux Toolkit** (v1.9.x) - Simplified state management
- **React-Redux** (v8.x) - React bindings for Redux
- **React Hooks** - Functional component logic and data fetching

## 📱 Screen Components

### Product List Screen
- Displays all products in a scrollable list
- Each product card shows: image, title, price, category, and rating
- Optimized FlatList with virtualization for performance
- Loading and error states
- Navigate to product details on tap

### Product Detail Screen
- Full product information: image, title, description, rating
- Price prominently displayed
- "Add to Cart" button with user feedback
- Navigation back to products or to cart
- Loading and error states

### Cart Screen
- List of all cart items with quantity controls
- Increase/decrease quantity buttons
- Remove item functionality with confirmation
- Cart summary with subtotal, shipping, and total
- Checkout button with order confirmation alert

## 🔄 State Management (Redux)

### Cart Slice (`src/store/cartSlice.ts`)

The cart slice manages all shopping cart operations:

```typescript
// Actions
- addToCart(product)          // Add/increment product
- removeFromCart(productId)   // Remove item completely
- increaseQuantity(productId) // Increment quantity
- decreaseQuantity(productId) // Decrement quantity (min 1)
- clearCart()                 // Clear all items

// State
- items: CartItem[]  // Array of items in cart
- total: number      // Total price of all items
```

**Features:**
- Automatic total calculation
- Prevents duplicate items (increments quantity instead)
- Persists in Redux store (can be enhanced with AsyncStorage)

## 📡 API Integration

### API Service (`src/services/api.ts`)

RESTful API client for FakeStore API with:
- `fetchProducts()` - Get all products
- `fetchProductById(id)` - Get single product
- Proper error handling and logging
- Type-safe responses

**Base URL:** `https://fakestoreapi.com`

### Custom Hooks (`src/hooks/useProducts.ts`)

- `useProducts()` - Fetch all products with loading/error states
- `useProduct(id)` - Fetch single product by ID

## 🎨 UI/UX Details

### Design System

**Colors:**
- Primary: `#007AFF` (iOS Blue)
- Error: `#FF3B30`
- Success: `#34C759`
- Background: Neutral light colors with card elevation

**Components:**
- Card-based layouts with subtle shadows
- Smooth interactions with activeOpacity
- Proper spacing and typography hierarchy
- SafeAreaView for device notch handling

### Features

1. **Loading States** - Spinner with centered layout
2. **Error States** - User-friendly messages with icons
3. **Empty States** - Empty cart and no products messages
4. **Cart Badge** - Dynamic item count on tab navigation
5. **Alerts** - Confirmations for checkout and item removal

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.11.0
- CocoaPods (for iOS dependencies)
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Install Dependencies**

```bash
npm install
# or
yarn install
```

2. **Install Pods (iOS)**

```bash
cd ios
pod install
cd ..
```

3. **Start Metro Bundler**

```bash
npm start
# or
yarn start
```

4. **Run on Android**

```bash
npm run android
# or
npx react-native run-android
```

5. **Run on iOS**

```bash
npm run ios
# or
npx react-native run-ios
```

### Development

- **Lint Code**

```bash
npm run lint
```

- **Run Tests**

```bash
npm test
```

- **Format Code**

```bash
npx prettier --write .
```

## 📝 Code Examples

### Adding Product to Cart

```typescript
const dispatch = useDispatch();
dispatch(addToCart(product));
```

### Fetching Products

```typescript
const { products, loading, error } = useProducts();
```

### Accessing Cart State

```typescript
const { items, total } = useSelector(state => state.cart);
const itemCount = useSelector(state => state.cart.items.length);
```

### Navigation

```typescript
navigation.navigate('ProductDetail', { productId: product.id });
navigation.goBack();
navigation.getParent()?.navigate('Cart');
```

## 🔒 Type Safety

All features are fully typed with TypeScript:

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CartItem extends Product {
  quantity: number;
}
```

## ⚠️ Known Limitations

1. **No Offline Support** - App requires internet connection for API calls
2. **No Cart Persistence** - Cart data is cleared on app restart (Redux in-memory only)
3. **No Payment Integration** - Checkout is simulated with alerts
4. **No User Authentication** - Multi-user support not implemented
5. **No Search/Filter** - Products are displayed in API order
6. **No Product Reviews** - Rating displayed but no review functionality
7. **No Wishlist** - Only cart functionality available
8. **Limited Product Images** - Some images may not load optimally on all devices

## 🚧 Future Improvements

### Phase 1: Core Features
- [ ] Search and filter products by category
- [ ] Sort products (price, rating, newest)
- [ ] Product reviews and user comments
- [ ] Wishlist functionality

### Phase 2: User Experience
- [ ] Cart persistence with AsyncStorage
- [ ] User accounts with login/registration
- [ ] Order history and tracking
- [ ] Favorite products

### Phase 3: Performance & Infrastructure
- [ ] Offline support with caching
- [ ] GraphQL integration for efficient queries
- [ ] Image optimization and lazy loading
- [ ] Push notifications for order updates

### Phase 4: Advanced Features
- [ ] Real payment gateway integration (Stripe, PayPal)
- [ ] Multiple language support (i18n)
- [ ] Dark mode support
- [ ] Advanced filters and search
- [ ] Recommendation engine based on user behavior
- [ ] User ratings and reviews system

## 🧪 Testing

The project includes jest configuration. Add tests in `__tests__/` directory:

```typescript
// Example: __tests__/store/cartSlice.test.ts
import cartReducer, { addToCart } from '../../src/store/cartSlice';

test('should add product to cart', () => {
  const product = { id: 1, title: 'Test', price: 10, ... };
  const newState = cartReducer(initialState, addToCart(product));
  expect(newState.items).toHaveLength(1);
  expect(newState.total).toBe(10);
});
```

## 📚 Key Concepts

### Redux Immutability
Redux Toolkit uses Immer internally, allowing "mutative" syntax that's safely immutable:

```typescript
state.items.push(newItem); // Actually creates new state
state.total += amount;     // Safe to "mutate"
```

### React Navigation Tab Navigator
Navigation structure with bottom tabs and stack navigator for product browsing:

```
App
├── ProductsTab (Stack)
│   ├── ProductList
│   └── ProductDetail
└── Cart
```

### Custom Hooks for Data Fetching
Encapsulates API calls with loading/error handling:

```typescript
const { products, loading, error } = useProducts();
```

## 🐛 Debugging Tips

1. **Redux DevTools**: Install React Native Debugger to see Redux actions
2. **Network Requests**: Check FakeStore API status at https://fakestoreapi.com
3. **Navigation Issues**: Use `navigation.navigate()` with correct screen names
4. **Type Errors**: Enable strict TypeScript checking in `tsconfig.json`
5. **Performance**: Use React DevTools Profiler for component re-renders

## 📖 Additional Resources

- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [FakeStore API](https://fakestoreapi.com)

## 📄 License

This project is created for educational purposes and demonstration of React Native best practices.

## 👨‍💻 Developer Notes

### Code Style
- Functional components with React Hooks
- TypeScript for all files (.ts/.tsx)
- Descriptive naming conventions
- Comments for complex logic
- Clean imports and exports

### Performance Optimizations
- FlatList virtualization for product lists
- Memoization for heavy components (can be added with React.memo)
- Efficient Redux selectors (can be memoized with reselect)
- Image lazy loading via React Native FlatList

### Common Issues & Solutions

**Issue**: Products not loading
- Solution: Check network connection and FakeStore API availability at https://fakestoreapi.com

**Issue**: Redux state not updating
- Solution: Verify dispatch is called correctly and action is imported from cartSlice.ts

**Issue**: Navigation not working
- Solution: Ensure screen names match in navigation setup and useNavigation calls

**Issue**: Cart not persisting on reload
- Solution: This is expected behavior; AsyncStorage can be added to persist Redux state

## 🎯 Best Practices Implemented

✅ **Separation of Concerns** - Clear layer separation (UI, Business Logic, Data)
✅ **Type Safety** - Full TypeScript coverage
✅ **Error Handling** - Try-catch blocks and user-friendly error messages
✅ **Performance** - Optimized rendering and list virtualization
✅ **Component Reusability** - Generic, composable components
✅ **State Management** - Centralized Redux store with Redux Toolkit
✅ **API Integration** - Abstracted service layer with clean interface
✅ **Code Organization** - Logical folder structure and clear dependencies
✅ **Accessibility** - SafeArea handling and proper touch targets
✅ **Maintainability** - Clear code with comments and comprehensive documentation

## 📞 Support

For issues or questions, refer to:
1. React Native documentation - https://reactnative.dev/docs
2. React Navigation guides - https://reactnavigation.org
3. Redux Toolkit tutorials - https://redux-toolkit.js.org
4. TypeScript documentation - https://www.typescriptlang.org
5. FakeStore API documentation - https://fakestoreapi.com

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../models/Product';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = calculateTotal(state.items);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total = calculateTotal(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

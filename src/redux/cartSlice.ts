import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getCartFromLocalStorage } from "../utils/getCartFromLocalStorage";
type CartData = {
  id: string;
  type: string;
  size: number;
};
export type CartItem = {
  id: string;
  title: string;
  count: number;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
};

interface CartState {
  total: number;
  items: Array<CartItem>;
}
const { items, total } = getCartFromLocalStorage();
const initialState: CartState = {
  total: total,
  items: items,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      state.total += action.payload.price;
      if (newItem) {
        newItem.count++;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    removeItemsOfType(state, action: PayloadAction<CartData>) {
      const removedItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      if (removedItem) {
        state.items = state.items.filter(
          (item) =>
            item.id !== removedItem.id ||
            item.size !== removedItem.size ||
            item.type !== removedItem.type
        );
        state.total = state.total - removedItem.price * removedItem.count;
      }
    },
    removeItem(state, action: PayloadAction<CartData>) {
      const removedItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      if (removedItem && removedItem.count > 1) {
        removedItem.count--;
      } else if (removedItem && removedItem.count === 1) {
        state.items = state.items.filter(
          (item) =>
            item.id !== removedItem.id ||
            item.size !== removedItem.size ||
            item.type !== removedItem.type
        );
      }
      if (removedItem) state.total -= removedItem.price;
    },
    clearItems(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const getItemsCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.count, 0);
export const getTotal = (state: RootState) => state.cart.total;
export const getItems = (state: RootState) => state.cart.items;
export const { addItem, removeItem, clearItems, removeItemsOfType } =
  CartSlice.actions;

export default CartSlice.reducer;

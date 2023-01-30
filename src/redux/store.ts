import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./filterSlice";
import CartSlice from "./cartSlice";
import PizzasSlice from "./pizzasSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    filter: FilterSlice,
    cart: CartSlice,
    pizza: PizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

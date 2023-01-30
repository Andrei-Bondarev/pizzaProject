import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { CartItem } from "./cartSlice";
type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export type SearchPizzaParams = {
  categoryId: string;
  sortParam: Sort;
  search: string;
  currentPage: string;
};
interface PizzaState {
  items: Pizza[];
  status: string;
  selectedItem: Pizza | "";
}
type Sort = {
  name: string;
  sort: string;
};
const initialState: PizzaState = {
  items: [],
  status: "",
  selectedItem: "",
};
type FetchPizzasArgs = {
  categoryId: number;
  sortParam: Sort;
  search: string;
  currentPage: number;
};
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzas",
  async ({ categoryId, sortParam, search, currentPage }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://62c9e0dd4795d2d81f82dc27.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${
        sortParam.sort
      }&order=desc&search=${search}&page=${currentPage}&limit=4`
    );
    return data;
  }
);
export const fetchPizza = createAsyncThunk<Pizza, number>(
  "pizza/fetchPizza",
  async (id) => {
    const { data } = await axios.get<Pizza>(
      `https://62c9e0dd4795d2d81f82dc27.mockapi.io/items/${id}`
    );
    return data;
  }
);
const PizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      });
  },
});
export const getSelectedItem = (state: RootState) => state.pizza.selectedItem;
export const getStatus = (state: RootState) => state.pizza.status;
export const getItems = (state: RootState) => state.pizza.items;
export const { setItems } = PizzasSlice.actions;
export default PizzasSlice.reducer;

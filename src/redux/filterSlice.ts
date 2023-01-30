import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
type Sort = {
  name: string;
  sort: string;
};
export interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  currentPage: number;
}

const initialState: FilterState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  currentPage: 1,
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortParam(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearch(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortParam,
  setFilters,
  setCurrentPage,
  setSearch,
} = FilterSlice.actions;

export default FilterSlice.reducer;

export const getCategoryId = (state: RootState) => state.filter.categoryId;
export const getCurrentPage = (state: RootState) => state.filter.currentPage;
export const getSortParam = (state: RootState) => state.filter.sort;
export const getSearch = (state: RootState) => state.filter.searchValue;

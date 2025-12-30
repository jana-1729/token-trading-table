import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, TokenStatus } from "@/types/token";

const initialState: FilterState = {
  status: "all",
  verified: null,
  trending: null,
  minPrice: null,
  maxPrice: null,
  minVolume: null,
  searchQuery: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<TokenStatus | "all">) => {
      state.status = action.payload;
    },
    setVerifiedFilter: (state, action: PayloadAction<boolean | null>) => {
      state.verified = action.payload;
    },
    setTrendingFilter: (state, action: PayloadAction<boolean | null>) => {
      state.trending = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setMinVolume: (state, action: PayloadAction<number | null>) => {
      state.minVolume = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setStatusFilter,
  setVerifiedFilter,
  setTrendingFilter,
  setPriceRange,
  setMinVolume,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;


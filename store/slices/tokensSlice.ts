import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token, SortState, SortField, SortDirection } from "@/types/token";

interface TokensState {
  tokens: Token[];
  sortState: SortState;
  loading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  sortState: {
    field: null,
    direction: null,
  },
  loading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ tokenId: string; price: number; change24h: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.tokenId);
      if (token) {
        token.price = action.payload.price;
        token.change24h = action.payload.change24h;
      }
    },
    setSortState: (state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) => {
      state.sortState = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTokens, updateTokenPrice, setSortState, setLoading, setError } =
  tokensSlice.actions;

export default tokensSlice.reducer;


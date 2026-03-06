 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  transactions: [],
  userProfile: null,
};

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userProfile = action.payload;
      state.balance = action.payload.balance;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
  },
});

export const { setProfile, updateBalance, setTransactions, addTransaction } = bankSlice.actions;
export default bankSlice.reducer;
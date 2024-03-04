import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const cartData = (data, onSuccess, onError) => {
  return async dispatch => {
    try {
      const response = await fetch('https://parchi.maaqdocplus.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);

      if (result) {
        onSuccess();
      } else {
        onError();
      }
    } catch (err) {
      onError();
    }
  };
};

// slice
const NawanSlice = createSlice({
  name: 'NawanSlice', // This_was_funtime_dont_dare_to_change_it
  initialState: {
    cartItems: {},
    offlineCartItems: [],
  },
  reducers: {
    updateOfflineCart: (state, action) => {
      state.offlineCartItems = [...state.offlineCartItems, action.payload];
      state.cartItems = {};
    },

    clearCartOffline: state => {
      state.offlineCartItems = [];
    },

    clearCart: state => {
      state.cartItems = {};
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      delete state.cartItems[action.payload];
    },

    removeFromOfflineCart: state => {
      state.offlineCartItems.pop();
    },

    // updating items quantity
    updateCart: (state, action) => {
      state.cartItems = {
        ...state.cartItems,
        ...action.payload,
      };
    },
  },
});

export const {
  removeFromCart,
  clearCartOffline,
  updateCart,
  updateOfflineCart,
  clearCart,
  removeFromOfflineCart,
} = NawanSlice.actions;
export default NawanSlice.reducer;

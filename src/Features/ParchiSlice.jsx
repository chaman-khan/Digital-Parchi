import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const handleGetProducts = (userID, onSuccessGetData, onErrorGetData) => {
  return async dispatch => {
    try {
      const response = await fetch('https://parchi.maaqdocplus.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Business_ID: userID}),
      });

      const result = await response.json();

      if (result) {
        dispatch(saveProducts(result.products));
        onSuccessGetData();
      } else {
        onErrorGetData();
      }
    } catch (err) {
      onErrorGetData();
    }
  };
};

export const handlePostProduct = (data, onSuccess, onError) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://parchi.maaqdocplus.com/addProducts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

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

export const handleUpdateProduct = (
  userID,
  onSuccessGetData,
  onErrorGetData,
) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://parchi.maaqdocplus.com/updatePorducts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Business_ID: userID}),
        },
      );

      const result = await response.json();

      if (result) {
        dispatch(saveProducts(result.products));
        onSuccessGetData();
      } else {
        onErrorGetData();
      }
    } catch (err) {
      onErrorGetData();
    }
  };
};

// dashbaord Data

export const fetchDashboardData = createAsyncThunk(
  'fetchDashboardData',
  async ({dateFrom, dateTo, businessID}, {rejectWithValue}) => {
    try {
      const response = await fetch('https://parchi.maaqdocplus.com/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dateFrom, dateTo, Business_ID: businessID}),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

// slice
const ParchiSlice = createSlice({
  name: 'app',
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    searchData: [],
    printedBills: [],
    dashboardData: [],
  },
  reducers: {
    saveProducts: (state, action) => {
      state.products = action.payload;
    },

    // search Items
    searchItems: (state, action) => {
      state.searchData = action.payload;
    },

    // clear bills
    clearBills: state => {
      state.printedBills = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload.records;
    });
  },
});

export const {searchItems, clearBills, saveProducts} = ParchiSlice.actions;
export default ParchiSlice.reducer;

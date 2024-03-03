import {createSlice} from '@reduxjs/toolkit';

export const sendPin = (data, onSuccessLogin, onErrorLogin) => {
  return async dispatch => {
    try {
      console.log(data);
      const response = await fetch('https://parchi.maaqdocplus.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.Business_ID) {
        onSuccessLogin(result.Message);
        dispatch(saveUserInfo(result));
      } else {
        onErrorLogin(result.Error);
      }
    } catch (err) {
      onErrorLogin(err);
    }
  };
};

const PinSlice = createSlice({
  name: 'pin',
  initialState: {
    userId: '',
    logo: '',
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.userId = action.payload.Business_ID;
      state.logo = action.payload.logo;
    },
  },
});

const {saveUserInfo} = PinSlice.actions;

export default PinSlice.reducer;

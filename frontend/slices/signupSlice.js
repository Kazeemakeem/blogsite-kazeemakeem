import { createSlice } from '@reduxjs/toolkit'

 
const initialState = {
  signupDetails: {
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  }
}

 
 const signupSlice = createSlice({
     name: 'signup',
     initialState,
    reducers: {
      updateSignupDetails: (state, action) => {
        state.signupDetails = action.payload
      },
    }
  })

 export default signupSlice.reducer
 export const { updateSignupDetails } = signupSlice.actions
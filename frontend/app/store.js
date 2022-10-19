import { configureStore } from '@reduxjs/toolkit'
import signupReducer from '../slices/signupSlice'
// import mainsReducer from '../components/main/mainContentSlice'
// import cartReducer from '../components/cart/cartSlice'
// import navbarReducer from '../components/navbar/navbarSlice'


const store = configureStore({
    reducer: {
        signup: signupReducer,
        // cart: cartReducer,
        // navbar: navbarReducer,
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()

})

export default store
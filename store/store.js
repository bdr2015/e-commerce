import {configureStore, createSlice, current} from '@reduxjs/toolkit'


const initialState = {
    allItems:[],
    cartItems:[]
}
const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        setAll:(state,action)=>{
            state.allItems = action.payload
        },
        getFromStorage:(state,action)=>{
            state.cartItems = action.payload
        },
        addItem:(state,action)=>{
            state.cartItems.push(action.payload)
        },
        deleteItem:(state,action)=>{
            state.cartItems = action.payload
        },
        addQuantity:(state, action)=>{
            const itemIndex = state.cartItems.findIndex((el)=>el.id === action.payload.id);
            if(action.payload.quant){
                state.cartItems[itemIndex].quantity+=action.payload.quant
            }
            else{
                state.cartItems[itemIndex].quantity++

            }
        },
        reduceQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex((el)=>el.id === action.payload.id);
            if(state.cartItems[itemIndex].quantity>1){
                state.cartItems[itemIndex].quantity--
            }
            
        },
        clearCart:(state)=>{
            state.cartItems=[]
        }
    }
})

export default configureStore({reducer:{
    cart:cartSlice.reducer,
}})

export const {addItem, deleteItem,getFromStorage,setAll,addQuantity,reduceQuantity,clearCart} = cartSlice.actions
import { current } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CartItem from "../components/CartItem"
import style from './cart.module.css'
import {deleteItem, getFromStorage,setAll,clearCart} from '../store/store'
import { useForm } from "react-hook-form";
import axios from "axios"



export default function Cart({items}){
    const goods = useSelector((state)=>state.cart.cartItems) 
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()   
    const allItems = useSelector((state)=>state.cart.allItems)

    useEffect(()=>{
        dispatch(setAll(items))
    },[])
     //вибірка товарів з localStorage, які були додані в корзину  
     useEffect(()=>{
        if(allItems.length>0){
            try{
                    let savedItems = JSON.parse(localStorage.getItem('itemsId'))
                    let itemsToDispatch=[]
                    
                    for(let itemId of savedItems){
                        let kas = allItems.find((el)=>el.id===itemId.id)
                        itemsToDispatch.push({...kas, quantity:itemId.quant})
                    }     
                    dispatch(getFromStorage(itemsToDispatch))
                    
            }
            catch(e){
            }
        
    }
    },[allItems])


    useEffect(()=>{
        const total = goods.reduce((accumulator,current) => accumulator + current.price * current.quantity, 0)
        setTotalPrice(total)
    },[goods])
    const clearItem = (item)=>{
        dispatch(deleteItem(goods.filter((el)=>el.id!== item.id)))
        let lSItems = JSON.parse(localStorage.getItem('itemsId'))
        localStorage.setItem('itemsId',JSON.stringify(lSItems.filter((el)=>el.id==item.id)))

    }

    const {register,reset,formState:{errors, isValid}, handleSubmit} = useForm({mode:"onBlur"})
  
    const checkOut = async(data)=>{
            let order = {receiver:data,products:goods.map((el)=>{return {id:el.id, quantity:el.quantity}})}
            let result = await axios.post('https://e-commerce-server-indol.vercel.app/',{
                order
            })
            console.log(result);
            dispatch(clearCart())
            localStorage.setItem("itemsId",[])
            reset()
        
        
    }

    return(
        <div className={style.cartWrapper}>
        <div className={style.cartListWrapper}>
           {goods.map((el)=>{
            return(
                    <CartItem item={el} clearItem={clearItem} key={el.id}/>
                    
               
            )
           })}
           
        </div>
        {goods.length>0&&
             <div className={style.checkOutWrapper}>
            
             <form onSubmit={handleSubmit(checkOut)}>
                 <label>
                     Phone number: +38
                 <input type="tel" {...register("phone",{
                     required:"This field is required",
                     pattern:{
                         value:/\d{10}/,
                         message:"Insert correct phone number"
                     },
                     maxLength:{
                         value:10,
                         message:"Insert correct phone number"
                     },
                     
                 })} />
                 <p >{errors?.phone&& errors?.phone?.message}</p>
                 </label>
                 <label>
                     Name:
                 <input type='text' {...register("name",{
                     required:"This field is required",
                 })} />
                 <p >{errors?.name&& errors?.name?.message}</p>
                 </label>
                 <label>
                     Surname:
                 <input type='text' {...register("surname",{
                     required:"This field is required",
                 })} />
                 <p >{errors?.surname&& errors?.surname?.message}</p>
                 </label>
                 <label>
                     Delivery address:
                 <input type='text' {...register("address",{
                     required:"This field is required",
                 })} />
                 <p >{errors?.address&& errors?.address?.message}</p>
                 </label>
                
                
                
 
                 <h2>Total price: {totalPrice.toFixed(2)}$</h2>
                 <button type="submit" disabled={!isValid}>Order</button>
             </form>
            </div>
        }
        {goods.length<=0&&
            <h3>Your cart is empty</h3>
        }
       
        </div>
           
    )
}

export async function getStaticProps(){
    let res = (await axios.get('https://fakestoreapi.com/products'))
    let items = res.data;

    items.forEach(el => el.quantity=1);
    return{
        props:{
            items:items
        }
    }
}
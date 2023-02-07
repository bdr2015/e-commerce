import {useState } from "react";
import style from './list.module.css'
import axios from "axios";
import {addItem, deleteItem,setAll,getFromStorage} from '../store/store'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from 'next/link'

export default function ProductList({items}){
    const [search, changeSearch] = useState('')
    const [inputValue, changeInputValue] = useState('')
    const [filtered, changeFilteredItems] = useState([])
    const allCartItems = useSelector((state)=>state.cart.cartItems)
    const allItems = useSelector((state)=>state.cart.allItems)
    const dispatch = useDispatch()


    const changeInput = (e)=>{
        if(e.target.value===''){
            changeInputValue(e.target.value)
            changeSearch(e.target.value)
            changeFilteredItems([])
        }
        else{changeInputValue(e.target.value)}   
    }
    const searchByInput = (e)=>{
        e.preventDefault()
        changeFilteredItems(items.filter(el=>el.title.toLowerCase().includes(inputValue.toLowerCase())))
        changeSearch(inputValue)
        
    }
    
    const addToCart = (item)=>{
        let alreadyAdded = allCartItems.find((el)=>el.id===item.id)
        if(alreadyAdded=== undefined){
            dispatch(addItem(item))
        }
    }
    useEffect(()=>{
        if(allCartItems.length>0){
            const idOfAllItems = allCartItems.map((el)=>{
                let id = Object.values(el)[0]
                let quant = Object.values(el)[7]
                
                return {id,quant}
            })
            let uniqueAllCartItems = [...new Set(idOfAllItems)]  
            localStorage.setItem('itemsId', JSON.stringify(uniqueAllCartItems))   
            console.log(idOfAllItems)
        }
    },[allCartItems])
    

   
    
    return(
        <>
             <form onSubmit={searchByInput} className={style.form}>
                <input type="text" placeholder="Search" value={inputValue} onChange={changeInput}/>
                <button className={style.searchButton}>Search</button>
            </form>
            <div className={style.listWrapper}>
                {(search==='' && filtered.length<1)&& items.map((el)=>{
                   
                        return(
                            <Link href={`/${el.id}`} style={{textDecoration:"none"}} key={el.id} className={style.productItemCart}>
                            
                                <img src={el.image}  />
                                <h2>{el.title}</h2>
                                <h3>price: {el.price}$</h3>
                                <button onClick={(e)=>{e.preventDefault(); addToCart(el)}}>Add to cart</button>
                            </Link>
                        )
                    })
                }
                {filtered.length>0 && filtered.map(el=>{
                    return(
                        <Link href={`/${el.id}`} style={{textDecoration:"none"}} key={el.id}>
                            <div className={style.productItemCart} key={el.id}>
                                    <img src={el.image}  />
                                    <h2>{el.title}</h2>
                                    <h3>price: {el.price}$</h3>
                                    <button onClick={(el)=>addToCart(el)}>Add to cart</button>
        
                            </div>
                        </Link>
                    )
                })}
                {(filtered.length<1 && search!=='') && <div>No products based on your request</div>}
                
                
              
            </div>
        </>

    )
}


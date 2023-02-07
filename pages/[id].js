import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import style from "./certainItem.module.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import {addItem, addQuantity} from '../store/store'



export default function Id({item}){
    const dispatch = useDispatch()
    const [quant, setQuant] = useState(1)
    const plusQuantity=()=>{
        setQuant((current)=>++current)
    }
    const reduceQuantity=()=>{
        if(quant>1){
            setQuant((current)=>--current)
        }
    }
   
    const allCartItems = useSelector((state)=>state.cart.cartItems)
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
    
    const toCart=()=>{
        let alreadyAdded = allCartItems.find((el)=>el.id===item.id)
        if(alreadyAdded===undefined){

        
            dispatch(addItem({...item, quantity:quant}))
        }
        else{
            dispatch(addQuantity({id:item.id, quant}))
        }
        setQuant(1)
        
    }
    return(
        <div className={style.certainItem}>
            <img src={item.image}/>
            <div className={style.descWrapper}>
            <h3 className={style.title}>{item.title}</h3>
            <h3 className={style.price}>{item.price}$</h3>
            <h4>Description:</h4>
            <p className={style.description}>{item.description}</p><br/>
            <button className={style.changeQuant} onClick={reduceQuantity}>-</button>
            <h2 className={style.quant}>{quant}</h2>
            <button className={style.changeQuant} onClick={plusQuantity}>+</button>
            <button className={style.addToCart} onClick={toCart}>Add to cart</button>
            
            </div>
        </div>
    )
}







export async function getStaticPaths(){
    const allProducts = await axios.get('https://fakestoreapi.com/products/')
    const paths = allProducts.data.map((el)=>{
        return{ params:{id: el.id.toString()} }
    })

    return {paths, fallback:false}

}

export async function getStaticProps({params}){
    let res = await axios.get('https://fakestoreapi.com/products/'+params.id)
    let item = res.data;
    item.quantity=1;

    return{
        props:{
            item
        }
    }
}


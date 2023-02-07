import axios from "axios";
import ProductList from "../components/ProductList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAll } from "../store/store";


export default function App({items}){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setAll(items))
    },[])
    return(
        
        <ProductList items={items}/>
       
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

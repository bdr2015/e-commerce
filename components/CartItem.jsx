import style from './cartItems.module.css'
import { addQuantity,reduceQuantity } from '../store/store'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

export default function CartItem({item,clearItem}){
    const dispatch = useDispatch()
    const addQuantityToItem = ()=>{
        dispatch(addQuantity(item))
    }
    const reduceQuantityToItem = ()=>{
        dispatch(reduceQuantity(item))
    }
    

    return(
                <div className={style.itemWrapper}>
                    <img src={item.image}/>
                    <Link className={style.title} href={`/${item.id}`}><h3>{item.title}</h3></Link>
                    <p className={style.quantityLabel}>Quantity:</p>
                    <button className={style.reduceButton} onClick={reduceQuantityToItem}>-</button>
                    <h3 className={style.quantity}>{item.quantity}</h3>
                    <button onClick={addQuantityToItem} className={style.addButton}>+</button>
                    <h3 className={style.price}>Price: {(item.price*item.quantity).toFixed(2)}$</h3>
                    <button className={style.deleteItem} onClick={()=>{clearItem(item)}}>✖</button>
                </div>
    )
}
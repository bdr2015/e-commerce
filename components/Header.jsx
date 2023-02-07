import axios from 'axios'
import { useEffect } from 'react'
import style from './header.module.css'
import Link from 'next/link'
export default function Header(){
    /* useEffect(()=>{
        axios.get("http://localhost:5000/user", {withCredentials:true}).then((res)=>{console.log(res);})
    },[]) */
    
    
    return(
        
        <div className={style.header}>
            <div className={style.navs}>
                <Link href='/'>Home</Link>
                <Link href='/cart'>Cart</Link>
                
            </div>
            <div className={style.cart}>
            
            </div>
        </div>
    )
}

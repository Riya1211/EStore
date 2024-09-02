import axios from './Axios';
import React, { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext();

const Context = (props) => {
    // const [products, setProducts] = useState(null) 

    //This is for LocalStorage data and through this local storage data will come.
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products') || null));

    // I am commenting this code because if I try to add product I won't be able to because this is the static API and cant add or delete the product.

    // const getProducts = async () =>{
    //     try {
    //         const {data} = await axios('/products');
    //         setProducts(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // console.log(products);

    // useEffect(() => {
    //     getProducts();
    // }, []);
  return (
    <div>
        <ProductContext.Provider value={{products, setProducts}}>
            {props.children}
        </ProductContext.Provider>
    </div>
  )
}

export default Context
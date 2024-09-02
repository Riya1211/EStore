import axios from '../utils/Axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading';
import { ProductContext } from '../utils/Context';
import { toast } from 'react-toastify';

const Details = () => {
    const navigate = useNavigate();
    // To get the newly added product.
    const { products, setProducts } = useContext(ProductContext);
 
    // Now I need to save that data so that I can use it.
    const [product, setProduct] = useState(null);

    // getting id from useParams as in the url you can see the id
    const { id } = useParams();

    // From that id I am getting that product details
    // This code I have commented out because the data is getting from the static api. Where I can't get the newly added products.
    // const getSingleProduct = async () => {
    //     try {
    //         const {data} = await axios.get(`/products/${id}`);
    //         setProduct(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    useEffect(() => {
        // getSingleProduct();
        if(!product){
            setProduct(products.filter((p) => p.id == id)[0]);
        }
    }, []);

    const ProductDeleteHandler = (id) => {
        const FilteredProducts = products.filter((p) => p.id !== id);
        setProducts(FilteredProducts);
        localStorage.setItem('products', JSON.stringify(FilteredProducts));
        toast.success('Product deleted successfully')
        navigate('/');
    }
  return product ? (
    <div className='w-[80%] h-full flex justify-between items-center h-full m-auto p-[10%]'>
        <img className='w-[45%] h-[75%] object-contain' src={product.image} alt="" />
        <div className='content w-[50%]'>
            <h1 className='text-4xl'>{product.title}</h1>
            <h3 className='text-zinc-400 my-5'>{product.category}</h3>
            <h2 className='text-red-300 mb-3'>$ {product.price}</h2>
            <p className='mb-5'>{product.description}</p>
            <Link to={`/edit/${product.id}`} className="py-2 px-5 border rounded border-blue-200 text-blue-300 mr-5">Edit</Link>
            <button onClick={() => ProductDeleteHandler(product.id)} className="py-2 px-5 border rounded border-red-200 text-red-300">Delete</button>
        </div>
    </div>
  ) : ( <Loading />)
}

export default Details
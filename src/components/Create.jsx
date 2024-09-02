import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {

    const navigate = useNavigate();

    const {products, setProducts} = useContext(ProductContext);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const AddProductHandler = (e) =>{
        e.preventDefault();

        const product ={
            id: nanoid(),
            title,
            image,
            category,
            price,
            description,
        };
        setProducts([...products, product]);
        // The reason i have stringify is because the loacal storage wants the data in string and if I have only passed the products then because os async nature the updation of the code get delayed that is why I have use [...products, product]
        localStorage.setItem('products', JSON.stringify([...products, product]));
        toast.success('Product added successfully')
        navigate('/');

    }
  return (
    <form onSubmit={AddProductHandler} className='p-[5%] w-screen h-screen flex flex-col items-center'>
        <h1 className='w-1/2 mb-3 text-3xl'>Add New Product</h1>
        <input required type="text" placeholder="Title" className='text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3' onChange={(e) => setTitle(e.target.value)} value={title}/>
        <input required type="url" placeholder="Image link" className='text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3' onChange={(e) => setImage(e.target.value)} value={image}/>

        <div className='w-1/2 flex justify-between'>
            <input required type="text" placeholder="Category" className='text-1xl bg-zinc-100 p-3 w-[48%] rounded mb-3' onChange={(e) => setCategory(e.target.value)} value={category}/>
            
            <input required type="number" placeholder="Price" className='text-1xl bg-zinc-100 p-3 w-[48%] rounded mb-3' onChange={(e) => setPrice(e.target.value)} value={price}/>
        </div>

        <textarea required rows='10' placeholder='Add Description' className='text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

        <div className='w-1/2'>
            <button className="py-2 px-5 border rounded border-blue-200 text-blue-300"
            href="/create">
                Add New Product
            </button>
        </div>

    </form>
  )
}

export default Create
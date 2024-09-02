import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
    const {products, setProducts} = useContext(ProductContext);
    const navigate = useNavigate();

    const {id} = useParams();

    const [product, setProduct] = useState({
        title: '',
        image: '',
        category: '',
        price: '',
        description: '',
    });
    
    // This shows error that is why we'll do the 2 way binding but with different wa in above code.
    // const [title, setTitle] = useState('');
    // const [image, setImage] = useState('');
    // const [category, setCategory] = useState('');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState('');

    const ChangeHandler = (e) => {
        setProduct({...product, [e.target.name]: e.target.value })
    } 
    const AddProductHandler = (e) =>{
        e.preventDefault();

        const pI = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pI] = {...products[pI], ...product};
        setProducts(copyData);
        localStorage.setItem('products', JSON.stringify(copyData));
        toast.success('Product edit successfully')
        navigate(-1);

        
        // const product ={
        //     id: nanoid(),
        //     title,
        //     image,
        //     category,
        //     price,
        //     description,
        // };
        // setProducts([...products, product]);
        // // The reason i have stringify is because the loacal storage wants the data in string and if I have only passed the products then because os async nature the updation of the code get delayed that is why I have use [...products, product]
        // localStorage.setItem('products', JSON.stringify([...products, product]));
        // navigate('/');

    }

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    }, [id])
  return (
    <form
      onSubmit={AddProductHandler}
      className="p-[5%] w-screen h-screen flex flex-col items-center"
    >
      <h1 className="w-1/2 mb-3 text-3xl">Edit Product</h1>
      <input
        required
        type="text"
        placeholder="Title"
        className="text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3"
        name='title'
        onChange={ChangeHandler}
        value={product && product.title}
      />
      <input
        required
        type="url"
        placeholder="Image link"
        className="text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3"
        name='image'
        onChange={ChangeHandler}
        value={product && product.image}
      />

      <div className="w-1/2 flex justify-between">
        <input
          required
          type="text"
          placeholder="Category"
          className="text-1xl bg-zinc-100 p-3 w-[48%] rounded mb-3"
          name='category'
          onChange={ChangeHandler}
          value={product && product.category}
        />

        <input
          required
          type="number"
          placeholder="Price"
          className="text-1xl bg-zinc-100 p-3 w-[48%] rounded mb-3"
          name='price'
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>

      <textarea
        required
        rows="10"
        placeholder="Add Description"
        className="text-1xl bg-zinc-100 p-3 w-1/2 rounded mb-3"
        name='description'
        onChange={ChangeHandler}
        value={product && product.description}
      ></textarea>

      <div className="w-1/2">
        <button
          className="py-2 px-5 border rounded border-blue-200 text-blue-300"
          href="/create"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;

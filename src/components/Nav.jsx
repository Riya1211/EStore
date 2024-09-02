import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
   const {products} = useContext(ProductContext);

   let distinctCategory = products && products.reduce((acc, cv) =>[...acc, cv.category],[]);

   //Set means it ia a set of unique collections in this case it is categories
   distinctCategory = [...new Set(distinctCategory)];

   // Different color in bullet points
   const color = () =>{
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()})`
   };
  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-200 text-blue-300"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3">Category Filter</h1>
      <div className="w-[80%]">
        {distinctCategory.map((category, index) => {
           return <Link key={index} to={`/?category=${category}`} className="mb-3 flex items-center">
            <span style={{backgroundColor: color()}} className="mr-2 w-[15px] h-[15px] rounded-full"></span>
            {category}
            </Link>
        })}
      </div>
    </nav>
  );
};

export default Nav;

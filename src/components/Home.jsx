import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
    const {products} =  useContext(ProductContext);

    const [filteredProducts, setFilteredProducts] = useState(null);

    // Categories name are shown in the URL which can be accessed by useLocation().
    const {search} = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);

    // const getProductsCategory = async () => {
    //     try {
    //         const {data} = await axios.get(`/products/category/${category}`);
    //         setFilteredProducts(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        if(!filteredProducts || category == 'undefined') {
            setFilteredProducts(products);
        }
        if(category != 'undefined') {
            // getProductsCategory();
            setFilteredProducts(products.filter(p => p.category == category));
        }
    }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        
        {filteredProducts && filteredProducts.map((product, i) => {
            return(
                <Link key={product.id} to={`/details/${product.id}`} className="card mr-3 mb-3 flex flex-col justify-center items-center w-[18%] h-[30vh] p-3 border shadow rounded">
                <div
                  className="hover:scale-110 w-full h-[80%] mb-3 bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      `url(${product.image})`,
                  }}
                ></div>
                <h1 className="hover:text-blue-300">{product.title}</h1>
              </Link>
            )
        })}
        

      </div>
    </>
  ) : ( <Loading /> );
};

export default Home;

import React, { useEffect, useState } from "react";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
const Shop = () => {
  const [products,setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(()=> {
fetch('https://blueberry-pie-66457.herokuapp.com/products')
.then(res => res.json())
.then(data => setProducts(data))
  },[])
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if(products.length > 0){
      const previousCart = productKeys.map((existingKey) => {
        const product = products.find((pd) => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
      });
      setCart(previousCart);
    }
   
  }, [products]);
  const handleAdd = (product) => {
    // console.log(product);
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          products.length ===0 && <p>Loading.........</p>
        //    <Spinner animation="border" role="status">
        //   <span className="sr-only">Loading...</span>
        // </Spinner>
        }
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAdd={handleAdd}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;

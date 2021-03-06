import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product,setProduct]=useState({})
  useEffect(() => {
    fetch("https://blueberry-pie-66457.herokuapp.com/product/"+productKey)
    .then(res => res.json())
    .then(data =>setProduct(data))
  },[product])
  // const product = fakeData.find((pd) => pd.key === productKey);
  // console.log(product);
  return (
    <div>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;

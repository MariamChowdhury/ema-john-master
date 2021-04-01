import React from 'react';
import fakeData from "../../fakeData";
const Inventory = () => {
  const handleAddProducts=() => {
    fetch('http://localhost:3000/addProduct',{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(fakeData)
    })
  }
  return (
    <div>
      <button onClick={handleAddProducts()}>Add Products</button>
    </div>
  );
};

export default Inventory;
import React from "react";

const ReviewItem = (props) => {
  // console.log(props)
  const { name, quantity, key,price } = props.product;
  const reviewStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewStyle} >
      <h3 className="product-name">{name}</h3>
      <p>Quantity: {quantity}</p>
      <p><small>Price: {price}</small></p>
      <br />
      <button onClick={() => props.handleRemoveProduct(key)} className="button">
        {" "}
        Remove Item{" "}
      </button>
    </div>
  );
};

export default ReviewItem;

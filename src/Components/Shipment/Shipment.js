import React from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { useContext } from "react/cjs/react.development";
import "./Shipment.css";
const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="Name"
      />
      {errors.name && <span className="error">Name is required</span>}
      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Email"
      />
      {errors.email && <span className="error">Email is required</span>}
      <input
        name="number"
        ref={register({ required: true })}
        placeholder="Phone Number"
      />
      {errors.number && <span className="error">Phone Number is required</span>}
      <input
        name="add"
        ref={register({ required: true })}
        placeholder="Address"
      />
      {errors.add && <span className="error">Address is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;

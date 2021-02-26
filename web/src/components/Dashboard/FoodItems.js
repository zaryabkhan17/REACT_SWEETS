import React, { useState } from "react";
import "./Dashboard.css";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const FoodItems = ({ name, amount, image, quantity }) => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [addedToCard, setAddedToCart] = useState(false);
  const [cartText, setCartText] = useState("Add");
  const AddToCart = () => {
    const items = { name: name, amount: amount, quantity: quantity };
    setAddedToCart(true);
    setCartText("Added to cart");
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [...globalState.cart, items],
    }));
  };
  console.log(globalState.cart.length);

  return (
    <div className="foodCard">
      <img src={image} alt="food" height="150px" width="150px" />
      <h2>{name}</h2>
      <p>{amount}rs</p>
      <button disabled={addedToCard} onClick={AddToCart}>
        {cartText}
      </button>
    </div>
  );
};

export default FoodItems;

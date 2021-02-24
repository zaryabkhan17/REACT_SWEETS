import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";
import "./Dashboard.css";
import FoodItems from "./FoodItems";

const Dashboard = () => {
  const globalState = useGlobalState();

  const foodItems = [
    {
      foodName: "Rasmalai",
      amount: 200,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGjmx-CquTeRckv3Xt399f0Ve8NVOlK08N8Q&usqp=CAU",
    },
    {
      foodName: "Rabri",
      amount: 500,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZMFc6aP3QZmMC1RyYo5cHVw1YORqnjPXmig&usqp=CAU",
    },
    {
      foodName: "Qalaqand",
      amount: 300,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFvArX-Az0j0Zq7Npks3-QY-wN-7pRFJLwnQ&usqp=CAU",
    },
    {
      foodName: "Multani halwa",
      amount: 400,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mvO4kQM4qv7zciUmNGVH03irQkVM0vbe0g&usqp=CAU",
    },
  ];
  console.log(globalState);
  return (
    <div>
      {globalState.user && <h1>Welcome {globalState.user.name} </h1>}

      <div className="foodContainer">
        {foodItems.map((food, i) => {
          return (
            <FoodItems
              name={food.foodName}
              amount={food.amount}
              quantity={food.quantity}
              image={food.image}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

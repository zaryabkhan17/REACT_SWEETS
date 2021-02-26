import React, { useState } from "react";

import { Table, Button } from "react-bootstrap";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";
import e from "cors";

const Cart = () => {
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [enough, setEnough] = useState(false);
  const placeOrder = () => {
    axios({
      method: "post",
      url: `${url}/placeorder`,
      data: {
        order: globalState.cart,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data.yourOrder);
      })
      .catch((err) => console.log(err));
  };

  const removeItem = (e) => {
    setItemQuantity(--e.quantity);
    console.log(--e.quantity);
  };
  const addItem = (e) => {
    setItemQuantity(++e.quantity);
    

    console.log(++e.quantity);
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Sweet</th>
            <th>Quantity (kg)</th>
            <th>Amount (PKR)</th>
          </tr>
        </thead>
        {globalState.cart.map((v, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>{v.name}</td>
                <td>
                  <Button
                    variant="outline-info"
                    disabled={enough}
                    onClick={() => removeItem(v)}
                  >
                    -
                  </Button>{" "}
                  {itemQuantity}{" "}
                  <Button variant="outline-info" onClick={() => addItem(v)}>
                    +
                  </Button>
                </td>
                <td>{v.amount}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <button onClick={placeOrder}>Order</button>
    </div>
  );
};

export default Cart;

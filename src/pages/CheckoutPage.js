import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalCost(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePayment = () => {
    if (totalCost > 50) {
      alert("Payment Successful!");
      localStorage.removeItem("cart");
      navigate("/payment/success");
    } else {
      alert("Payment Failed! Total amount must be above $50.");
      navigate("/payment/failure");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "200px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  height: "auto",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h3 style={{ fontSize: "1em", margin: "0.5em 0" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                  ${item.price}
                </p>
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{
                    padding: "5px 10px",
                    marginTop: "10px",
                    backgroundColor: "#ff6347",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div
            style={{ marginTop: "20px", fontSize: "1.2em", fontWeight: "bold" }}
          >
            Total Cost: ${totalCost.toFixed(2)}
          </div>
          <button
            onClick={handlePayment}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Pay
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CheckoutPage;

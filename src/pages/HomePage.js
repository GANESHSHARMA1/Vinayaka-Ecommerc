import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/checkout/1");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Vinayka Store</h1>
        <p>Your one-stop shop for the best products at amazing prices.</p>
        <h3>Our Top Products</h3>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
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
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "300px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "1em", margin: "0.5em 0" }}>
              {product.title}
            </h3>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              {product.description.length > 100
                ? `${product.description.slice(0, 100)}...`
                : product.description}
            </p>
            <p style={{ fontSize: "1.1em", fontWeight: "bold" }}>
              ${product.price}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                padding: "10px 15px",
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/products/1" style={{ marginRight: "1rem" }}>
        Product Detail
      </Link>
      <Link to="/checkout/1" style={{ marginRight: "1rem" }}>
        Checkout
      </Link>
      <Link to="/payment/success" style={{ marginRight: "1rem" }}>
        Payment Success
      </Link>
      <Link to="/payment/failure">Payment Failure</Link>
    </nav>
  );
};

export default Navbar;

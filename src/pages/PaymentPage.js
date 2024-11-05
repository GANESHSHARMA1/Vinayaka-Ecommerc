import React from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { status } = useParams();

  return (
    <div>
      <h1>Payment {status === "success" ? "Successful" : "Failed"}</h1>
      {status === "success" ? (
        <p>Thank you for your purchase!</p>
      ) : (
        <p>Payment was not successful. Please try again.</p>
      )}
    </div>
  );
};

export default PaymentPage;

import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/55 (49) 9 2901-2009" 
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: "1000",
      }}
    >
      💬
    </a>
  );
};

export default WhatsAppButton;

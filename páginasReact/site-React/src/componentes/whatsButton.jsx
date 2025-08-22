const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/554929012009" 
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "5vh",
        right: "5vh",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "4vw",
        height: "4vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "5vh",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: "1000",
      }}
      aria-label="Fale conosco pelo WhatsApp" 
    >
      🗣
    </a>
  );
};

export default WhatsAppButton;



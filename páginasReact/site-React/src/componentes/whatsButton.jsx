const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/554929012009"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "clamp(50px, 8vw, 70px)", 
        height: "clamp(50px, 8vw, 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(20px, 4vw, 32px)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: "1000",
        transition: "transform 0.2s ease-in-out",
      }}
      aria-label="Fale conosco pelo WhatsApp"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      🗣
    </a>
  );
};

export default WhatsAppButton;




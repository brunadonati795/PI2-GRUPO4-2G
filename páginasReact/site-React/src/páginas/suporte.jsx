import qrcode from "../assets/imagens/suporte-qrcode.jpg";
import Footer from "../componentes/footer";

const Suporte = () => {
  return (
    <div className="Suporte">
      <div className="containerSuporte">
        <section className="support-section">
          <h1 className="titulo">SUPORTE RENASSOL</h1>
          <h2>Estamos aqui para ajudar você!</h2>

          <div className="support-message">
            <p>
               Para um suporte técnico especializado em energia solar, escaneie o QR code abaixo para falar conosco no WhatsApp:
            </p>
          </div>

           <img
            src={qrcode}
            alt="QR Code de Suporte"
            className="qr-code" />
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Suporte;

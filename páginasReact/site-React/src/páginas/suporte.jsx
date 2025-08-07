import Header from "../componentes/header";
import qrcode from "../assets/imagens/suporte-qrcode.jpg";

const Suporte = () => {
  return (
    <div className="suporteBox">
      <Header/>
      <header>
        <h1>Suporte Renassol</h1>
      </header>

      <div className="container">
        <section className="support-section">
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
    </div>
  );
};

export default Suporte;

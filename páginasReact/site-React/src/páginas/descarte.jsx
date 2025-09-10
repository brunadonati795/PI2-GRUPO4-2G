import descarte from '../assets/imagens/descarte-imagem.png';
import Footer from '../componentes/footer';

const Descarte = () => {
  return (
    <div className="Descarte">
      <h1 className="tituloDescarte">Descarte de Placas Solares</h1>

      <div className="info-container">
        <div className="textoDescarte">
          <p>
            Nós da Renassol, ajudamos você a descartar suas placas solares e realizamos sua reciclagem,
            garantindo o destino correto para elas. <strong>Informe-nos seu endereço para buscarmos suas placas.</strong>
          </p>
        </div>

        <div className="imagemDescarte">
          <img
            src={descarte}
            alt="descarte"
          />
        </div>
      </div>

      <div className="botao-formulario">
        <button className="btn-formulario">Acessar Formulário</button>
        <a href="URL_DE_DESTINO"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdMQdX301I2T7vZiBLj0BnhRnIssApu_-lPbOzPwnBghlAdcQ/viewform?embedded=true" width="640" height="422" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe></a>
      </div>
    </div>
  );
};

export default Descarte;
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
          <button className='btn-formulario' onClick={() => handleClick("/cadastro")}>Suporte</button>
      </div>
    </div>
  );
};

export default Descarte;
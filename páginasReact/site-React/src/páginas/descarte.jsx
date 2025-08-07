import Header from "../componentes/header";
import descarte from '../assets/imagens/descarte-imagem.png';

const Descarte = () => {
  return (
    <div className="Descarte">
      <Header/>
      <h1 className="titulo">Descarte de Placas Solares</h1>

      <div className="info-container">
        <div className="texto">
          <p>
            Nós, da Renassol, ajudamos você a descartar suas placas solares e realizamos sua reciclagem,
            garantindo o destino correto para elas.<br /><br />
            Informe-nos seu endereço para buscarmos suas placas.
          </p>
        </div>

        <div className="imagem">
          <img
            src={descarte}
            alt="descarte"
          />
        </div>
      </div>

      <div className="botao-formulario">
        <button className="btn-formulario">Acessar Formulário</button>
      </div>
    </div>
  );
};

export default Descarte;
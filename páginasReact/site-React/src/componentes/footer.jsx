import { Link } from 'react-router-dom';

import whatsappIcon from '../assets/imagens/rodapewhats.png';
import linkedinIcon from '../assets/imagens/rodapelinkedin.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="elementos1">
        <h3>Renassol</h3>
        <div className="icones">
          <img src={whatsappIcon} alt="whatsapp" />
          <img src={linkedinIcon} alt="linkedin" />
        </div>
      </div>

      <div className="coluna1">
        <Link to="/nossa-empresa">Nossa empresa</Link>
        <Link to="/importancia">Importância</Link>
        <Link to="/opcoes">Opções</Link>
        <Link to="/componentes">Componentes</Link>
        <Link to="/descarte">Descarte</Link>
      </div>

      <div className="coluna2">
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/finalizar-compra">Finalizar compra</Link>
        <Link to="/api">API</Link>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import "../App.css";
import logoAmarela from '../assets/imagens/logoAmarela.png';
import Funcionamento from "../páginas/funcionamento";
import Suporte from "../páginas/suporte";
import Descarte from "../páginas/descarte";
import Opcoes from "../páginas/opcoes.jsx";

const Footer = () => {
  return (
    <footer className="ftr_container">
      <div className="ftr_blocoPrincipal">
        <h3 className='ftr_titulo'>RENASSOL</h3>
        <img src={logoAmarela} className='ftr_logo' alt="Logo" />
      </div>

      <div className="ftr_colunaUm">
        <Link to="/nossa-empresa">Nossa empresa</Link>
        <Link to="/opcoes">Opções</Link>
        <Link to="/componentes">Componentes</Link>
        <Link to="/descarte">Descarte</Link>
      </div>

      <div className="ftr_colunaDois">
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/api">API</Link>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import "../App.css";
import logoAmarela from '../assets/imagens/logoAmarela.png'
import Funcionamento from "../páginas/funcionamento";
import Suporte from "../páginas/suporte";
import Descarte from "../páginas/descarte";
import Opcoes from "../páginas/opcoes.jsx";
// import Componentes from "../páginas/componentes.jsx";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="elementos1">
        <h3 className='footer-titulo'>RENASSOL</h3>
        <img src={logoAmarela} className='footerimg'/>
      </div>

      <div className="coluna1">
        <Link to="/nossa-empresa">Nossa empresa</Link>
        <Link to="/opcoes">Opções</Link>
        <Link to="/componentes">Componentes</Link>
        <Link to="/descarte">Descarte</Link>
      </div>

      <div className="coluna2">
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/api">API</Link>
      </div>
    </footer>
  );
};

export default Footer;

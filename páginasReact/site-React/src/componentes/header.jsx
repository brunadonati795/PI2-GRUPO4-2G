import { Link } from "react-router-dom";
import "../App.css";
import logoAmarela from '../assets/imagens/logoAmarela.png'

import Funcionamento from "../páginas/funcionamento";
import Suporte from "../páginas/suporte";
import Descarte from "../páginas/descarte";
import Opcoes from "../páginas/opcoes.jsx";
import Cadastro from "../páginas/cadastro.jsx";
import Componentes from "../páginas/componentes.jsx";
import usuariosImg from "../assets/imagens/usuário.png";

export default function Header() {
  return (
    <div className="cabeçalho">
      <Link to="/">
        <img
          className="logoAmarela"
          src={logoAmarela}
          alt="logoAmarela"
        />
      </Link>

      <div className="links">
        <Link to="/">Nossa Empresa</Link>
        <Link to="/opcoes">Opções</Link>
        <Link to="/funcionamento">Como funcionam?</Link>
        {/* <Link to="/api">Cálculo</Link> */}
        <Link to="/loja">Loja</Link>
        <Link to="/suporte">Suporte</Link>
        <Link to="/descarte">Descarte</Link>
      </div>

      <div className="usuário">
        <Link to="/cadastro">
        <img src={usuariosImg}
        alt="Usuário" /></Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import logoAmarela from '../assets/imagens/logoAmarela.png';
import usuariosImg from "../assets/imagens/usuário.png";
import Funcionamento from "../páginas/funcionamento";
import Suporte from "../páginas/suporte";
import Descarte from "../páginas/descarte";
import Opcoes from "../páginas/opcoes.jsx";
import Cadastro from "../páginas/cadastro.jsx";
import Componentes from "../páginas/componentes.jsx";


export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="czh_cabecalho">
      <Link to="/">
        <img className="lg_amarela" src={logoAmarela} alt="logoAmarela" />
      </Link>

      <div className={`lk_grupo ${menuAberto ? "ativo" : ""}`}>
        <Link to="/" onClick={() => setMenuAberto(false)}>Nossa Empresa</Link>
        <Link to="/opcoes" onClick={() => setMenuAberto(false)}>Opções</Link>
        <Link to="/funcionamento" onClick={() => setMenuAberto(false)}>O que são?</Link>
        <Link to="/loja" onClick={() => setMenuAberto(false)}>Loja</Link>
        <Link to="/suporte" onClick={() => setMenuAberto(false)}>Suporte</Link>
        <Link to="/descarte" onClick={() => setMenuAberto(false)}>Descarte</Link>
      </div>

      <div className="mn_trigger" onClick={() => setMenuAberto(!menuAberto)}>
        <div className="br"></div>
        <div className="br"></div>
        <div className="br"></div>
      </div>

      <div className="us_ico">
        <Link to="/cadastro">
          <img src={usuariosImg} alt="Usuário" />
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  return (
    <div className="cabeçalho">
      <Link to="/">
        <img
          className="logoAmarela"
          src="imagens/logoAmarela.png"
          alt="logoAmarela"
        />
      </Link>

      <div className="links">
        <Link to="/">Nossa Empresa</Link>

        <div className="menu-com-submenu">
          <Link to="#">Informativo</Link>
          <div className="submenu">
            <Link to="#">Como funcionam?</Link>
            <Link to="#">Componentes</Link>
          </div>
        </div>

        <Link to="/api">Cálculo</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/suporte">Suporte</Link>
        <Link to="/descarte">Descarte</Link>
      </div>

      <div className="usuário">
        <img src="imagens/usuário.png" alt="Usuário" />
      </div>
    </div>
  );
}

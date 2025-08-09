import { useNavigate } from "react-router-dom";
import bgImage from "../assets/imagens/bg.jpg"; 


const Opcoes = () => {
  const navigate = useNavigate();

  const handleClick = (rota) => {
    navigate(rota);
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="button-group">
        <button onClick={() => handleClick("/funcionamento")}>
          Comprando pela primeira vez?
        </button>
        <button onClick={() => handleClick("/loja")}>Loja</button>
        <button onClick={() => handleClick("/suporte")}>Suporte</button>
        <button onClick={() => handleClick("/descarte")}>Descarte</button>
      </div>
    </div>
  );
};

export default Opcoes;

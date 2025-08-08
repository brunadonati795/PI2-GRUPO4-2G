import '../App.css';
import bgImage from '../assets/imagens/bg.jpg';

const Opcoes = () => {
  const handleClick = (rota) => {
    console.log(`Usuário clicou em: ${rota}`);
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="button-group">
        <button onClick={() => handleClick('primeira-compra')}>Comprando pela primeira vez?</button>
        <button onClick={() => handleClick('loja')}>Loja</button>
        <button onClick={() => handleClick('suporte')}>Suporte</button>
        <button onClick={() => handleClick('descarte')}>Descarte</button>
      </div>
    </div>
  );
};

export default Opcoes;
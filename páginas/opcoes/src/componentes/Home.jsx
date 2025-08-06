// src/components/Home.jsx
import React from 'react';
import './Home.css';
import bgImage from '../../public/bg.jpg';

const Home = () => {
  // Placeholder para possível integração futura com Flask/PostgreSQL
  const handleClick = (rota) => {
    console.log(`Usuário clicou em: ${rota}`);
    // Futuro: redirecionar ou requisitar dados via API Flask
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

export default Home;

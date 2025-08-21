import React from 'react';
import { Link } from 'react-router-dom';

const BotaoVoltar = ({ to, imageSrc }) => {
  return (
    <Link to={to}>
      <button>
        <img src={imageSrc} alt="Voltar" style={{ width: '24px', height: '24px' }} />
      </button>
    </Link>
  );
};

export default BotaoVoltar;

import React from 'react';
import { Link } from 'react-router-dom';

const BotaoVoltar = ({ to }) => {
  return (
    <Link to={to}>
      <button>
        ⬅️ Voltar
      </button>
    </Link>
  );
};

export default BotaoVoltar;

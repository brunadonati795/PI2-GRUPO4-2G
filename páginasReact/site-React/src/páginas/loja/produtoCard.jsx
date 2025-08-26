import "./style.css";

import React from "react";

const ProductCard = ({ product, onClick, adicionarAoCarrinho, removerDoCarrinho }) => {
  return (
    <div className="store-card" onClick={() => onClick && onClick(product)}>
      <img
        src={product.image}
        alt={product.name || "Produto"}
        className="store-card-img"
      />
      <p className="store-card-name">{product.name || "Sem nome"}</p>
      <p className="store-card-price">
        R$ {product.preco !== undefined ? product.preco.toFixed(2) : "0.00"}
      </p>

      <div className="store-card-controls">
        <button
          className="store-btn store-btn-left"
          onClick={(e) => {
            e.stopPropagation(); // evita que abra o modal ao clicar no botão
            removerDoCarrinho && removerDoCarrinho();
          }}
        >
          -
        </button>

        <span className="store-quantity">{product.quantidade || 0}</span>

        <button
          className="store-btn store-btn-right"
          onClick={(e) => {
            e.stopPropagation(); // evita que abra o modal ao clicar no botão
            adicionarAoCarrinho && adicionarAoCarrinho();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

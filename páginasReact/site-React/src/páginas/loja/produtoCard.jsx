import { useState } from "react";
import "./style.css";

const ProductCard = ({ product, onClick }) => {
  const [quantidade, setQuantidade] = useState(0); // contador interno

  const adicionarAoCarrinho = () => {
    setQuantidade((prev) => prev + 1);
  };

  const removerDoCarrinho = () => {
    setQuantidade((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="store-card" onClick={() => onClick && onClick(product)}>
      <img
        src={product.image ? `images/${product.image}` : ""}
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
            e.stopPropagation();
            removerDoCarrinho();
          }}
        >
          -
        </button>

        <span className="store-quantity">{quantidade}</span>

        <button
          className="store-btn store-btn-right"
          onClick={(e) => {
            e.stopPropagation();
            adicionarAoCarrinho();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

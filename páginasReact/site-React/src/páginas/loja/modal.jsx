import "./style.css";

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="store-modal-backdrop" onClick={onClose}>
      <div className="store-modal" onClick={e => e.stopPropagation()}>
        <button className="store-close-btn" onClick={onClose}>×</button>

        <h2 className="store-modal-title">{product.nome}</h2>

        <img src={product.imagem_url} alt={product.nome} className="store-modal-img" />

        <p className="store-modal-description">
          {product.descricao || "Sem descrição disponível"}
        </p>

        <p className="store-modal-price">
          <strong>Preço:</strong> R$ {product.preco.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Modal;

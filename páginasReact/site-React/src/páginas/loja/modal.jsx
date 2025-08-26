import "./style.css";

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="store-modal-backdrop" onClick={onClose}>
      <div className="store-modal" onClick={e => e.stopPropagation()}>
        <button className="store-close-btn" onClick={onClose}>×</button>

        <h2 className="store-modal-title">{product.name}</h2>

        <img src={product.image} alt={product.name} className="store-modal-img" />

        {/* Se storeData tiver descrição, use product.description */}
        <p className="store-modal-description">{product.description || "Sem descrição disponível"}</p>

        {/* Preço real do produto */}
        <p className="store-modal-price">
          <strong>Preço:</strong> R$ {product.preco.toFixed(2)}
        </p>
      </div>
    </div>
  );
};


export default Modal;

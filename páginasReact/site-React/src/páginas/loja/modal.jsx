import "./style.css";

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="store-modal-backdrop" onClick={onClose}>
      <div className="store-modal" onClick={e => e.stopPropagation()}>
        <button className="store-close-btn" onClick={onClose}>×</button>
        <h2 className="store-modal-title">{product.name}</h2>
        <img src={`images/${product.image}`} alt={product.name} className="store-modal-img" />
        <p className="store-modal-description">{product.description}</p>
        <p className="store-modal-price"><strong>Preço:</strong> R$ XX,XX</p>
      </div>
    </div>
  );
};

export default Modal;

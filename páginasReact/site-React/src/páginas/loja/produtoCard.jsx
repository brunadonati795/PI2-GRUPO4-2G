import "./style.css";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="store-card" onClick={() => onClick(product)}>
      <img src={`images/${product.image}`} alt={product.name} className="store-card-img" />
      <p className="store-card-name">{product.name}</p>
      <p className="store-card-price">R$ XX,XX</p>
      <div className="store-card-controls">
        <button className="store-btn">-</button>
        <div className="store-progress-bar">
          <div className="store-fill"></div>
        </div>
        <button className="store-btn">+</button>
      </div>
    </div>
  );
};

export default ProductCard;
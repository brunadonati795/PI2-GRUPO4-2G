import { useState } from "react";
import { storeItems } from "./storeData.js";
import ProductCard from "./produtoCard.jsx";
import Modal from "./modal.jsx";
import "./style.css";

const Loja = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loja = storeItems.filter(p => p.category === "loja");
  const placas = storeItems.filter(p => p.category === "placas");

  return (
    <div className="store-container">
      <h1 className="store-title">LOJA - PLACAS SOLARES</h1>
      <div className="store-grid">
        {placas.map(product => (
          <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
        ))}
      </div>
      
      <h1 className="store-title">ACESSÓRIOS</h1>
      <div className="store-grid">
        {loja.map(product => (
          <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
        ))}
      </div>

      <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Loja;

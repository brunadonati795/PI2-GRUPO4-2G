import { useState } from "react";
import { storeItems } from "./storeData.js";
import ProductCard from "./produtoCard.jsx";
import Modal from "./modal.jsx";
import "./style.css";

const Loja = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]); // Array de produtos no carrinho

  const loja = storeItems.filter(p => p.category === "loja");
  const placas = storeItems.filter(p => p.category === "placas");

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setItensDoCarrinho([...itensDoCarrinho, produto]);
  };

  return (
    <>
      {/* Botão do carrinho */}
      {!carrinhoAberto && (
        <img
          src="/assets/carrinho-iconedoCarrinho.png"
          alt="Abrir Carrinho"
          className="imagem-botao"
          onClick={() => setCarrinhoAberto(true)}
        />
      )}

      {/* Carrinho lateral */}
      {carrinhoAberto && (
        <div className="carrinho">
          <button
            className="fechar-carrinho"
            onClick={() => setCarrinhoAberto(false)}
          >
          X
          </button>
          <h2>Seu carrinho está vazio </h2>

          {itensDoCarrinho.length === 0 ? (
            <p>Você ainda não adicionou algo ao seu carrinho</p>
          ) : (
            <ul>
              {itensDoCarrinho.map((item, index) => (
                <li key={index}>{item.nome}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Conteúdo da loja */}
      <div className="store-container">
        <h1 className="store-title">LOJA - PLACAS SOLARES</h1>
        <div className="store-grid">
          {placas.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={setSelectedProduct}
              adicionarAoCarrinho={() => adicionarAoCarrinho(product)}
            />
          ))}
        </div>

        <h1 className="store-title">ACESSÓRIOS</h1>
        <div className="store-grid">
          {loja.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={setSelectedProduct}
              adicionarAoCarrinho={() => adicionarAoCarrinho(product)}
            />
          ))}
        </div>

        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </>
  );
};

export default Loja;



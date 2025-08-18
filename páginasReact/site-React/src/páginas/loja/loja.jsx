import { useState } from "react";
import { storeItems } from "./storeData.js";
import ProductCard from "./produtoCard.jsx";
import Modal from "./modal.jsx";
import "./style.css";

const Loja = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]); 

  const loja = storeItems.filter(p => p.category === "loja");
  const placas = storeItems.filter(p => p.category === "placas");

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
  const produtoExistente = itensDoCarrinho.find(item => item.id === produto.id);

  if (produtoExistente) {
    setItensDoCarrinho(itensDoCarrinho.map(item =>
      item.id === produto.id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    ));
  } else {
    setItensDoCarrinho([...itensDoCarrinho, { ...produto, quantidade: 1 }]);
  }
};

// Função para remover 1 unidade (ou todo o produto, se quantidade = 1)
const removerDoCarrinho = (produtoId) => {
  setItensDoCarrinho(itensDoCarrinho.map(item =>
    item.id === produtoId
      ? { ...item, quantidade: item.quantidade - 1 }
      : item
  ).filter(item => item.quantidade > 0));
};

// Cálculo do total geral
const totalGeral = itensDoCarrinho.reduce(
  (acc, item) => acc + item.preco * item.quantidade, 
  0
);

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

      {carrinhoAberto && (
    <div className={`carrinho ${carrinhoAberto ? "ativo" : ""}`}>
    <button
      className="fechar-carrinho"
      onClick={() => setCarrinhoAberto(false)}
    >
      ✕
    </button>
    <h2>Seu Carrinho</h2>

    {itensDoCarrinho.length === 0 ? (
      <p>Você ainda não adicionou algo ao seu carrinho</p>
    ) : (
      <>
        <ul className="carrinho-lista">
          {itensDoCarrinho.map((item) => (
            <li key={item.id} className="carrinho-item">
              <img src={item.image} alt={item.name} className="carrinho-img" />
              <div className="carrinho-info">
                <h3>{item.nome}</h3>
                <p>Preço: R$ {item.preco.toFixed(2)}</p>
                <div className="carrinho-controles">
                  <button onClick={() => removerDoCarrinho(item.id)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => adicionarAoCarrinho(item)}>+</button>
                </div>
                <p>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Total Geral */}
        <div className="carrinho-total">
          <h3>Total da Compra: R$ {totalGeral.toFixed(2)}</h3>
          <button className="finalizar-btn">Finalizar Compra</button>
        </div>
      </>
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
              removerDoCarrinho={() => removerDoCarrinho(product.id)}
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
              removerDoCarrinho={() => removerDoCarrinho(product.id)}
            />
          ))}
        </div>

        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </>
  );
};

export default Loja;



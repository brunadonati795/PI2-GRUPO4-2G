import { useState, useEffect } from "react";
import ProductCard from "./produtoCard";
import Modal from "./modal";
import storeData from "./storeData";
import iconedocarrinho from "../../assets/imagens/iconedocarrinho.png";
import { Link } from "react-router-dom";

const Loja = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);

  const loja = storeData.filter(p => p.category === "loja");
  const placas = storeData.filter(p => p.category === "placas");

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setItensDoCarrinho(prevItens => {
      const produtoExistente = prevItens.find(item => item.id === produto.id);
      if (produtoExistente) {
        return prevItens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevItens, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Remover 1 unidade ou todo o produto
  const removerDoCarrinho = (produtoId) => {
    setItensDoCarrinho(prevItens =>
      prevItens
        .map(item =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
  };

  // Atualiza total geral automaticamente
  useEffect(() => {
    const novoTotal = itensDoCarrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    setTotalGeral(novoTotal);
  }, [itensDoCarrinho]);

  return (
    <>
      {/* Botão do carrinho */}
      {!carrinhoAberto && (
        <img
          src={iconedocarrinho}
          alt="Abrir Carrinho"
          className="imagem-carrinho"
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
                      <h3>{item.name}</h3>
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

              <div className="carrinho-total">
                <h3>Total da Compra: R$ {totalGeral.toFixed(2)}</h3>
                <Link to="/cadastro"><button className="finalizar-btn">Finalizar Compra</button></Link>
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
              product={{
              ...product,
              quantidade: itensDoCarrinho.find(item => item.id === product.id)?.quantidade || 0
            }}
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
              product={{
              ...product,
              quantidade: itensDoCarrinho.find(item => item.id === product.id)?.quantidade || 0
            }}
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

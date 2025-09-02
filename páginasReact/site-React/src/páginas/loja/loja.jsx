import { useState, useEffect } from "react";
import ProductCard from "./produtoCard";
import Modal from "./modal";
import iconedocarrinho from "../../assets/imagens/iconedocarrinho.png";
import { Link } from "react-router-dom";

const Loja = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);

  // Busca produtos do back-end
  useEffect(() => {
    fetch("http://localhost:5000/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

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

  // Remover produto do carrinho
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

  // Atualiza total automaticamente
  useEffect(() => {
    const novoTotal = itensDoCarrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    setTotalGeral(novoTotal);
  }, [itensDoCarrinho]);

  // Separando categorias dinamicamente
  const placas = produtos.filter(p => p.categoria === "placas");
  const loja = produtos.filter(p => p.categoria === "loja");

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
                    <img src={item.imagem_url} alt={item.nome} className="carrinho-img" />
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

              <div className="carrinho-total">
                <h3>Total da Compra: R$ {totalGeral.toFixed(2)}</h3>
                <Link to="/confirmacaodepagamento">
                  <button className="finalizar-btn">Finalizar Compra</button>
                </Link>
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
                name: product.nome,
                image: product.imagem_url,  
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
                name: product.nome,
                image: product.imagem_url,  
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

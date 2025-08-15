import React from "react";
import "./All.css";
import iconedoCarrinho from '../assets/imagens/carrinho-iconedoCarrinho'

export default function Loja() {
  const produtos = [
    { nome: "Acessório para fixação vertical", img: "link-da-imagem" },
    { nome: "Barra de estrutura", img: "link-da-imagem" },
    { nome: "Estrutura para solo", img: "link-da-imagem" },
    { nome: "Fixador de grampo", img: "link-da-imagem" },
    { nome: "Conector em grampos", img: "link-da-imagem" },
    { nome: "Junção", img: "link-da-imagem" },
    { nome: "Junção em U", img: "link-da-imagem" },
    { nome: "Placas para piscina", img: "link-da-imagem" },
    { nome: "Suporte central", img: "link-da-imagem" },
    { nome: "Braceadeira", img: "link-da-imagem" },
  ];

  const placas = [
    { nome: "Orgânicos", img: "link-da-imagem" },
    { nome: "Perovskita", img: "link-da-imagem" },
    { nome: "Disci", img: "link-da-imagem" },
  ];

  return (
    <img 
  src={iconedoCarrinho} 
  alt="Abrir Carrinho" 
  width="40" 
  className="imagem-botao"
  onClick={() => console.log("Imagem clicada!")} 
/>

    <div className="section-container">
      <h1>LOJA</h1>
      <div className="itens-mostruario-principal">
        {produtos.map((item, index) => (
          <div key={index} className="produto-card">
            <img src={item.img} alt={item.nome} />
            <p>{item.nome}</p>
            <div className="preco">R$ XX,XX</div>
            <button className="botao-add">+</button>
          </div>
        ))}
      </div>

      <h1>PLACAS SOLARES</h1>
      <div className="itens-mostruario-principal">
        {placas.map((item, index) => (
          <div key={index} className="produto-card">
            <img src={item.img} alt={item.nome} />
            <p>{item.nome}</p>
            <div className="preco">R$ XX,XX</div>
            <button className="botao-add">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

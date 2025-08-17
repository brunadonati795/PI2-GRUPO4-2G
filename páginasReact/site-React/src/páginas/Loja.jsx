import React from "react";
import "./All.css";

import iconedocarrinho from "../assets/imagens/iconedocarrinho.png";
import lojaacessorioparafixacaovertical from "../assets/imagens/lojaacessorioparafixacaovertical.jpg";
import lojabarraestrutura from "../assets/imagens/lojabarraestrutura.webp";
import lojabracadeira from "../assets/imagens/lojabracadeira.jpg";
import lojaestruturasolo from "../assets/imagens/lojaestruturasolo.webp";
import lojafixadorgrampo from "../assets/imagens/lojafixadorgrampo.webp";
import lojagrampoplaca from "../assets/imagens/lojagrampoplaca.webp";
import lojajuncao from "../assets/imagens/lojajuncao.webp";
import lojajuncaoemu from "../assets/imagens/lojajuncaoemu.webp";
import lojaplacasparapiscina from "../assets/imagens/lojaplacasparapiscina.webp";
import lojasuportecentral from "../assets/imagens/lojasuportecentral.webp";

export default function Loja() {
  const produtos = [
    { nome: "Acessório para fixação vertical", img: lojaacessorioparafixacaovertical },
    { nome: "Barra de estrutura", img: lojabarraestrutura },
    { nome: "Estrutura para solo", img: lojaestruturasolo },
    { nome: "Fixador de grampo", img: lojafixadorgrampo },
    { nome: "Conector em grampos", img: lojagrampoplaca },
    { nome: "Junção", img: lojajuncao },
    { nome: "Junção em U", img: lojajuncaoemu },
    { nome: "Placas para piscina", img: lojaplacasparapiscina },
    { nome: "Suporte central", img: lojasuportecentral },
    { nome: "Braceadeira", img: lojabracadeira },
  ];

  const placas = [
    { nome: "Orgânicos", img: "link-da-imagem" },
    { nome: "Perovskita", img: "link-da-imagem" },
    { nome: "Disci", img: "link-da-imagem" },
  ];

  return (
    <>
      <img
        src={iconedocarrinho}
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
    </>
  );
}

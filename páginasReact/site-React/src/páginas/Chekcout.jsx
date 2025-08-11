import React from "react";
import "./All.css";

export default function Checkout() {
  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <strong>Endereço:</strong> Rua Exemplo 123 - Cidade/UF
      </div>

      <div className="checkout-box">
        <strong>Escolha quando sua compra chegará:</strong>
        <p>FULL: Segunda-feira — R$ 15,99</p>
        <p>NORMAL: Sexta-feira — GRÁTIS</p>
      </div>

      <div className="checkout-box">
        <strong>Forma de pagamento:</strong>
        <p>Pix</p>
      </div>

      <div className="checkout-precos">
        <p>Produto: R$ XX,XX</p>
        <p>Frete: GRÁTIS</p>
        <p><strong>TOTAL: R$ XX,XX</strong></p>
      </div>

      <div className="pix-box">
        <strong>Chave Pix:</strong> 00000000-0000-0000-0000-000000000000
      </div>
    </div>
  );
}

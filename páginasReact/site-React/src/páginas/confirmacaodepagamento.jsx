import "../App.css";
import imgSeta from "../assets/imagens/seta.png";
import { Link } from "react-router-dom";

let diaEntrega = "00/00/0000";
let valor = 0.0;

function ConfirmacaodePagamento() {
  return (
    <div className="confirmacao">
      <Link to="/loja" className="botao-voltar">
        <img src={imgSeta}></img>
      </Link>
      <section className="pagamento-bloco">
        <p><strong>Endereço:</strong><br />
        Rua: Elbert Ebert 108 99960-000 Charrua RS</p>
        <a href="/Usuario">editar meu endereço</a>
      </section>


      <section className="pagamento-bloco">
        <p><strong>Escolha qual frete você deseja:</strong></p>
      <div className="opcao-entrega">
        <label htmlFor="pagamento"><strong>Forma de pagamento:</strong></label><br />
        <select id="pagamento">
          <option>NORMAL: GRÁTIS; Data prevista: 16 dias úteis</option>
          <option>FULL: 54,00; Data prevista: 8 dias úteis</option>

        </select>
      </div>
      </section>

      <section className="pagamento-bloco">
        <label htmlFor="pagamento"><strong>Forma de pagamento:</strong></label><br />
        <select id="pagamento">
          <option>Pix</option>
          <option>Cartão de crédito</option>
          <option>Boleto</option>
        </select>
      </section>

      <section className="pagamento-bloco">
        <p><strong>Preços:</strong></p>
        <p><strong>Produto:</strong> <span className="valor-preco">R$ 308,00</span></p>
        <p><strong>Frete:</strong> <span className="valor-gratis">GRÁTIS</span></p>
        <p><strong><em>TOTAL:</em></strong> <span className="valor-preco">R$ 308,00</span></p>
      </section>

      <section className="pagamento-bloco secao-chave-pix">
        <p><strong>Chave pix:</strong></p>
        <div className="pix-detalhes">
          <span>8f3d19c2-4a5b-47e7-9a8f-12ec0a7b4d99</span>
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=8f3d19c2-4a5b-47e7-9a8f-12ec0a7b4d99" 
            alt="QR Code" 
          />
        </div>
      </section>
    </div>
  );
}

export default ConfirmacaodePagamento;
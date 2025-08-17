import "../App.css";
import lojaacessorioparafixaçãovertical from '../assets/imagens/lojaacessorioparafixaçãovertical'

export default function Produtos() {
  return (
    <div className="produto-detalhe-container">
      <div className="produto-detalhe-imagem">
        <img src={lojaacessorioparafixaçãovertical} alt="Acessório para fixação vertical" />
      </div>
      <div className="produto-detalhe-info">
        <h2>ACESSÓRIO PARA FIXAÇÃO VERTICAL</h2>
        <div className="preco">R$ XX,XX</div>
        <p>
          <strong>Produto:</strong> Suporte de fixação vertical para painel solar
        </p>
        <p>
          <strong>Aplicação:</strong> Instalação de placas solares em paredes ou
          superfícies verticais
        </p>
        <p>
          <strong>Material:</strong> Alumínio
        </p>
        <p>
          <strong>Instalação:</strong> Rápida e simples
        </p>
        <button className="botao-comprar">COMPRAR AGORA!</button>
      </div>
    </div>
  );
}

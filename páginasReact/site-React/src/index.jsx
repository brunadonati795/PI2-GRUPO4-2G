import Header from "./componentes/header";
import logoColorida from "../assets/imagens/logoAzul.png"

export default function PrimeiraPagina() {
  return (
    <>
      <Header/>
      <section className="banner">
        <div className="banner-content">
          <div className="fundoBrancoLogo">
            <img
              src={logoColorida}
              alt="Ícone painel"
              className="icone-banner"
            />
          </div>
          <div className="text-banner">
            <h1>Renassol</h1>
            <p>
              A Renassol tem o objetivo de contribuir para a mudança de matriz
              energética, ajudando os clientes a terem acesso a tecnologias
              sustentáveis e acessíveis e dando suporte da compra ao descarte.
            </p>
          </div>
        </div>
      </section>

      <section className="produtos">
        <h2 className="titulo">NOSSOS PRODUTOS:</h2>
        <p className="textoPosTitulo">
          Nossas placas foram pensadas para ajudar você a ajudar o mundo
        </p>
        <div className="produtos-container">
          <div className="card-produto">
            <h3>Placas orgânicas</h3>
            <img src="placa-organica.jpg" alt="Placa orgânica" />
            <p>
              Utilizam polímeros semicondutores. São leves, flexíveis e de
              baixo custo.
            </p>
          </div>

          <div className="card-produto">
            <h3>Placas de perovskita</h3>
            <img src="img/perovskita.png" alt="Placa de perovskita" />
            <p>
              Alta eficiência e baixo custo. Ainda enfrentam desafios quanto à
              durabilidade.
            </p>
          </div>

          <div className="card-produto">
            <h3>Placas DSSC</h3>
            <img src="img/dssc.png" alt="Placa DSSC" />
            <p>
              Inspiradas na fotossíntese. Funcionam bem em ambientes com baixa
              luz.
            </p>
          </div>
        </div>
        <p className="link-ajuda">
          Não sabe nada sobre o assunto?{" "}
          <a href="#"><i>Clique aqui!</i></a>
        </p>
      </section>

      <section className="vantagens">
        <h2 className="titulo">VANTAGENS</h2>
        <p>Além de ajudar o mundo, você é recompensado:</p>
        <div className="cards-grid">
          <div className="vantagem-card" style={{ animationDelay: "0s" }}>
            <h3>Sustentabilidade ambiental</h3>
            <p>
              A energia solar é limpa e renovável, ajudando a reduzir a emissão
              de poluentes.
            </p>
          </div>
          <div className="vantagem-card" style={{ animationDelay: "0.1s" }}>
            <h3>Redução da conta de energia</h3>
            <p>
              Os custos com energia diminuem bastante, podendo até gerar crédito
              com a concessionária.
            </p>
          </div>
          <div className="vantagem-card" style={{ animationDelay: "0.2s" }}>
            <h3>Valorização do imóvel</h3>
            <p>Casas com painéis solares têm maior valor de mercado.</p>
          </div>
          <div className="vantagem-card" style={{ animationDelay: "0.3s" }}>
            <h3>Baixa manutenção</h3>
            <p>
              Os sistemas exigem pouca manutenção e têm alta durabilidade.
            </p>
          </div>
          <div className="vantagem-card" style={{ animationDelay: "0.4s" }}>
            <h3>Independência energética</h3>
            <p>
              Menor dependência de concessionárias e aumento da autonomia.
            </p>
          </div>
          <div className="vantagem-card" style={{ animationDelay: "0.5s" }}>
            <h3>Incentivos e isenções</h3>
            <p>
              Alguns estados oferecem benefícios fiscais para quem instala
              painéis solares.
            </p>
          </div>
        </div>
      </section>

      <section className="atendimento">
        <div className="casa-img">
          <img src="img/casa.png" alt="Casa com painel solar" />
        </div>
        <div className="bloco-texto">
          <div className="fundo-arredondado">
            <p>
              <strong>Deseja receber algum atendimento da nossa equipe?</strong>{" "}
              Você pode comprar em nossa loja, receber suporte e receber ajuda
              para fazer o descarte das suas placas.{" "}
              <strong>Sim, nós cuidamos de todo o processo!</strong>
            </p>
            <a className="btn-atendimento" href="#">
              Opções de atendimento
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

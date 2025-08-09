import { useEffect, useRef } from "react";
// import placaLado1 from "../assets/imagens/"

export default function Funcionamento() {
  const placaEsqRef = useRef(null);
  const placaDirRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === placaEsqRef.current) {
            entry.target.classList.add("animate-left");
          } else if (entry.target === placaDirRef.current) {
            entry.target.classList.add("animate-right");
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (placaEsqRef.current) observer.observe(placaEsqRef.current);
    if (placaDirRef.current) observer.observe(placaDirRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="Funcionamento">
      <section className="intro">
        <h1>O QUE SÃO AS PLACAS SOLARES?</h1>
        <div className="intro-conteudo">
          <img
            src="./imagens/placaLado1.png"
            alt="Placa solar esquerda"
          />
          <p>
            As placas solares, ou módulos fotovoltaicos, são a tecnologia que
            permite converter a luz solar em energia elétrica por efeito
            fotovoltaico, que consiste no surgimento de uma corrente elétrica
            dentro da estrutura de um material semicondutor quando este é
            exposto à partículas de energia chamadas de radiação eletromagnética
            (luz).
          </p>
          <img
          ref={placaDirRef}
            src="./imagens/placaLado2.png"
            alt="Placa solar direita"
          />
        </div>
      </section>

      <section className="banner-solar-container">
        <div className="solarcardEimg">
          <div className="banner-solar-card">
            <div className="banner-solar-icon">☀️</div>
            <div>
              <p>
                <strong>Como sua fonte de energia é o Sol,</strong>
              </p>
              <p>
                a energia fotovoltaica é considerada limpa, sustentável e
                renovável. Porém, no fim da sua vida útil ela enfrenta alguns
                desafios, com os materiais utilizados nas células fotovoltaicas
                sendo, em muitos casos, difíceis de reciclar e descartar sem
                gerar ao meio ambiente.
              </p>
            </div>
          </div>
          <img
            ref={placaEsqRef}
            src="img/placaSustentavel.png"
            className="placaSustentavel"
            style={{ width: "min-content" }}
            alt="Placa sustentável"
          />
        </div>

        <div className="banner-solar-highlight-card">
          <div className="banner-solar-check-icon">✔️</div>
          <div>
            <p>
              <strong>As placas que oferecemos</strong> têm esses desafios
              diminuídos ao máximo, por serem{" "}
              <span className="banner-solar-text-highlight">
                extremamente sustentáveis
              </span>
              . Assim, não causam efeitos negativos no meio ambiente. Além
              disso, são extremamente econômicas, fazendo você gastar menos
              dinheiro!
            </p>
          </div>
        </div>
      </section>

      <section className="objetivo">
        <div className="box-ods">
          <img
            src="./imagens/imagem_2025-07-14_212946519-removebg-preview.png"
            alt="ODS 7 - Energia Acessível e Limpa"
          />
        </div>
        <div className="texto-ods">
          <p>
            Comprando nossas placas, você está contribuindo para atingir um dos
            Objetivos de Desenvolvimento Sustentável, sendo um passo importante
            para ajudar o mundo.
          </p>
          <button>Saiba do que precisa</button>
        </div>
      </section>
    </div>
  );
}
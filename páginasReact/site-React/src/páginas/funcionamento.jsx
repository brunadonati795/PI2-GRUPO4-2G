import { useEffect, useRef } from "react";

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
    <div>
      <section className="intro">
        <h1>O que são placas solares?</h1>
        <div className="intro-conteudo">
          <img
            ref={placaEsqRef}
            src="./imagens/placaLado1.png"
            alt="Placa solar esquerda"
          />
          <p>
            As placas solares, ou módulos fotovoltaicos, são a tecnologia que
            permite converter a luz solar em energia elétrica por efeito
            fotovoltaico, que consiste no surgimento de uma corrente elétrica
            dentro da estrutura de um material semicondutor quando este é exposto
            a partículas de energia chamadas de radiação eletromagnética (luz).
          </p>
          <img
            ref={placaDirRef}
            src="./imagens/placaLado2.png"
            alt="Placa solar direita"
          />
        </div>
      </section>

      <section className="secao-amarela">
        <div className="bloco-texto">
          <p>
            Como sua fonte de energia é o Sol, a energia fotovoltaica é considerada
            limpa, sustentável e renovável. Porém, no fim da sua vida útil ela
            enfrenta alguns desafios, com os materiais utilizados nas células
            fotovoltaicas sendo, em muitos casos, difíceis de reciclar e descartar
            sem gerar danos ao meio ambiente.
          </p>
          <img
            src="./imagens/imagem_2025-07-14_212349083-removebg-preview.png"
            alt="Placa com grama"
          />
        </div>

        <div className="bloco-texto">
          <img
            src="./imagens/imagem_2025-07-14_212552678-removebg-preview.png"
            alt="Placas com lixo"
          />
          <p>
            As placas que oferecemos têm esses desafios diminuídos ao máximo, por
            serem extremamente sustentáveis. Assim, não causam efeitos negativos no
            meio ambiente. Além disso, são extremamente econômicas, fazendo você
            gastar menos dinheiro!
          </p>
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
            Objetivos de Desenvolvimento Sustentável, sendo um passo importante para
            ajudar o mundo.
          </p>
          <button>Saiba do que precisa</button>
        </div>
      </section>
    </div>
  );
}

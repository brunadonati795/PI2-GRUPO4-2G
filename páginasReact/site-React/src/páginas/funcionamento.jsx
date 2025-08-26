import { useEffect, useRef } from "react";
import imgSeta from "../assets/imagens/seta.png";
import Componentes from "./componentes";
import { Link } from "react-router-dom";
import placalado1 from "../assets/imagens/comofuncionam-placaLado1";
import placalado2 from "../assets/imagens/comofuncionam-placaLado2";
import placasustentavel from  "../assets/imagens/comofuncionam-placaSustentavel.png";
import card7 from "../assets/imagens/comofuncionam-card7.png";

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
      <Link to="/primeiraPagina" className="botao-voltar">
        <img src={imgSeta}></img>
      </Link>
      <section className="intro">
        <h1>O que são placas solares?</h1>
        <div className="intro-conteudo">
          <img
            ref={placaEsqRef}
            src={placalado1}
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
            src={placalado2}
            alt="Placa solar direita"
          />
        </div>
      </section>

      <Componentes></Componentes>

      <section className="banner-solar-container">
        <div className="solarcardEimg">
          <div className="banner-solar-card">
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
            src={placasustentavel}
            alt="Placa com grama"
          />
        </div>

        <div className="banner-solar-highlight-card">
          <div>
            <p>
              <strong>As placas que oferecemos</strong> têm esses desafios
              diminuídos ao máximo, por serem       <strong>extremamente sustentáveis</strong>
                
              . Assim, não causam efeitos negativos no meio ambiente. Além
              disso, são extremamente econômicas, fazendo você gastar menos
              dinheiro!
            </p>
        </div> </div>
      </section>

      <section className="objetivo">
        <div className="box-ods">
          <img
            src={card7}
            alt="ODS 7 - Energia Acessível e Limpa"
          />
        </div>
        <div className="texto-ods">
          <p>
            Comprando nossas placas, você está contribuindo para atingir um dos
            Objetivos de Desenvolvimento Sustentável, sendo um passo importante para
            ajudar o mundo.
          </p>
          <Link to="/loja"><button>Faça sua parte!</button></Link>

        </div>
      </section>
    </div>
  );
}

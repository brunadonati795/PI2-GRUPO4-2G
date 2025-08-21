import "../App.css"; 
import Footer from "../componentes/footer";
import componentesFotovoltaicos from '../assets/imagens/componentesFotovoltaicos.png';
import componentesBidirecional from '../assets/imagens/componentesBidirecional.png';
import componentesDsjuntor from '../assets/imagens/componentesDsjuntor.png';
import componentesControladordeCarga from '../assets/imagens/componentesControladordeCarga.png';
import componentesBaterias from '../assets/imagens/componentesBaterias.png';
import componentesStringBox from '../assets/imagens/componentesStringBox.png';

import BotaoVoltar from '../componentes/botaovoltar.jsx';

export default function Componentes() {
  return (
    <>
      {/* Botão de voltar com emoji de seta */}
      <BotaoVoltar to="/funcionamento" />

      <section className="componentes">
        <h1>O QUE É NECESSÁRIO</h1>
        <p className="subtitle">Para pôr em casa?</p>

        <div className="box">
          <div className="item">
            <div className="text">
              <h2>Módulos Fotovoltaicos</h2>
              <p>
                <strong>Função:</strong> Captam a luz do sol e a convertem em energia elétrica (corrente contínua CC).
              </p>
              <p>
                <strong>Importância:</strong> Elemento central do sistema. Sem eles, não há geração de energia.
              </p>
            </div>
            <img
              src={componentesFotovoltaicos}
              alt="Painéis solares"
              id="Fotovoltaicos"
            />
          </div>

          <div className="item">
            <img
              src={componentesBidirecional}
              alt="Medidor de energia"
            />
            <div className="text">
              <h2>Medidor Bidirecional</h2>
              <p>
                <strong>Função:</strong> Mede a energia consumida.
              </p>
              <p>
                <strong>Importância:</strong> Necessário para fazer compensação de energia (créditos).
              </p>
            </div>
          </div>

          <div className="item">
            <div className="text">
              <h2>Disjuntor</h2>
              <p>
                <strong>Incluem:</strong> Disjuntores, fusíveis, DPS (Dispositivos de Proteção contra Surtos).
              </p>
              <p>
                <strong>Função:</strong> Garantem segurança contra curtos-circuitos, surtos e sobrecargas.
              </p>
              <p>
                <strong>Importância:</strong> Indispensáveis para proteger o sistema e os moradores.
              </p>
            </div>
            <img
              src={componentesDsjuntor}
              alt="Painéis solares"
              id="Fotovoltaicos"
            />
          </div>

          <div className="item">
            <img
              src={componentesControladordeCarga}
              alt="Medidor de energia"
              id="Controlador-de-Carga"
            />
            <div className="text">
              <h2>Controlador de Carga (em sistemas com bateria)</h2>
              <p>
                <strong>Função:</strong> Controla a entrada de energia nas baterias, evitando sobrecarga ou descarga profunda.
              </p>
              <p>
                <strong>Importância:</strong> Essencial em sistemas off-grid (sem conexão com a rede elétrica).
              </p>
            </div>
          </div>

          <div className="item">
            <div className="text">
              <h2>Baterias</h2>
              <p>
                <strong>Função:</strong> Armazenam a energia gerada para uso posterior (ex: à noite ou em dias nublados).
              </p>
              <p>
                <strong>Importância:</strong> Permitem independência da rede elétrica. São vitais em locais sem energia pública.
              </p>
            </div>
            <img
              src={componentesBaterias}
              alt="Painéis solares"
              id="Fotovoltaicos"
            />
          </div>

          <div className="item">
            <img
              src={componentesStringBox}
              alt="Medidor de energia"
              id="String-Box"
            />
            <div className="text">
              <h2>String Box</h2>
              <p>
                <strong>Função:</strong> Centraliza os dispositivos de proteção do lado DC e AC.
              </p>
              <p>
                <strong>Importância:</strong> Facilita manutenção e aumenta a segurança do sistema.
              </p>
            </div>
          </div> 
        </div>
      </section>
      <Footer />
    </>
  );
}

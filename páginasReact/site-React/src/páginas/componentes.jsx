import "../App.css"; 

export default function Componentes() {
  return (
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
            src="../img/Fotovoltaicos.png"
            alt="Painéis solares"
            id="Fotovoltaicos"
          />
        </div>

        <div className="item">
          <img
            src="../img/Bidirecional.png"
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
            src="../img/Dsjuntor.png"
            alt="Painéis solares"
            id="Fotovoltaicos"
          />
        </div>

        <div className="item">
          <img
            src="../img/Controlador de Carga.png"
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
      </div>

      <div className="box">
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
            src="../img/Baterias.png"
            alt="Painéis solares"
            id="Fotovoltaicos"
          />
        </div>

        <div className="item">
          <img
            src="../img/String Box.png"
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
  );
}

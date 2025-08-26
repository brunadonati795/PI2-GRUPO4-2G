import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Usuario() {
  const location = useLocation();
  const cadastroData = location.state || {}; // dados enviados do cadastro

  // estados para os campos do usuário
  const [nome, setNome] = useState(cadastroData.nome || "Nome Completo");
  const [cep, setCep] = useState(cadastroData.cep || "");
  const [bairro, setBairro] = useState(cadastroData.bairro || "");
  const [rua, setRua] = useState(cadastroData.rua || "");
  const [numero, setNumero] = useState(cadastroData.numero || "");
  const [complemento, setComplemento] = useState(cadastroData.complemento || "");
  const [email] = useState(cadastroData.email || ""); // ID lógico do usuário

  const [isEditing, setIsEditing] = useState(false);

  const [orders] = useState([
    { id: 1234, status: "Entregue", date: "08/08/2025", value: "R$ 120,00" },
    { id: 1235, status: "Pendente", date: "05/08/2025", value: "R$ 249,90" },
  ]);

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/usuarios/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // identificador
          nome,
          cep,
          bairro,
          rua,
          numero,
          complemento,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      const data = await response.json();
      console.log("Usuário atualizado:", data);
      alert("Dados salvos com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar no servidor!");
    }
  };

  return (
    <main className="container">
      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar-wrap">
            <img
              src="https://via.placeholder.com/160"
              alt="Foto de perfil"
              className="avatar"
            />
          </div>

          <div className="user-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome Completo"
                />
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="CEP"
                />
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                />
                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Rua"
                />
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Número"
                />
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Complemento"
                />
                <button className="btn-small" onClick={handleSave}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <h1 className="name">{nome}</h1>
                <p className="highlight"><strong>CEP:</strong> {cep}</p>
                <p className="highlight"><strong>Bairro:</strong> {bairro}</p>
                <p className="highlight"><strong>Rua:</strong> {rua}</p>
                <p className="highlight"><strong>Número:</strong> {numero}</p>
                <p className="highlight"><strong>Complemento:</strong> {complemento}</p>
                <button
                  className="btn-small"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </button>
              </>
            )}
          </div>
        </div>

        <section className="orders">
          <header className="orders-header">
            <h2>Pedidos</h2>
            <button className="btn-small">Novo pedido</button>
          </header>

          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <div className="order-main">
                  <strong>Pedido #{order.id}</strong>
                  <span
                    className={`order-status ${
                      order.status === "Entregue" ? "delivered" : "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-sub">
                  <small>
                    Data: {order.date} • Valor: {order.value}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

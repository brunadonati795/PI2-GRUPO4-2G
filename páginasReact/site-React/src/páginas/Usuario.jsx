import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Usuario() {
  const { id } = useParams(); // pega o id da URL /usuario

  // estados para os campos do usuário
  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [orders] = useState([
    { id: 1234, status: "Entregue", date: "08/08/2025", value: "R$ 120,00" },
    { id: 1235, status: "Pendente", date: "05/08/2025", value: "R$ 249,90" },
  ]);

  // Buscar dados do usuário no back
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:5000/usuarios`);
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = await response.json();

        setNome(data.nome || "");
        setCep(data.cep || "");
        setBairro(data.bairro || "");
        setRua(data.rua || "");
        setNumero(data.numero || "");
        setComplemento(data.complemento || "");
        setCidade(data.cidade || "");
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do usuário.");
      }
    }
    fetchUser();
  }, [id]);

  // Salvar no back
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cep,
          bairro,
          rua,
          numero,
          complemento,
          cidade,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar dados");
      alert("Dados atualizados com sucesso!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar no servidor.");
    }
  };

  return (
    <main className="container">
      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar-wrap">
            <img
              src="https://placehold.co/184x184"
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
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade"
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
                <p className="highlight"><strong>Cidade:</strong> {cidade}</p>
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

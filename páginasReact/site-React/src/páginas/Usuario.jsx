import {useState} from 'react';
import Footer from '../componentes/footer';

export default function Usuario() {
  const [name, setName] = useState("Nome do Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [location, setLocation] = useState("Cidade, Estado");
  const [isEditing, setIsEditing] = useState(false);

  const [orders] = useState([
    { id: 1234, status: "Entregue", date: "08/08/2025", value: "R$ 120,00" },
    { id: 1235, status: "Pendente", date: "05/08/2025", value: "R$ 249,90" },
  ]);

  const handleSave = () => {
    setIsEditing(false);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button className="btn-small" onClick={handleSave}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <h1 className="name">{name}</h1>
                <p className="highlight">
                  <strong>E-mail:</strong> {email}
                </p>
                <p className="highlight">
                  <strong>Localização:</strong> {location}
                </p>
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
     <Footer></Footer>
    </main>
  );
}

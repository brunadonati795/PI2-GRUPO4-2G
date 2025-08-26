import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (fullName.trim() !== "" && password.trim() !== "") {
      alert(`Login bem-sucedido para ${fullName}`);
      navigate("/usuario");
    } else {
      alert("Por favor, preencha nome e senha corretamente.");
    }
  };

  return (
    <div className="containerlogin">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">
            Nome completo:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="login-input"
              required
            />
          </label>
          <label className="login-label" required>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </label>
          <button type="submit" className="login-button">Entrar</button>
        </form>
    </div></div>

  );
};

export default Login;
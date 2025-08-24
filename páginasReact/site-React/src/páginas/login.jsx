import { useState } from "react";

const Login = () => {
    const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Nome completo:", fullName);
    console.log("Senha:", password);
    alert(`Tentativa de login de ${fullName}`);
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
          <label className="login-label">
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
}

export default Login;
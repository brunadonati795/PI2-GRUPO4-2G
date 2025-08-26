import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });

  const change = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      console.log("Login ok:", res.data);
      // navegar pra página de usuário ou dashboard
      navigate("/usuario", { state: res.data });
    } catch (err) {
      console.error(err);
      if (err.response) alert("Erro: " + (err.response.data.error || "Credenciais inválidas"));
      else alert("Erro de conexão");
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={change} required />
        <label>Senha:</label>
        <input name="senha" type="password" value={form.senha} onChange={change} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
=======
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

>>>>>>> 640672c5d677970c76fb64f24d304206cf2cd715
  );
}

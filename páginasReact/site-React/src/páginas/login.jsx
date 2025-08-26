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
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={change}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
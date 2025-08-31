import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/usuarios");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const usuarios = await response.json();

      // verifica se existe algum usuário com email e senha iguais
      const usuarioValido = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuarioValido) {
        alert(`Login bem-sucedido! Bem-vindo, ${usuarioValido.email}`);
        navigate("/usuario");
      } else {
        alert("E-mail ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

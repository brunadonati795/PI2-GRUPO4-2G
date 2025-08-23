import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";   // <-- importando axios
import bgImage from "../assets/imagens/bg.jpg"
import "../App.css";

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (!resposta.data.erro) {
          setFormData((prev) => ({
            ...prev,
            rua: resposta.data.logradouro || "",
            bairro: resposta.data.bairro || "",
          }));
        } else {
          alert("CEP não encontrado.");
        }
      //eslint(no-used-vars)
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar o CEP.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar dados para a API Flask com axios
      const response = await axios.post("http://localhost:5000/usuarios", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        endereco_completo: `${formData.rua}, ${formData.numero} - ${formData.bairro} (${formData.complemento})`,
        cep: formData.cep,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/usuario", { state: response.data });

    } catch (error) {
      if (error.response) {
        // Erro vindo do backend
        alert("Erro: " + (error.response.data.error || "Não foi possível cadastrar"));
      } else {
        // Erro de rede/conexão
        alert("Erro de conexão com o servidor");
      }
      console.error(error);
    }
  };

  return (
    <section className="form-container"
    style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="form-box">
        <h2>CADASTRO</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            required
          />

          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />

          <label htmlFor="rua">Rua:</label>
          <input
            type="text"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />

          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />

          <label htmlFor="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />

          <button type="submit">Cadastrar-se</button>
          Já tem uma conta? faça seu login<Link to="/login.jsx">aqui!</Link>
        </form>
      </div>
    </section>
  );
}

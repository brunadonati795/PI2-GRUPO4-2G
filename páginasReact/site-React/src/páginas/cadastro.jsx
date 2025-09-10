import { useState } from "react";


import { useNavigate, Link } from "react-router-dom";
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
    cidade: "",
    rua: "",
    numero: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (!resposta.data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: resposta.data.logradouro || "",
            cidade: resposta.data.localidade || "",
            // bairro = resposta.data.bairro (não usado pelo back, mas pode manter no front)
          }));
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar o CEP.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando:", formData);

    try {
      const response = await axios.post("http://localhost:5000/usuarios", formData);
      console.log("Resposta do back:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/usuario", { state: { id: response.data.id, nome: formData.nome, email: formData.email } });
      localStorage.setItem("usuarioId", user.id);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert("Erro: " + (error.response.data.error || "Não foi possível cadastrar"));
      } else {
        alert("Erro de conexão com o servidor");
      }
    }
    const handleZipCode = (event) => {
  let input = event.target
  input.value = zipCodeMask(input.value)
}

const zipCodeMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{5})(\d)/,'$1-$2')
  return value
}
  };

  

  return (
    <section className="form-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="form-box">
        <h2>CADASTRO</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome Completo:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />

          <label htmlFor="cep">CEP:</label>
          <input type="text" maxlength="9" onkeyup="handleZipCode(event)" id="cep" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} required />

          <label htmlFor="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required z/>

          <label htmlFor="rua">Rua:</label>
          <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} required />

          <label htmlFor="numero">Número:</label>

          <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} required />
          
          <label htmlFor="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
          <button type="submit">Cadastrar-se</button>
          <p>Já tem uma conta? <Link to="/login">Clique aqui!</Link></p>
          

        </form>
      </div>
    </section>
  );
}

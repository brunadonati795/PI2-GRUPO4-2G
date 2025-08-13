
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
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
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();

        if (!dados.erro) {
          setFormData((prev) => ({
            ...prev,
            rua: dados.logradouro || "",
            bairro: dados.bairro || "",
          }));
        } else {
          alert("CEP não encontrado.");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Erro ao buscar o CEP.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    // Aqui vai a integração com API ou backend
  };

  return (
    <section className="form-container">
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

          <button onClick={() => handleClick("/Usuario")} /*type="submit"*/>Cadastrar-se</button>
        </form>
      </div>
    </section>
  );
}

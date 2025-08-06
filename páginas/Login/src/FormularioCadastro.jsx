/* FormularioCadastro.jsx */
import React, { useState } from 'react';
import './App.css';

export default function FormularioCadastro() {
  const [form, setForm] = useState({
    nome_completo: '',
    cep: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: ''
  });
  const [erros, setErros] = useState({});

  function validarCampo(nome, valor) {
    if (!valor || valor.trim() === '') {
      return 'Campo obrigatório';
    }
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function verificarCEP() {
    const erro = validarCampo('cep', form.cep);
    if (erro) {
      setErros({ ...erros, cep: erro });
      return;
    }
    // Exemplo de chamada para API de CEP
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
      const data = await resp.json();
      if (data.erro) throw new Error('CEP não encontrado');
      setForm({
        ...form,
        bairro: data.bairro,
        rua: data.logradouro
      });
      setErros({ ...erros, cep: '' });
    } catch (err) {
      setErros({ ...erros, cep: 'CEP inválido' });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validar todos os campos
    const novosErros = {};
    Object.entries(form).forEach(([nome, valor]) => {
      const erro = validarCampo(nome, valor);
      if (erro) novosErros[nome] = erro;
    });
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    // TODO: Persistir no banco de dados
    fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar');
      alert('Cadastro realizado com sucesso!');
      setForm({ nome_completo: '', cep: '', bairro: '', rua: '', numero: '', complemento: '' });
    })
    .catch(console.error);
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <label>
          Nome Completo:
          <input
            type="text"
            name="nome_completo"
            value={form.nome_completo}
            onChange={handleChange}
            className="nome_completo"
          />
          {erros.nome_completo && <span className="erro">{erros.nome_completo}</span>}
        </label>

        <label>
          CEP:
          <div className="cep-wrapper">
            <input
              type="number"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              className="cep"
            />
            <button type="button" onClick={verificarCEP} className="btn-cep">
              Verificar CEP
            </button>
          </div>
          {erros.cep && <span className="erro">{erros.cep}</span>}
        </label>

        <label>
          Bairro:
          <input
            type="text"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            className="bairro"
          />
          {erros.bairro && <span className="erro">{erros.bairro}</span>}
        </label>

        <label>
          Rua:
          <input
            type="text"
            name="rua"
            value={form.rua}
            onChange={handleChange}
            className="rua"
          />
          {erros.rua && <span className="erro">{erros.rua}</span>}
        </label>

        <label>
          Número:
          <input
            type="number"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            className="numero"
          />
          {erros.numero && <span className="erro">{erros.numero}</span>}
        </label>

        <label>
          Complemento:
          <input
            type="text"
            name="complemento"
            value={form.complemento}
            onChange={handleChange}
            className="complemento"
          />
          {erros.complemento && <span className="erro">{erros.complemento}</span>}
        </label>

        <button type="submit" className="btn-submit">
          Cadastrar-se
        </button>
      </form>
    </div>
  );
}
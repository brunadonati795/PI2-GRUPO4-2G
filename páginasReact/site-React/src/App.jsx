import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import WhatsAppButton from "./componentes/whatsButton.jsx"; 

import PrimeiraPagina from "./index.jsx";
import ConfirmacaodePagamento from "./páginas/confirmacaodepagamento";
import Descarte from "./páginas/descarte";
import Funcionamento from "./páginas/funcionamento";
import Suporte from "./páginas/suporte";
import Opcoes from "./páginas/opcoes.jsx";
import Cadastro from "./páginas/cadastro.jsx";
import Componentes from "./páginas/componentes.jsx";
import Loja from "./páginas/loja/loja.jsx";
import Usuario from "./páginas/Usuario.jsx";
import Login from "./páginas/login.jsx";

function App() {
  useEffect(() => {
    document.title = "Renassol";
  }, []);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh" 
    }}>
      <Header />

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<PrimeiraPagina />} />
          <Route path="/primeiraPagina" element={<PrimeiraPagina />} />
          <Route path="/confirmacaodepagamento" element={<ConfirmacaodePagamento />} />
          <Route path="/descarte" element={<Descarte />} />
          <Route path="/funcionamento" element={<Funcionamento />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/opcoes" element={<Opcoes />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/componentes" element={<Componentes />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;

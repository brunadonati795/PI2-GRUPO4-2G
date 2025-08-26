import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import WhatsAppButton from "./componentes/whatsButton"; 

import PrimeiraPagina from "./index";
import ConfirmacaodePagamento from "./páginas/confirmacaodepagamento";
import Descarte from "./páginas/descarte";
import Funcionamento from "./páginas/funcionamento";
import Suporte from "./páginas/suporte";
import Opcoes from "./páginas/opcoes";
import Cadastro from "./páginas/cadastro";
import Componentes from "./páginas/componentes";
import Loja from "./páginas/loja/loja";
import Usuario from "./páginas/Usuario";
import Login from "./páginas/login";

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

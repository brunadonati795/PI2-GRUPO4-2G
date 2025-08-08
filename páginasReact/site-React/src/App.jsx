import { Routes, Route } from "react-router-dom";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

import PrimeiraPagina from "./index.jsx";
import ConfirmacaodePagamento from "./páginas/confirmacaodepagamento";
import Descarte from "./páginas/descarte";
import Funcionamento from "./páginas/funcionamento";
import Suporte from "./páginas/suporte";
import Opcoes from "./páginas/opcoes.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<PrimeiraPagina />} />
        <Route path="/primeiraPagina" element={<PrimeiraPagina />} />
        <Route path="/confirmacaodepagamento" element={<ConfirmacaodePagamento />} />
        <Route path="/descarte" element={<Descarte />} />
        <Route path="/funcionamento" element={<Funcionamento />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/opcoes" element={<Opcoes />} />

      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
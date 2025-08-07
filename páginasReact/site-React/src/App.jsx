import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import PrimeiraPagina from "./index.jsx";
import ConfirmacaodePagamento from "./páginas/confirmacaodepagamento";
import Descarte from "./páginas/descarte";
import Funcionamento from "./páginas/funcionamento";
import Suporte from "./páginas/suporte";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<PrimeiraPagina />} />
        <Route path="/confirmacaodepagamento" element={<ConfirmacaodePagamento />} />
        <Route path="/descarte" element={<Descarte />} />
        <Route path="/funcionamento" element={<Funcionamento />} />
        <Route path="/suporte" element={<Suporte />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

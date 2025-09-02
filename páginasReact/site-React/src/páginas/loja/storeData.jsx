import lojaacessorioparafixaçãovertical from "../../assets/imagens/lojaacessorioparafixaçãovertical.jpg";
import lojaestruturasolo from "../../assets/imagens/lojaestruturasolo.webp";
import lojabracadeira from "../../assets/imagens/lojabracadeira.jpg";
import lojabarraestrutura from "../../assets/imagens/lojabarraestrutura.webp";
import lojafixadorgrampo from "../../assets/imagens/lojafixadorgrampo.webp";
import lojagrampoplaca from "../../assets/imagens/lojagrampoplaca.webp";
import lojajuncao from "../../assets/imagens/lojajuncao.webp";
import lojajuncaoemu from "../../assets/imagens/lojajuncaoemu.webp";
import lojasuportecentral from "../../assets/imagens/lojasuportecentral.webp";
import DSSC from "../../assets/imagens/DSSC.png";
import perovskita from "../../assets/imagens/perovskita.png";
import organicos from "../../assets/imagens/organicos.png";
import medidor from "../../assets/imagens/medidor.png";
import disjuntor from "../../assets/imagens/disjuntor.png";

const storeData = [
  { id: 1, name: "Medidor Bidirecional", category: "loja", image: medidor, preco: 400.0, description: "Medidor bidirecional digital homologado. Registra fluxo de energia em ambos os sentidos (consumo e injeção). Classe de exatidão 0,2s. Tensão nominal: 127/220V. Corrente: até 100A. Indicado para sistemas fotovoltaicos on-grid." },
  { id: 2, name: "Disjuntor", category: "loja", image: disjuntor, preco: 23.0, description: "Disjuntor termomagnético bipolar. Corrente nominal: 32A. Tensão: 230/400V. Curva C. Capacidade de interrupção: 6kA. Indicado para proteção de sistemas fotovoltaicos e circuitos residenciais/comerciais."},
  { id: 3, name: "Estrutura para solo", category: "loja", image: lojaestruturasolo, preco: 45.0, description: "Estrutura de aço inoxidável para instalação de painéis solares no solo. Dimensões: 2m x 1m x 0,2m. Permite ajuste de ângulo para otimização da captação solar." },
  { id: 4, name: "Fixador de grampo", category: "loja", image: lojafixadorgrampo, preco: 10.0, description: "Grampo de aço inoxidável para fixação de componentes da estrutura. Medida: 6cm x 2cm. Garante estabilidade e resistência à corrosão." },
  { id: 5, name: "Conector em grampo", category: "loja", image: lojagrampoplaca, preco: 12.5, description: "Conector em alumínio para unir grampos e barras estruturais. Dimensões: 5cm x 3cm x 1,5cm. Ideal para montagem modular de painéis solares." },
  { id: 6, name: "Junção", category: "loja", image: lojajuncao, preco: 15.0, description: "Junção de aço galvanizado para unir barras estruturais. Medidas: 10cm x 5cm x 2cm. Permite conexões seguras com parafusos inclusos." },
  { id: 7, name: "Junção em U", category: "loja", image: lojajuncaoemu, preco: 18.0, description: "Junção em U de aço inoxidável para reforço estrutural. Dimensões: 8cm x 8cm x 3cm. Ideal para suportar peso adicional em estruturas maiores." },
  { id: 8, name: "Suporte central", category: "loja", image: lojasuportecentral, preco: 22.0, description: "Suporte central de alumínio para estabilização de painéis solares. Dimensões: 15cm x 10cm x 5cm. Suporta até 50kg de carga distribuída." },
  { id: 9, name: "Braçadeira", category: "loja", image: lojabracadeira, preco: 8.0, description: "Braçadeira de aço inoxidável para fixação rápida de cabos ou painéis. Dimensões: 4cm x 1cm. Resistente a intempéries e UV." },
  { id: 10, name: "Placa Orgânica", category: "placas", image: organicos, preco: 120.0, description: "Placa solar orgânica de 60cm x 40cm x 2cm, feita de polímero condutor e camada fotovoltaica. Eficiência média: 12%. Ideal para pequenas instalações residenciais." },
  { id: 11, name: "Placa de perovskita", category: "placas", image: perovskita, preco: 150.0, description: "Placa solar de perovskita 60cm x 40cm x 2cm. Material: perovskita + vidro temperado. Eficiência média: 18%. Indicado para sistemas residenciais e comerciais." },
  { id: 12, name: "Placa DSSC", category: "placas", image: DSSC, preco: 130.0, description: "Placa DSSC (Dye-Sensitized Solar Cell) 60cm x 40cm x 2cm. Material: titânio + corante sensível à luz. Eficiência média: 11%. Ideal para projetos de energia sustentável." },
  { id: 14, name: "Acessório para fixação vertical", category: "loja", image: lojaacessorioparafixaçãovertical, preco: 25.0, description: "Acessório de alumínio para fixação vertical de painéis solares. Dimensões: 12cm x 4cm x 3cm. Ideal para instalação segura em estruturas verticais." },
  { id: 13, name: "Barra de estrutura", category: "loja", image: lojabarraestrutura, preco: 30.0, description: "Barra de aço galvanizado de alta resistência. Comprimento: 1 metro, largura: 5cm, espessura: 0,5cm. Suporta cargas de painéis solares em telhados e solo." },
];

export default storeData;

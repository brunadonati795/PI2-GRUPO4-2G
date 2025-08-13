const abrirCarrinho = document.getElementById('abrirCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const carrinho = document.getElementById('carrinho');

abrirCarrinho.addEventListener('click', () => {
  carrinho.style.right = '0';
  abrirCarrinho.style.display = 'none'; // esconde a imagem
});

fecharCarrinho.addEventListener('click', () => {
  carrinho.style.right = '-50vw';
  abrirCarrinho.style.display = 'block'; // mostra a imagem novamente
});

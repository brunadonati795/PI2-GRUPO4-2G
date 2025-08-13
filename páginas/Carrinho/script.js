const abrirCarrinho = document.getElementById('abrirCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const carrinho = document.getElementById('carrinho');

abrirCarrinho.addEventListener('click', () => {
  carrinho.style.right = '0';
});

fecharCarrinho.addEventListener('click', () => {
  carrinho.style.right = '-50vw';
});

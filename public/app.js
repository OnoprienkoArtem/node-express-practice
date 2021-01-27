document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'eur',
    style: 'currency'
  }).format(node.textContent);
});

const $cart = document.querySelector('#cart');
if ($cart) {
  $.cart.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id;
      console.log(id)
    }
  })
}

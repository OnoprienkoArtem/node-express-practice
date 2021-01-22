document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'eur',
    style: 'currency'
  }).format(node.textContent);
});

document.getElementById('trocarBackground').addEventListener('click', function() {
  // Obtém a cor escolhida pelo usuário
  var corEscolhida = document.getElementById('corEscolhida').value;

  // Define a cor de fundo do corpo da página para a cor escolhida
  document.body.style.backgroundColor = corEscolhida;
});

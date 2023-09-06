// parte dos botões
const inscreverBtn = document.getElementById('inscreverBtn');
const formulario = document.getElementById('formulario');

inscreverBtn.addEventListener('click', () => {
    formulario.style.display = 'block';
    inscreverBtn.style.display = 'none';
})

const form = document.querySelector('form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Validação do campo de nome
  if (nomeInput.value.trim() === '') {
    alert('Por favor, preencha o campo Nome.');
    return;
  }

  // Validação do campo de e-mail
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert('Por favor, insira um endereço de e-mail válido.');
    return;
  }

  // Se a validação for bem-sucedida, você pode prosseguir com o envio do formulário aqui
  // Por exemplo, você pode usar AJAX para enviar os dados do formulário para o servidor
  // ou executar outras ações necessárias.

  // Exemplo de envio do formulário via AJAX (requer uma URL de servidor válida):
  fetch('/inscrever', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: nomeInput.value,
      email: emailInput.value,
    }),
  })
    .then(response => {
      if (response.ok) {
        // Inscrição bem-sucedida, você pode fornecer feedback ao usuário aqui
        alert('Inscrição bem-sucedida! Obrigado por se inscrever.');
        // Você pode redirecionar o usuário para outra página ou executar outras ações aqui
      } else {
        // Algo deu errado, forneça feedback de erro ao usuário, se necessário
        alert('Ocorreu um erro durante a inscrição. Tente novamente mais tarde.');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar o formulário:', error);
    });

  // Lembre-se de substituir a URL e o código de manipulação do servidor de acordo com sua aplicação real.
});

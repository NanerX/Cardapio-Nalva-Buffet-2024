document.getElementById('botao-imagem').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  const salgadosSelecionados = [];
  const docesSelecionados = [];

  // Captura todos os checkboxes de salgados selecionados
  document.querySelectorAll('#salgados-lista input[type="checkbox"]:checked').forEach((checkbox) => {
      salgadosSelecionados.push(checkbox.value);
  });

  // Captura todos os checkboxes de doces selecionados
  document.querySelectorAll('#doces-finos-banhados-lista input[type="checkbox"]:checked').forEach((checkbox) => {
      docesSelecionados.push(checkbox.value);
  });
  document.querySelectorAll('#doces-simples-lista input[type="checkbox"]:checked').forEach((checkbox) => {
      docesSelecionados.push(checkbox.value);
  });

  // Armazena os salgados e doces selecionados no localStorage
  localStorage.setItem('salgadosSelecionados', JSON.stringify(salgadosSelecionados));
  localStorage.setItem('docesSelecionados', JSON.stringify(docesSelecionados));

  // Captura o nome do cliente e a data do evento
  const nomeCliente = document.getElementById('nome-evento').value;
  const dataEvento = document.getElementById('data-evento').value;

  // Armazena o nome e a data no localStorage
  localStorage.setItem('nomeCliente', nomeCliente);
  localStorage.setItem('dataEvento', dataEvento);

  // Redireciona para a página 2
  window.location.href = 'pagina2.html';
});

document.getElementById('botao-imagem').addEventListener('click', function(event) {
 event.preventDefault(); // Impede o envio do formulário

 const selecionados = [];

 // Captura todos os checkboxes selecionados
 document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
   selecionados.push(checkbox.value);
 });

 // Armazena os salgados selecionados no localStorage
 localStorage.setItem('salgadosSelecionados', JSON.stringify(selecionados));

 // Captura o nome do cliente e a data do evento
 const nomeCliente = document.getElementById('nome-evento').value;
 const dataEvento = document.getElementById('data-evento').value;

 // Armazena o nome e a data no localStorage
 localStorage.setItem('nomeCliente', nomeCliente);
 localStorage.setItem('dataEvento', dataEvento);

 // Redireciona para a página 2
 window.location.href = 'pagina2.html';
});

document.getElementById('botao-imagem').addEventListener('click', function(event) {
 event.preventDefault(); // Impede o envio do formulário (pode ser útil dependendo do contexto)

 const selecionados = [];
 
 // Captura todos os checkboxes selecionados
 document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
   selecionados.push(checkbox.value);
 });

 // Armazena os salgados selecionados no localStorage
 localStorage.setItem('salgadosSelecionados', JSON.stringify(selecionados));

 // Redireciona para a página 2
 window.location.href = 'pagina2.html';
});

// Recupera os salgados selecionados do localStorage
const salgadosSelecionados = JSON.parse(localStorage.getItem('salgadosSelecionados')) || [];

// Obtém a referência para a lista onde os itens selecionados serão exibidos
const listaSelecionados = document.getElementById('lista-selecionados');

// Adiciona os salgados selecionados à lista
salgadosSelecionados.forEach((salgado) => {
  const li = document.createElement('li');
  li.innerHTML = `${salgado} <input type="number" min="1" placeholder="Quantidade" class="quantidade">`;
  listaSelecionados.appendChild(li);
});

// Evento para o botão de finalizar
document.getElementById('botao-finalizar').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Captura as quantidades inseridas
  const quantidades = [];
  document.querySelectorAll('.quantidade').forEach((input) => {
    const quantidade = parseInt(input.value) || 0; // Usa 0 se o valor não for um número
    quantidades.push(quantidade);
  });

  // Calcula a quantidade total de salgados
  const totalSalgados = quantidades.reduce((total, quantidade) => total + quantidade, 0);

  // Aqui você pode processar as quantidades conforme necessário
  console.log('Salgados selecionados:', salgadosSelecionados);
  console.log('Quantidades:', quantidades);
  
  // Exibe a mensagem com a quantidade total de salgados
  alert(`Pedido finalizado! Total de salgados: ${totalSalgados}`);
});

// Lista de salgados com seus preços
const precosSalgados = {
    "Camarão Empanado": 1.50,
    "Camarão Empanado na Tapioca": 1.70,
    "Croquete de Camarão": 1.50,
    "Bacalhau": 1.50,
    "Bolinho de Carne de Sol": 1.50,
    "Risole de Aratu": 1.50,
    "Coxinha": 1.20,
    "Bolinha de Queijo": 1.20,
    "Pão de Queijo": 1.20,
    "Pão de Queijo com Recheio": 1.30,
    "Peito de Peru": 1.50,
    "Canudinho": 1.20,
    "Pastelzinho": 1.20,
    "Empada": 1.20,
    "Barquete": 1.20,
    "Canolle": 1.20,
    "Crepnete": 1.20,
    "Cormeguis": 1.20,
    "Casquinha de Aratu": 1.70
};

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
document.getElementById('botao-finalizar').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura as quantidades inseridas
    const quantidades = [];
    document.querySelectorAll('.quantidade').forEach((input) => {
        const quantidade = input.value;
        if (quantidade) {
            quantidades.push(quantidade);
        }
    });

    // Verifica se há salgados selecionados e quantidades inseridas
    if (salgadosSelecionados.length === 0 || quantidades.length === 0) {
        alert('Você não selecionou nenhum salgado ou não inseriu quantidades.');
        return;
    }

    // Recupera o nome do cliente e a data do evento do localStorage
    const nomeCliente = localStorage.getItem('nomeCliente') || 'Cliente';
    const dataEvento = localStorage.getItem('dataEvento') || 'Data não informada';

    // Variável para armazenar o valor total do orçamento
    let valorTotal = 0;

    // Mensagem formatada para o WhatsApp
    let mensagem = `Orçamento de ${nomeCliente} para a data ${dataEvento}:\n\n`;

    salgadosSelecionados.forEach((salgado, index) => {
        const quantidade = quantidades[index] || 0; // Captura a quantidade correspondente
        const precoUnitario = precosSalgados[salgado] || 0; // Pega o preço do salgado
        const totalSalgado = precoUnitario * quantidade; // Calcula o total de cada salgado 
        valorTotal += totalSalgado; // Adiciona ao valor total

        mensagem += `${salgado}: ${quantidade} unidade(s) = R$ ${totalSalgado.toFixed(2)}\n`;
    });

    // Adiciona o valor total ao final da mensagem
    mensagem += `\nValor total do orçamento: R$ ${valorTotal.toFixed(2)}\n`;

    // Número de WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = '557999169957'; // Exemplo: +55 11 99999-9999
    const baseUrl = 'https://wa.me/';
    
    // Enviar mensagem via WhatsApp
    const url = `${baseUrl}${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank'); // Abre o WhatsApp em nova aba
});

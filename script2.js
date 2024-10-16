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

    // Formatar a data para o formato dd/mm/aaaa, se a data for válida
    let dataFormatada = dataEvento;
    if (dataEvento !== 'Data não informada') {
        const dataObj = new Date(dataEvento);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0
        const ano = dataObj.getFullYear();
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    // Mensagem formatada para o WhatsApp
    let mensagem = `Orçamento de ${nomeCliente} para a data ${dataFormatada}:\n\n`;

    salgadosSelecionados.forEach((salgado, index) => {
        const quantidade = quantidades[index] || 0; // Captura a quantidade correspondente
        mensagem += `${salgado}: ${quantidade}\n`;
    });

    // Número de WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = '5579999353965'; // Exemplo: +55 11 99999-9999
    const baseUrl = 'https://wa.me/';
    
    // Enviar mensagem via WhatsApp
    const url = `${baseUrl}${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank'); // Abre o WhatsApp em nova aba
});

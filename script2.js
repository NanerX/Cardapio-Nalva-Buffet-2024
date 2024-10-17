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

// Lista de doces com seus preços
const precosDoces = {
    "BOMBOM DE AMEIXA": 1.50,
    "BOMBOM DE AMENDOIM": 1.50,
    "BOMBOM DE CASTANHA": 1.50,
    "BOMBOM DE CEREJA": 1.50,
    "BOMBOM DE DAMASCO": 1.50,
    "BOMBOM DE NINHO": 1.50,
    "BOMBOM DE NOZES": 1.50,
    "BOMBOM DE NEGRESCO": 1.50,
    "BOMBOM DE PRESTÍGIO": 1.50,
    "BOMBOM DE VALSA": 1.50,
    "TRUFA DE CHOCOLATE": 1.50,
    "BRIGADEIRO": 1.40,
    "CAJUZINHO": 1.40,
    "PRESTÍGIO": 1.40,
    "SURPRESA DE UVA": 1.40
};

// Recupera os salgados e doces selecionados do localStorage
const salgadosSelecionados = JSON.parse(localStorage.getItem('salgadosSelecionados')) || [];
const docesSelecionados = JSON.parse(localStorage.getItem('docesSelecionados')) || [];

// Obtém a referência para as listas onde os itens selecionados serão exibidos
const listaSalgadosSelecionados = document.getElementById('lista-salgados-selecionados');
const listaDocesSelecionados = document.getElementById('lista-doces-selecionados');

// Função para adicionar itens à lista e criar campos de quantidade
function adicionarItens(lista, itens, precos) {
    itens.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `${item} <input type="number" min="1" placeholder="Quantidade" class="quantidade">`;
        lista.appendChild(li);
    });
}

// Adiciona os salgados e doces selecionados às listas
adicionarItens(listaSalgadosSelecionados, salgadosSelecionados, precosSalgados);
adicionarItens(listaDocesSelecionados, docesSelecionados, precosDoces);

// Evento para o botão de finalizar
document.getElementById('botao-finalizar').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura as quantidades inseridas
    const quantidadesSalgados = [];
    document.querySelectorAll('#lista-salgados-selecionados .quantidade').forEach((input) => {
        const quantidade = input.value;
        if (quantidade) {
            quantidadesSalgados.push(quantidade);
        }
    });

    const quantidadesDoces = [];
    document.querySelectorAll('#lista-doces-selecionados .quantidade').forEach((input) => {
        const quantidade = input.value;
        if (quantidade) {
            quantidadesDoces.push(quantidade);
        }
    });

    // Verifica se há itens selecionados e quantidades inseridas
    if (salgadosSelecionados.length === 0 && docesSelecionados.length === 0 || (quantidadesSalgados.length === 0 && quantidadesDoces.length === 0)) {
        alert('Você não selecionou nenhum item ou não inseriu quantidades.');
        return;
    }

    // Recupera o nome do cliente e a data do evento do localStorage
    const nomeCliente = localStorage.getItem('nomeCliente') || 'Cliente';
    const dataEvento = localStorage.getItem('dataEvento') || 'Data não informada';

    // Variável para armazenar o valor total do orçamento
    let valorTotal = 0;

    // Mensagem formatada para o WhatsApp
    let mensagem = `Orçamento de *${nomeCliente}* para a data ${dataEvento}:\n\n`;

    // Calcular total para salgados
    salgadosSelecionados.forEach((salgado, index) => {
        const quantidade = quantidadesSalgados[index] || 0; // Captura a quantidade correspondente
        const precoUnitario = precosSalgados[salgado] || 0; // Pega o preço do salgado
        const totalSalgado = precoUnitario * quantidade; // Calcula o total de cada salgado 
        valorTotal += totalSalgado; // Adiciona ao valor total

        mensagem += `${salgado}: ${quantidade} unidade(s) = R$ ${totalSalgado.toFixed(2)}\n`;
    });

    // Calcular total para doces
    docesSelecionados.forEach((doce, index) => {
        const quantidade = quantidadesDoces[index] || 0; // Captura a quantidade correspondente
        const precoUnitario = precosDoces[doce] || 0; // Pega o preço do doce
        const totalDoce = precoUnitario * quantidade; // Calcula o total de cada doce 
        valorTotal += totalDoce; // Adiciona ao valor total

        mensagem += `${doce}: ${quantidade} unidade(s) = R$ ${totalDoce.toFixed(2)}\n`;
    });

    // Adiciona o valor total ao final da mensagem
    mensagem += `\nValor total do orçamento: R$ ${valorTotal.toFixed(2)}\n`;

    // Número de WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = '5579998358788'; // Exemplo: +55 11 99999-9999
    const baseUrl = 'https://wa.me/';
    
    // Enviar mensagem via WhatsApp
    const url = `${baseUrl}${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank'); // Abre o WhatsApp em nova aba
});

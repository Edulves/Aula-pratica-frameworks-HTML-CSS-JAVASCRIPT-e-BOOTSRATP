/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o campo de CEP e os campos de endereço
    const inputCep = document.getElementById("InputCep");
    const inputRua = document.getElementById("InputRua");
    const inputBairro = document.getElementById("InputBairro");
    const inputCidade = document.getElementById("InputCidade");
    const inputEstado = document.getElementById("InputEstado");

    // Função para buscar o endereço usando o CEP
    function buscarEnderecoPorCep(cep) {
        // Formata o CEP para remover espaços e traços
        cep = cep.replace(/\D/g, '');

        // Verifica se o CEP possui 8 dígitos
        if (cep.length !== 8) {
            alert("O CEP deve conter 8 dígitos.");
            return;
        }

        // URL da API dos Correios
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        // Faz a requisição à API dos Correios
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                // Preenche os campos de endereço com os dados retornados
                inputRua.value = data.logradouro || '';
                inputBairro.value = data.bairro || '';
                inputCidade.value = data.localidade || '';
                inputEstado.value = data.uf || '';
            })
            .catch(error => {
                console.error("Erro ao buscar o CEP:", error);
                alert("Erro ao buscar o CEP.");
            });
    }

    // Adiciona um evento de input ao campo de CEP
    inputCep.addEventListener("input", function () {
        // Busca o endereço quando o usuário digitar 8 dígitos no CEP
        const cep = inputCep.value;
        if (cep.length === 8) {
            buscarEnderecoPorCep(cep);
        }
    });
});
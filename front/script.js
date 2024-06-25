function cadastrarUsuario() {
    const name = document.getElementById('nameInput').value;
    const idade = document.getElementById('idadeInput').value;
    const resultDiv = document.getElementById('result');

    if (!name || !idade ) {
        resultDiv.innerHTML = '<p style="color: red;">Por favor, preencha todos os campos.</p>';
        return;
    }


    // URL da API no localhost
    const url = 'https://apiheitor.netlify.app';

    // Dados a serem enviados para a API
    const data = { nome: name, idade: parseInt(idade) };

    // Configurações da requisição
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    // Enviando a requisição para a API
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        })
       .catch(error => {
            resultDiv.innerHTML = '<p style="color: red;">Ocorreu um erro ao cadastrar o usuário.</p>';
            console.error('Erro:', error);
        });
}



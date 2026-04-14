//feito com IA, porque ainda não sei Javascript e o professor pediu ;)

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => { // Adicionamos 'async' aqui
    e.preventDefault();

    // Função para converter a imagem em texto (Base64)
    const lerFoto = (arquivo) => {
        return new Promise((resolve, reject) => {
            if (!arquivo) resolve(null);
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(arquivo);
        });
    };

    const fotoInput = document.getElementById('foto').files[0];
    const fotoBase64 = await lerFoto(fotoInput); // Espera a foto ser convertida

    // Capturando os outros dados (mesma lógica anterior)
    const areasMarcadas = Array.from(document.querySelectorAll('input[name="areas"]:checked'))
                               .map(cb => document.querySelector(`label[for="${cb.id}"]`).innerText);
    
    const cursoSelecionado = document.querySelector('input[name="curso"]:checked');

    const estudante = {
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('Nascimento').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        estado: document.querySelector('select[name="est"]').value,
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        casa: document.getElementById('casa').value,
        observacoes: document.getElementById('informações adicionais').value,
        curso: cursoSelecionado ? document.querySelector(`label[for="${cursoSelecionado.id}"]`).innerText : "N/A",
        areas: areasMarcadas.join(', '),
        foto: fotoBase64 // Aqui salvamos a string da imagem
    };

    const lista = JSON.parse(localStorage.getItem('estudantes')) || [];
    lista.push(estudante);
    
    try {
        localStorage.setItem('estudantes', JSON.stringify(lista));
        alert('Cadastro com foto realizado!');
        window.location.href = 'tabela.html';
    } catch (error) {
        alert('A foto é muito grande para o navegador salvar. Tente uma imagem menor!');
    }
});
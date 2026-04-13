//feito com IA, porque ainda não sei Javascript e o professor pediu ;)


// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('tabela-corpo');
    
    // Recupera a lista de estudantes do LocalStorage
    const estudantes = JSON.parse(localStorage.getItem('estudantes')) || [];

    // Se não houver dados, exibe uma mensagem amigável
    if (estudantes.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="9" style="text-align:center;">Nenhum cadastro encontrado.</td></tr>`;
        return;
    }

    // Percorre cada estudante cadastrado e cria a linha
    estudantes.forEach(est => {
        const linha = document.createElement('tr');

        // Tratamento da Foto (exibe miniatura ou aviso se não houver)
        const fotoHtml = est.foto 
            ? `<img src="${est.foto}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1px solid #ccc;">`
            : `<span style="font-size: 12px; color: gray;">Sem foto</span>`;

        // Montagem das células com base nos IDs e nomes do seu formulário
        linha.innerHTML = `
            <td style="text-align: center; padding: 8px;">${fotoHtml}</td>
            <td style="padding: 8px;">${est.nome || '---'}</td>
            <td style="padding: 8px; text-align: center;">${formatarData(est.nascimento)}</td>
            <td style="padding: 8px;">${est.cpf || '---'}</td>
            <td style="padding: 8px;">
                <strong>Tel:</strong> ${est.telefone}<br>
                <strong>Email:</strong> ${est.email}
            </td>
            <td style="padding: 8px; font-size: 14px;">
                ${est.rua}, nº ${est.casa}<br>
                ${est.bairro} - ${est.cidade}/${est.estado}
            </td>
            <td style="padding: 8px; text-align: center;">${est.curso}</td>
            <td style="padding: 8px;">${est.areas || 'Nenhuma'}</td>
            <td style="padding: 8px; font-style: italic;">${est.observacoes || ''}</td>
        `;

        corpoTabela.appendChild(linha);
    });
});
const limparT = document.getElementById('limparT');

limparT.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja apagar todos os cadastros?")) {
        // Remove apenas a chave 'estudantes' do LocalStorage
        localStorage.removeItem('estudantes');
        
        // Recarrega a página para atualizar a tabela (ela ficará vazia)
        location.reload();
    }
});

/**
 * Função auxiliar para deixar a data no formato brasileiro (DD/MM/AAAA)
 */
function formatarData(dataIso) {
    if (!dataIso) return '---';
    const partes = dataIso.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
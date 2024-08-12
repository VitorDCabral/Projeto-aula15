import { $, $$ } from './utils.js';
import { initTheme } from './theme.js';
import { initTabs } from './tabs.js';
import { initCalendar } from './calendar.js';
import { initTurmas } from './turmas.js';
import { initForms } from './forms.js';
import { initRelatorios } from './relatorios.js';

// Variáveis globais
const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
let turmas = [];
let currentDate = new Date();

function init() {
    initTheme();
    initTabs();
    initCalendar(turmas, currentDate, DIAS_SEMANA);
    initTurmas(turmas);
    initForms(turmas, DIAS_SEMANA);
    initRelatorios(turmas);

    // Carregar turmas salvas
    carregarTurmas();

    // Mostrar lembrete
    mostrarLembrete();
}

function carregarTurmas() {
    const turmasSalvas = localStorage.getItem('turmas');
    if (turmasSalvas) {
        turmas = JSON.parse(turmasSalvas);
        atualizarVisualizacoes();
    }
}

function atualizarVisualizacoes() {
    initCalendar(turmas, currentDate, DIAS_SEMANA);
    initTurmas(turmas);
}

function mostrarLembrete() {
    if (turmas.length === 0) {
        alert('Nenhuma turma cadastrada. Adicione turmas para visualizar as informações.');
    } else {
        let mensagem = 'Informações das turmas cadastradas:\n\n';
        turmas.forEach((turma, index) => {
            mensagem += `Turma ${index + 1}:\n`;
            mensagem += `Nome: ${turma.nome}\n`;
            mensagem += `Tipo: ${turma.tipo}\n`;
            mensagem += `Data de Início: ${turma.dataInicio}\n`;
            mensagem += `Dia da Semana: ${turma.diaSemana}\n`;
            mensagem += `Horário: ${turma.horarioInicio} - ${turma.horarioFim}\n\n`;
        });
        alert(mensagem);
    }
}

document.addEventListener('DOMContentLoaded', init);

export { turmas, currentDate, DIAS_SEMANA, atualizarVisualizacoes };

document.addEventListener('DOMContentLoaded', () => {
    // Dados fictícios de turma. Substitua por dados reais conforme necessário.
    const turma = {
        nome: 'Turma A',
        tipo: 'Curso',
        dataInicio: '2024-08-15',
        diaSemana: 'Segunda',
        horarioInicio: '08:00',
        horarioFim: '10:00'
    };

    // Selecionar o modal e o conteúdo
    const modal = document.getElementById('modal-lembrete');
    const infoTurma = document.getElementById('info-turma');
    const closeModal = document.querySelector('#modal-lembrete .close');

    // Criar o conteúdo do modal
    infoTurma.innerHTML = `
        <p><strong>Nome da Turma:</strong> ${turma.nome}</p>
        <p><strong>Tipo de Turma:</strong> ${turma.tipo}</p>
        <p><strong>Data de Início:</strong> ${turma.dataInicio}</p>
        <p><strong>Dia da Semana:</strong> ${turma.diaSemana}</p>
        <p><strong>Horário:</strong> ${turma.horarioInicio} - ${turma.horarioFim}</p>
    `;

    // Função para abrir o modal
    function abrirModal() {
        modal.classList.remove('hidden');
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.add('hidden');
    }

    // Abrir o modal quando a página carregar
    abrirModal();

    // Fechar o modal ao clicar no botão de fechar
    closeModal.addEventListener('click', fecharModal);

    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });
});
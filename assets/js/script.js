const valor = document.getElementById('valor');
const motivo = document.getElementById('motivo');
const opcoes = document.getElementById('opcoes');
const mostradorSaldo = document.querySelector('p#saldo');
let saldoTotal = 0;

function validarSenha () {
    const validacao = document.getElementById('validacao');
    const formSenha = document.getElementById('validacaoSenha');
    const inputSenha = document.getElementById('senha');
    const botaoEnviarSenha = document.getElementById('verificarSenha');
    const mensagemSenha = document.getElementById('resultadoSenha');
    const senha = 'Sakai2020'

    inputSenha.focus();

    formSenha.addEventListener('submit', function (e) {
        e.preventDefault();
    })

    botaoEnviarSenha.addEventListener('click', function () {
        if (!inputSenha.value) {
            return alert('Prencha os campos solicitados');

        } else if (inputSenha.value !== senha) {
            mensagemSenha.style.display = 'flex';
            inputSenha.value = '';
            inputSenha.focus();
        } else {
            validacao.style.display = 'none';
        }
    })
}

validarSenha()

function saldoBrl (num) {
    const saldoConvertido = num.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return saldoConvertido
}

mostradorSaldo.innerHTML = saldoBrl(saldoTotal);

const formulario = document.getElementById('form')
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
})

function mostrarOpcoes () {
    const inputValor = document.getElementById('valorInput');
    const caixaDeTexto = document.getElementById('motivoResgate');
    const buttonConfirmar = document.getElementById('enviarDados');

    buttonConfirmar.addEventListener('click', function () {

        if (opcoes.value === 'resgate' || opcoes.value === 'aplicacao') {
        inputValor.style.display = 'flex';
        caixaDeTexto.style.display = 'flex';
        buttonConfirmar.style.display = 'none';
        motivo.placeholder = 'Digite o motivo da sua movimentação'
        
        criarBotaoEnviar();
        criarBotaoReiniciar();
    } 

    
    });
}

mostrarOpcoes();

function criarBotaoReiniciar () {
    const caixaBotao = document.getElementById('buttons');
     
    const botaoReiniciar = criarElemento('button', 'id', 'botaoReiniciar');
    botaoReiniciar.innerHTML = 'REINICIAR'
    caixaBotao.appendChild(botaoReiniciar);
    const btnReiniciar = document.getElementById('botaoReiniciar');

        btnReiniciar.addEventListener('click', function() {
            valor.value = '';
            motivo.value = '';
            motivo.placeholder = '';
            opcoes.value = 'inicial'
    });
console.log('botão reiniciar criado', btnReiniciar);
}

function criarBotaoEnviar () {
    const caixaBotao = document.getElementById('buttons');

    const botaoEnviar = criarElemento('button', 'id', 'botaoEnviar')
    botaoEnviar.innerHTML = 'ENVIAR'
    caixaBotao.appendChild(botaoEnviar);
    const btnEnviar = document.getElementById('botaoEnviar')
    
    btnEnviar.addEventListener('click', function () {
        if (!valor.value || !motivo.value) {
            return alert('Preencha os campos corretamente');
            
        } else if (opcoes.value === 'resgate') {
            saldoTotal -= Number(valor.value)
            mostradorSaldo.innerHTML = saldoBrl(saldoTotal);

        } else if (opcoes.value === 'aplicacao') {
            saldoTotal += Number(valor.value)
            mostradorSaldo.innerHTML = saldoBrl(saldoTotal);
        }

        //motivo.value = '';
        //valor.value = '';
        motivo.focus();
        valor.focus();

        criarLi();
    });
}


function criarElemento(tag, atributo, idAtributo) {
    const newElemento = document.createElement(tag);
    newElemento.setAttribute(atributo, idAtributo);
    return newElemento;
}

function criarLi () {
    const ulExtrato = document.querySelector('ul#listaExtrato');

    const liExtrato = criarElemento('li', 'class', 'li-extrato');
    ulExtrato.appendChild(liExtrato);
    liExtrato.appendChild(criarLink())
}

function criarLink () {
    const linkDoLi = criarElemento('a', 'class', 'link-lista')
    linkDoLi.innerHTML = `

    <strong>${opcoes.value}</strong> - Valor:${saldoBrl(Number(valor.value))} <strong>Data</strong>:${criarData()} <strong>Saldo:</strong>${saldoBrl(saldoTotal)}
    
    `;
    linkDoLi.href = '#';

    linkDoLi.addEventListener(`click`, function () {
        caixaPopUp.style.display = 'block';
        conteudoPopUp();
    })

    return linkDoLi
}

function conteudoPopUp () {
    const botaoFechar = document.querySelector('button#fechar');
    const conteudoPopUp = document.getElementById('conteudoPopUp');
    conteudoPopUp.innerHTML = `
    <p><strong>${opcoes.value.toUpperCase()}</strong></p><br>
    <p><strong>Valor:</strong>${saldoBrl(Number(valor.value))}</p>
    <p><strong>Motivo:</strong>${motivo.value}</p> <br>
    <p><strong>Data:</strong>${criarData()}  <strong>Hora:</strong>${criarHora()}</p>
    `
    botaoFechar.addEventListener('click', function () {
        caixaPopUp.style.display = 'none';
    })

    return conteudoPopUp;
}

function criarData () {
    const data = new Date();
    const dia = data.toLocaleDateString('pt-br');

    return dia;
}

function criarHora () {
    const data = new Date();
    const hora = data.toLocaleTimeString('pt-br');

    return hora;
}


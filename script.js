const html = document.querySelector('html')
const foco_botao = document.querySelector('.app__card-button--foco')
const curto_botao = document.querySelector('.app__card-button--curto')
const longo_botao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBotao = document.querySelector('#start-pause')
const iniciarOuPausarBotao = document.querySelector('#start-pause span')
const iniciarOuPausarBotaoIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')
musica.loop = true
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', function () {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

foco_botao.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco', 'foco.png')
    foco_botao.classList.add('active')
})

curto_botao.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto', 'descanso-curto.png')
    curto_botao.classList.add('active')
})

longo_botao.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo', 'descanso-longo.png')
    longo_botao.classList.add('active')
})

function alterarContexto(contexto, imagem) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${imagem}`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = function () {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        audioTempoFinalizado.play()
        alert('Tempo finalizado')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBotao.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBotao.textContent = 'Pausar'
    iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBotao.textContent = 'Começar'
    iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
const html = document.querySelector('html')
const foco_botao = document.querySelector('.app__card-button--foco')
const curto_botao = document.querySelector('.app__card-button--curto')
const longo_botao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

foco_botao.addEventListener('click', function () {
    alterarContexto('foco', 'foco.png')
    foco_botao.classList.add('active')
})

curto_botao.addEventListener('click', function () {
    alterarContexto('descanso-curto', 'descanso-curto.png')
    curto_botao.classList.add('active')
})

longo_botao.addEventListener('click', function () {
    alterarContexto('descanso-longo', 'descanso-longo.png')
    longo_botao.classList.add('active')
})

function alterarContexto(contexto, imagem) {
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
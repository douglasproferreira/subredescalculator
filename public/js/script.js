let oct = []
let x
let bit

const calcular = document.getElementById('form')
calcular.addEventListener("submit", function (event) {
    verificarIP()
    event.preventDefault()
}, false)


function capturarElemento(ref) {
    let elemento = document.querySelector(ref)
    return elemento
}

function verificarIP() {
    let ip = capturarElemento(".ip")
    oct = ip.value.split(".")
    if (ip.value === "") {
        alert("Informe um IP válido!")
    } else if (oct.length != 4) {
        alert("IP inválido!")
        inner.HTML()
    } else if (oct[0] <= 255 && oct[1] <= 255 && oct[2] <= 255 && oct[3] <= 255) {
        verificarClasse()
    } else {
        alert('Octeto com valor excedente a 255!')
    }
}

function verificarClasse() {
    if (oct[0] >= 192 && oct[0] <= 223) {
        calcularMasc()
    } else {
        alert("Este IP não pertence a classe C!")
        inner.HTML()
    }
}

function calcularMasc() {
    let qtsub = capturarElemento(".subred")
    if (qtsub.value === "") {
        alert("Informe a quantidade de subredes!")
        inner.HTML()
        event.preventDefault()
    } else if (qtsub.value > 64) {
        alert("Quantidade de subredes excedente!")
        inner.HTML()
        event.preventDefault()
    } else {
        x = 0
        bit = 0
        while (x < qtsub.value) {
            bit = bit + 1
            x = Math.pow(2, bit)
        }
    }
    let aux
    let j
    let ultoct = 0
    for (let i = 1; i <= bit; i++) {
        j = 8 - i
        aux = Math.pow(2, j)
        ultoct = ultoct + aux
    }
    montarMascHost(ultoct, bit)
}

function montarMascHost(ultoct, bit) {
    let p = document.createElement('p')
    let conteudo = document.createTextNode(`Máscara: 255.255.255.${ultoct}`)
    p.appendChild(conteudo)
    capturarElemento('.mascara').appendChild(p)
    let num = Math.pow(2,(8-bit))-2
    p = document.createElement('p')
    conteudo = document.createTextNode('Número de hosts válidos por subrede: ' + num)
    p.appendChild(conteudo)
    capturarElemento('.host').appendChild(p)
    p = document.createElement('p')
    conteudo = document.createTextNode('Subredes: ' + x)
    p.appendChild(conteudo)
    capturarElemento('.subredes').appendChild(p)
    calcSubrede()
}

function calcSubrede() {
    let auxiliar = (256 / x)
    let subred = 1
    let ipRede = 0
    let pHost = 1
    let ultHost = (auxiliar - 2)
    let broadcast = (auxiliar - 1)
    montarSuredes(subred, ipRede, pHost, ultHost, broadcast)

    for (let i = 1; i < x; i++) {
        subred = subred + 1
        ipRede = ipRede + auxiliar
        pHost = pHost + auxiliar
        ultHost = ultHost + auxiliar
        broadcast = broadcast + auxiliar
        montarSuredes(subred, ipRede, pHost, ultHost, broadcast)
    }
}

function montarSuredes(subred, ipRede, pHost, ultHost, broadcast) {
    subrede = document.createElement('div')
    subrede.className = "subredes"
    let p = document.createElement('p')
    let valor = document.createTextNode(subred)
    p.appendChild(valor)
    subrede.appendChild(p)

    p = document.createElement('p')
    valor = document.createTextNode(ipRede)
    p.appendChild(valor)
    subrede.appendChild(p)

    p = document.createElement('p')
    valor = document.createTextNode(pHost)
    p.appendChild(valor)
    subrede.appendChild(p)

    p = document.createElement('p')
    valor = document.createTextNode(ultHost)
    p.appendChild(valor)
    subrede.appendChild(p)

    p = document.createElement('p')
    valor = document.createTextNode(broadcast)
    p.appendChild(valor)
    subrede.appendChild(p)

    capturarElemento('.result').appendChild(subrede)
}
let oct = []
let x
let bit
let bitRede


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
    let qthost = capturarElemento(".numhost")
    if (qthost.value === "") {
        alert("Informe a quantidade de hosts!")
        inner.HTML()
        event.preventDefault()
    } else if (qthost.value < 2) {
        alert("Quantidade de hosts inválida!")
        inner.HTML()
        event.preventDefault()
    } else {
        x = 0
        bit = 0
        while (x < qthost.value) {
            bit = bit + 1
            x = (Math.pow(2, bit))-2
        }
    }
    bitRede = 8 - bit
    let ultoct = 0
    let j
    let aux
    for (let i = 1; i <= bitRede; i++) {
        j = 8 - i
        aux = Math.pow(2, j)
        ultoct = ultoct + aux
    }
    montarMascHost(ultoct, x, bitRede)
}
function montarMascHost(ultoct, x, bitRede) {
    let p = document.createElement('p')
    let conteudo = document.createTextNode(`Máscara: 255.255.255.${ultoct}`)
    p.appendChild(conteudo)
    capturarElemento('.mascara').appendChild(p)
    p = document.createElement('p')
    conteudo = document.createTextNode('Número de hosts válidos por subrede: ' + x)
    p.appendChild(conteudo)
    capturarElemento('.host').appendChild(p)
    p = document.createElement('p')
    conteudo = document.createTextNode('Subredes: ' + Math.pow(2,bitRede))
    p.appendChild(conteudo)
    capturarElemento('.subredes').appendChild(p)
    calcSubrede()
}

function calcSubrede() {
    let auxiliar = (256 / Math.pow(2,bitRede))
    let subred = 1
    let ipRede = 0
    let pHost = 1
    let ultHost = (auxiliar - 2)
    let broadcast = (auxiliar - 1)
    montarSuredes(subred, ipRede, pHost, ultHost, broadcast)

    for (let i = 1; i <  Math.pow(2,bitRede); i++) {
        subred = subred + 1
        ipRede = ipRede + auxiliar
        pHost = pHost + auxiliar
        ultHost = ultHost + auxiliar
        broadcast = broadcast + auxiliar
        montarSuredes(subred, ipRede, pHost, ultHost, broadcast)
    }
}

function montarSuredes(subred, ipRede, pHost, ultHost, broadcast) {
    let subrede = document.createElement('div')
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
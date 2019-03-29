let oct = []
let bit
let validar = 0
let ip
let masc

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
    ip = capturarElemento(".ip")
    oct = ip.value.split(".")
    if (ip.value === "") {
        alert("Informe um IP válido!")
    } else if ((oct[0] == "") || (oct[1] == "") || (oct[2] == "") || (oct[3] == "")) {
        alert("Há octetos vazios!")
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
        verificarMasc()
    } else {
        alert("Este IP não pertence a classe C!")
        inner.HTML()
    }
}

function verificarMasc() {
    masc = capturarElemento('.masc')
    oct = masc.value.split('.')
    if (masc.value === "") {
        alert("Digite uma máscara válida!")
    } else if ((oct[0] == "") || (oct[1] == "") || (oct[2] == "") || (oct[3] == "")) {
        alert("Há octetos vazios!")
    } else if (oct.length != 4) {
        alert("Máscara Inválida!")
    } else if (oct[0] != 255 && oct[1] != 255 && oct[2] != 255) {
        alert("Máscara Inválida!")
    } else {
        let aux = 0
        for (let i = 1; i <= 6; i++) {
            j = 8 - i
            aux = aux + Math.pow(2, j)
            if (oct[3] == aux) {
                validar = validar + 1
                bit = i
            }
        }
        if (validar == 0) {
            alert("Máscara não corresponde a nenhuma divisão de subredes da classe C!")
        } else{
            descobrirSubredes()
        }   
    }
}

function descobrirSubredes() {
    let p = document.createElement('p')
    let conteudo = document.createTextNode("IP: " + ip.value)
    p.appendChild(conteudo)
    capturarElemento('.ipSubred').appendChild(p)

    p = document.createElement('p')
    conteudo = document.createTextNode("Máscara: " + masc.value)
    p.appendChild(conteudo)
    capturarElemento('.mascara').appendChild(p)

    p = document.createElement('p')
    conteudo = document.createTextNode("Divisão Atual de Subredes: " + Math.pow(2, bit))
    p.appendChild(conteudo)
    capturarElemento('.subredes').appendChild(p)

    p = document.createElement('p')
    conteudo = document.createTextNode("Hosts válidos por subrede: " + (Math.pow(2, (8 - bit)) - 2))
    p.appendChild(conteudo)
    capturarElemento('.host').appendChild(p)
}
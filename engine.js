const canvas = document.createElement("canvas")

const canvases = get("canvases")

canvases.appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = 910
canvas.height = 110

const image = new Image(85, 85)
image.src = "./src/brasao.png"

let logo = new Image(90, 90)
let logo_timbre = new Image(125, 125)

const canvas_timbre = document.createElement("canvas")
const ctx_timbre = canvas_timbre.getContext("2d")

canvases.appendChild(canvas_timbre)

canvas_timbre.width = 1115
canvas_timbre.height = 180

const image_timbre = new Image(150, 150)
image_timbre.src = "./src/brasao.png"

const icon_mail = new Image(12, 8)
icon_mail.src = "./src/icon_mail.png"

const icon_tel = new Image(11, 11)
icon_tel.src = "./src/icon_tel.png"

const icon_pin = new Image(11, 11)
icon_pin.src = "./src/icon_pin.png"

const tuiuti = new Image(253, 116)
tuiuti.src = "./src/timbre.png"

image_timbre.onload = atualiza_canvas

const siglas = {
    2: "65px",
    3: "55px",
    4: "37px"
}

const siglas_timbre = {
    2: "100px",
    3: "75px",
    4: "51px"
}

function atualiza_canvas(force) {

    ctx.clearRect(0, 0, 910, 110)
    ctx.restore()

    const emojis = get("emojis").checked ? true : false

    const cor_links = get("check_cor_links").value
    const cor_linha = get("check_cor_linha").value
    const cor_destaque = get("check_cor_destaque").value

    let cor_titulo = hexToRgb(cor_destaque)
    cor_titulo = `rgb(${cor_titulo.r - 21}, ${cor_titulo.g - 20}, ${cor_titulo.b - 20})`

    let cor_destaque_2 = hexToRgb(cor_destaque)
    let cor_destaque_3 = `rgb(${cor_destaque_2.r - 91}, ${cor_destaque_2.g - 72}, ${cor_destaque_2.b - 72})`

    cor_destaque_2 = `rgb(${cor_destaque_2.r - 31}, ${cor_destaque_2.g - 22}, ${cor_destaque_2.b - 22})`

    if (cor_destaque !== "#dd3333" || cor_linha !== "#616161" || cor_links !== "#2b63d4")
        get("cor_padrao").style.display = "block"

    if (get("sub_sigla_edu").checked) {
        logo.src = "./src/logo_edu.jpg"
        logo_timbre.src = "./src/logo_edu.jpg"
    } else if (force) redefine_logo(true)

    localStorage.setItem("sub_sigla_edu", get("sub_sigla_edu").checked ? "1" : "0")

    // Logo customizado escolhido
    if (logo.src) get("logo_padrao").style.display = "block"

    if ((get("cargo").value).toLowerCase().includes("chefe"))
        get("select_faixa_superior").style.display = "block"
    else {
        get("faixa_superior").checked = false
        get("select_faixa_superior").style.display = "none"
    }

    ctx.globalCompositeOperation = "source-over"

    if (emojis) {

        ctx.fillStyle = cor_destaque
        let altura_linha = 18

        if ((get("email").value).length > 0) ctx.drawImage(icon_mail, 555, altura_linha, icon_mail.width, icon_mail.height), altura_linha += 18
        if ((get("telefone").value).length > 0) ctx.drawImage(icon_tel, 556, altura_linha, icon_tel.width, icon_tel.height), altura_linha += 18
        if ((get("endereco").value).length > 0) ctx.drawImage(icon_pin, 556, altura_linha, icon_pin.width, icon_pin.height)

        // Alterando a cor dos icones para a cor em destaque
        ctx.shadowColor = "transparent"
        ctx.globalCompositeOperation = "source-atop"

        // Desenhando o retangulo para trocar a cor dos icones
        ctx.fillRect(552, 15, 18, 55)

        ctx.globalCompositeOperation = "destination-over"

        altura_linha = 18
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        ctx.shadowBlur = 2

        // Desenhando a sombra por detrás dos icones
        if (get("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .2)"

        if ((get("email").value).length > 0) ctx.drawImage(icon_mail, 555, altura_linha, icon_mail.width, icon_mail.height), altura_linha += 18
        if ((get("telefone").value).length > 0) ctx.drawImage(icon_tel, 556, altura_linha, icon_tel.width, icon_tel.height), altura_linha += 18
        if ((get("endereco").value).length > 0) ctx.drawImage(icon_pin, 556, altura_linha, icon_pin.width, icon_pin.height)

        ctx.shadowColor = "transparent"
    }

    // Revertendo o canvas para desenhar atrás
    ctx.globalCompositeOperation = "destination-over"

    ctx.strokeStyle = "white"
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.roundRect(0, 0, 900, 100, [5, 30, 10, 5])
    ctx.stroke()
    ctx.fill()

    ctx.shadowColor = "rgba(0, 0, 0, .1)"
    ctx.shadowBlur = 4

    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 3

    ctx.beginPath()
    ctx.roundRect(0, 0, 900, 100, [5, 30, 10, 5])
    ctx.stroke()
    ctx.fill()

    ctx.globalCompositeOperation = "source-atop"

    ctx.fillStyle = `rgba(0, 0, 0, 0)`
    ctx.fillRect(0, 0, 910, 110)

    ctx.globalCompositeOperation = "source-over"

    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 2

    if (get("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .2)"

    // Adicionando um adorno ao logo
    if (get("sub_adorno_logo").checked) {

        let distancia = 6, topo = 0

        ctx.fillStyle = cor_destaque_2
        ctx.fillRect(5, 5, 90, 90)

        if (get("faixa_superior").checked) topo = 1

        ctx.beginPath()
        ctx.moveTo(topo ? 0 : 5 - distancia, topo ? 0 : 5 + distancia)
        ctx.lineTo(5, 5)
        ctx.lineTo(5, 5 + 90)

        ctx.lineTo(5 - distancia, 5 + 90 + distancia)
        ctx.lineTo(5 - distancia, 5 + 90)
        ctx.fill()

        ctx.fillStyle = cor_destaque_3

        ctx.beginPath()
        ctx.moveTo(5 - distancia, 5 + 90 + distancia)
        ctx.lineTo(5 - distancia + 90, 5 + 90 + distancia)
        ctx.lineTo(5 + 90, 5 + 90)
        ctx.lineTo(5, 5 + 90)
        ctx.fill()
    }

    if (get("sub_adorno_logo").checked)
        ctx.shadowColor = "transparent"

    if (!logo.src) {

        ctx.fillStyle = cor_destaque
        ctx.fillRect(5, 5, 90, 90)

        if (get("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .2)"

        ctx.fillStyle = "white"
        ctx.font = `${siglas[(get("sigla").value).length]} Impact`

        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText((get("sigla").value).toUpperCase(), 50, 50)
    } else
        ctx.drawImage(logo, 5, 5, logo.width, logo.height)

    ctx.shadowColor = "transparent"
    ctx.textAlign = "start"
    ctx.textBaseline = "alphabetic"

    ctx.font = "bold 16px Verdana"
    ctx.fillStyle = cor_titulo
    ctx.fillText(get("nome").value, 110, 25)

    ctx.drawImage(image, 460, 15, image.width, image.height)

    if ((get("cargo").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(get("cargo").value, 110, 45)
    }

    if ((get("sigla").value).length > 0) {

        const e = get("sigla")

        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo

        let textoQuebrado = quebrarTexto(ctx_timbre, e.options[e.selectedIndex].text, 110, 65, 430, 15)

        textoQuebrado.forEach((texto) => {
            ctx.fillText(texto[0], texto[1], texto[2])
        })

        ctx.shadowColor = "transparent"
    }

    if ((get("subdivisao").value).length > 0 && get("sub_div_check").checked) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo
        ctx.fillText(get("subdivisao").value, 110, 85)
    }

    let altura_linha = 25

    if ((get("email").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_links
        ctx.fillText(get("email").value, emojis ? 575 : 550, altura_linha)

        altura_linha += 20
    }

    if ((get("telefone").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(get("telefone").value, emojis ? 575 : 550, altura_linha)

        altura_linha += 20
    }

    ctx.fillStyle = "black"

    if ((get("endereco").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillText(get("endereco").value, emojis ? 575 : 550, altura_linha)
    }

    ctx.font = "12px Verdana"
    ctx.fillText("Prefeitura do Município de Tuiuti - ", 550, 90)

    ctx.fillStyle = cor_links
    ctx.fillText("www.tuiuti.sp.gov.br", 758, 90)

    ctx.strokeStyle = cor_destaque
    ctx.lineWidth = 2

    if (get("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .2)"

    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    ctx.beginPath()
    ctx.moveTo(450, 10)
    ctx.lineTo(450, 15)

    ctx.moveTo(450, 20)
    ctx.lineTo(450, 80)

    ctx.moveTo(450, 85)
    ctx.lineTo(450, 90)

    ctx.moveTo(540, 74)
    ctx.lineTo(545, 74)

    ctx.moveTo(550, 74)
    ctx.lineTo(880, 74)

    ctx.moveTo(885, 74)
    ctx.lineTo(890, 74)

    ctx.stroke()

    if (get("borda_triangular").checked) {

        ctx.shadowOffsetX = -5
        ctx.shadowOffsetY = 0

        ctx.fillStyle = cor_destaque_2
        ctx.beginPath()
        ctx.moveTo(780, 0)
        ctx.lineTo(901, 60)
        ctx.lineTo(901, 0)
        ctx.fill()

        if (get("faixa_superior").checked) {

            ctx.strokeStyle = cor_destaque
            ctx.lineWidth = 10

            ctx.shadowOffsetX = -10
            ctx.shadowOffsetY = -10

            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(901, 0)
            ctx.stroke()

            ctx.lineWidth = 2
            ctx.shadowOffsetX = -5
            ctx.shadowOffsetY = 0
        }

        ctx.fillStyle = cor_destaque
        ctx.beginPath()
        ctx.moveTo(800, 0)
        ctx.lineTo(901, 60)
        ctx.lineTo(901, 0)
        ctx.fill()
    }

    ctx.shadowColor = "transparent"

    if (!force) base64ToBytes()

    // Editando o canvas do timbre
    ctx_timbre.clearRect(0, 0, canvas_timbre.width, canvas_timbre.height)
    ctx_timbre.restore()

    if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .1)"

    ctx_timbre.shadowBlur = 4

    ctx_timbre.strokeStyle = "white"
    ctx_timbre.fillStyle = "white"
    ctx_timbre.beginPath()
    ctx_timbre.roundRect(0, 0, canvas_timbre.width, canvas_timbre.height)
    ctx_timbre.stroke()
    ctx_timbre.fill()

    ctx_timbre.fillStyle = `rgba(0, 0, 0, 0)`
    ctx_timbre.fillRect(0, 0, canvas_timbre.width, canvas_timbre.height)
    ctx_timbre.shadowBlur = 2

    ctx_timbre.font = `${siglas_timbre[(get("sigla").value).length]} Impact`

    ctx_timbre.textAlign = "center" // Alinhando no centro do ponto
    ctx_timbre.textBaseline = "middle" // Alinhando no meio da linha

    ctx_timbre.fillText((get("sigla").value).toUpperCase(), 50, 50)
    ctx_timbre.shadowColor = "transparent"

    ctx_timbre.textAlign = "start"
    ctx_timbre.textBaseline = "alphabetic"

    ctx_timbre.shadowOffsetX = 3
    ctx_timbre.shadowOffsetY = 3
    ctx_timbre.drawImage(image_timbre, 15, 35, image_timbre.width, image_timbre.height)

    // Escrevendo o nome do municipio ao lado do brasão
    ctx_timbre.drawImage(tuiuti, 180, 45, tuiuti.width, tuiuti.height)

    if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .2)"

    const icon_x = 650, icon_y = 35

    // Adicionando um adorno ao logo
    if (get("sub_adorno_logo").checked) {

        let distancia = 7

        ctx_timbre.fillStyle = cor_destaque_2
        ctx_timbre.fillRect(icon_x, icon_y, 125, 125)

        ctx_timbre.fillStyle = cor_destaque_2

        ctx_timbre.beginPath()
        ctx_timbre.moveTo(icon_x - distancia, icon_y + distancia)
        ctx_timbre.lineTo(icon_x, icon_y)
        ctx_timbre.lineTo(icon_x, icon_y + 125)

        ctx_timbre.lineTo(icon_x - distancia, icon_y + 125 + distancia)
        ctx_timbre.lineTo(icon_x - distancia, icon_y + 125)
        ctx_timbre.fill()

        ctx_timbre.fillStyle = cor_destaque_3

        ctx_timbre.beginPath()
        ctx_timbre.moveTo(icon_x - distancia, icon_y + 125 + distancia)
        ctx_timbre.lineTo(icon_x - distancia + 125, icon_y + 125 + distancia)
        ctx_timbre.lineTo(icon_x + 125, icon_y + 125)
        ctx_timbre.lineTo(icon_x, icon_y + 125)
        ctx_timbre.fill()
    }

    if (get("sub_adorno_logo").checked)
        ctx_timbre.shadowColor = "transparent"

    if (!logo.src) {

        ctx_timbre.fillStyle = cor_destaque
        ctx_timbre.fillRect(icon_x, icon_y, 125, 125)

        if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .2)"

        ctx_timbre.fillStyle = "white"
        ctx_timbre.font = `${siglas_timbre[(get("sigla").value).length]} Impact`

        ctx_timbre.textAlign = "center"
        ctx_timbre.textBaseline = "middle"
        ctx_timbre.fillText((get("sigla").value).toUpperCase(), icon_x + 62, icon_y + 62)
    } else
        ctx_timbre.drawImage(logo_timbre, icon_x, icon_y, logo_timbre.width, logo_timbre.height)

    ctx_timbre.shadowColor = "transparent"
    ctx_timbre.textAlign = "start"
    ctx_timbre.textBaseline = "alphabetic"

    if ((get("sigla").value).length > 0) {

        const e = get("sigla")

        ctx_timbre.font = "bold 24px Helvetica"
        ctx_timbre.fillStyle = "Black"

        // Alinhando o texto no centro e no meio do ponto
        ctx_timbre.textAlign = "center"
        ctx_timbre.textBaseline = "middle"

        let textoQuebrado = quebrarTexto(ctx_timbre, (e.options[e.selectedIndex].text).toUpperCase(), 950, 85, 330, 30)

        textoQuebrado.forEach((texto) => {
            ctx_timbre.fillText(texto[0], texto[1], textoQuebrado.length > 2 ? texto[2] - 15 : textoQuebrado.length === 1 ? texto[2] + 15 : texto[2])
        })

        ctx_timbre.shadowColor = "transparent"
    }

    if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .2)"

    ctx_timbre.lineWidth = 20
    ctx_timbre.strokeStyle = cor_destaque_2

    ctx_timbre.shadowOffsetX = 0
    ctx_timbre.shadowOffsetY = 3

    if (get("borda_triangular").checked) {
        ctx_timbre.beginPath()
        ctx_timbre.moveTo(0, 7)
        ctx_timbre.lineTo(1200, 15)

        ctx_timbre.stroke()
    }

    ctx_timbre.strokeStyle = cor_destaque

    // Linha do topo
    ctx_timbre.beginPath()
    ctx_timbre.moveTo(0, 5)
    ctx_timbre.lineTo(1200, 5)

    ctx_timbre.stroke()
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

function redefine_cor() {

    get("check_cor_destaque").value = "#dd3333"
    get("check_cor_links").value = "#2b63d4"
    get("check_cor_linha").value = "#616161"
    atualiza_canvas()

    get("sub_cor_padrao").checked = false
    get("cor_padrao").style.display = "none"
}

function redefine_logo(force) {

    logo = new Image(90, 90)
    logo_timbre = new Image(125, 125)

    localStorage.setItem("sub_sigla_edu", "0")
    get("sub_sigla_edu").checked = false

    get("sub_logo_padrao").checked = false
    get("logo_padrao").style.display = "none"

    if (!force) atualiza_canvas()
}

function previewImage() {

    let file = get("logo").files

    if (file.length > 0) {
        let fileReader = new FileReader()

        fileReader.onload = function (event) {
            logo.src = event.target.result
            logo_timbre.src = event.target.result

            get("sub_sigla_edu").checked = false

            setTimeout(() => {
                atualiza_canvas()
            }, 250)
        }

        fileReader.readAsDataURL(file[0])
    }
}

function get(alvo) {

    let alvos = document.getElementsByClassName(alvo)

    if (alvos.length < 1)
        alvos = document.getElementById(alvo)

    return alvos
}

function mudar_tema(auto) {

    let tema_atual = localStorage.getItem("tema_rodape")

    get("sub_sigla_edu").checked = parseInt(localStorage.getItem("sub_sigla_edu"))

    if (parseInt(tema_atual)) {
        get("entradas").style.backgroundColor = "rgba(0, 0, 0, .2)"
        document.body.style.color = "white"

        if (!auto) localStorage.setItem("tema_rodape", 0)

        get("ShowButton").value = "🌞"

    } else {

        get("entradas").style.backgroundColor = "rgba(242, 242, 242, .7)"
        document.body.style.color = "black"

        if (!auto) localStorage.setItem("tema_rodape", 1)
        get("ShowButton").value = "🌛"
    }

    if (!auto) mudar_tema(true)
}

mudar_tema(true)

function base64ToBytes() {

    let dados = {
        ls: get("check_cor_linha").value,
        lk: get("check_cor_links").value,
        cd: get("check_cor_destaque").value,
        sigla_edu: get("sub_sigla_edu").checked,
        adorno_logo: get("sub_adorno_logo").checked,
        emoji: get("emojis").checked,
        bt: get("borda_triangular").checked,
        shw: get("sub_sombra").checked,
        telefone: get("telefone").value,
        cargo: get("cargo").value,
        end: get("endereco").value,
        dp: get("sigla").value,
        sub_div: get("subdivisao").value
    }

    // Convertendo de JSON (utf-8) para base 64
    dados = JSON.stringify(dados)

    const codeUnits = new Uint16Array(dados.length)

    for (let i = 0; i < codeUnits.length; i++)
        codeUnits[i] = dados.charCodeAt(i)

    get("codigo_entrada").value = btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)))
}

function carrega_config() {

    try {

        // Decodificando da base64 para utf-8
        const binary = atob(get("codigo_entrada").value)
        const bytes = new Uint8Array(binary.length)

        for (let i = 0; i < bytes.length; i++)
            bytes[i] = binary.charCodeAt(i)

        dados = JSON.parse(String.fromCharCode(...new Uint16Array(bytes.buffer)))

        // Removendo as customizações de logo
        redefine_logo(true)

        // Cores customizadas
        get("check_cor_linha").value = dados.ls
        get("check_cor_links").value = dados.lk
        get("check_cor_destaque").value = dados.cd

        // Checkboxes
        get("emojis").checked = dados.emoji
        get("borda_triangular").checked = dados.bt
        get("sub_sombra").checked = dados.shw
        get("sub_sigla_edu").checked = dados.sigla_edu
        get("sub_adorno_logo").checked = dados.adorno_logo

        // Inputs
        get("subdivisao").value = dados.sub_div
        get("endereco").value = dados.end
        get("telefone").value = dados.telefone
        get("cargo").value = dados.cargo
        get("sigla").value = dados.dp

        atualiza_canvas()

    } catch (err) {
        console.log("Código inválido", err)
    }
}

function myFunction() {
    let copyText = get("codigo_entrada")

    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)

    let tooltip = document.getElementById("myTooltip")
    if ((copyText.value).length > 0) tooltip.innerHTML = "Código copiado!"
    else tooltip.innerHTML = "Não há um código aqui... Customize abaixo para poder copiar"
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip")
    tooltip.innerHTML = "Copiar o código de compartilhamento"
}

async function paste() {
    get("codigo_entrada").value = await navigator.clipboard.readText()
}

const quebrarTexto = function (ctx, text, x, y, maxWidth, lineHeight) {

    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ')
    let line = '' // This will store the text of the current line
    let testLine = '' // This will store the text when we add a word, to test if it's too long
    let lineArray = [] // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {

        // Create a test line, and measure it..
        testLine += `${words[n]} `
        let metrics = ctx.measureText(testLine)
        let testWidth = metrics.width

        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y])
            // Increase the line height, so a new line is started
            y += lineHeight
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `
            testLine = `${words[n]} `
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `
        }

        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if (n === words.length - 1) {
            lineArray.push([line, x, y])
        }
    }

    return lineArray
}
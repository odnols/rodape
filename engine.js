const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = 910
canvas.height = 110

const image = new Image(85, 85)
image.src = "./src/brasao.png"

const canvas_timbre = document.createElement("canvas")
document.body.appendChild(canvas_timbre)
const ctx_timbre = canvas_timbre.getContext("2d")

canvas_timbre.width = 900
canvas_timbre.height = 140

const image_timbre = new Image(120, 120)
image_timbre.src = "./src/brasao.png"

const siglas = {
    2: "65px",
    3: "55px",
    4: "37px"
}

function atualiza_canvas() {

    ctx.clearRect(0, 0, 910, 110)
    ctx.restore()

    const cor_links = get("check_cor_links").value
    const cor_linha = get("check_cor_linha").value
    const cor_destaque = get("check_cor_destaque").value

    let cor_titulo = hexToRgb(cor_destaque)
    cor_titulo = `rgb(${cor_titulo.r - 21}, ${cor_titulo.g - 20}, ${cor_titulo.b - 20})`

    let cor_destaque_2 = hexToRgb(cor_destaque)
    cor_destaque_2 = `rgb(${cor_destaque_2.r - 31}, ${cor_destaque_2.g - 22}, ${cor_destaque_2.b - 22})`

    if (cor_destaque !== "#dd3333" || cor_linha !== "#616161" || cor_links !== "#2b63d4")
        get("cor_padrao").style.display = "block"

    if ((get("cargo").value).toLowerCase().includes("chefe"))
        get("select_faixa_superior").style.display = "block"
    else {
        get("faixa_superior").checked = false
        get("select_faixa_superior").style.display = "none"
    }

    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 3

    ctx.shadowColor = "rgba(0, 0, 0, .1)"
    ctx.shadowBlur = 4

    ctx.strokeStyle = "white"
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.roundRect(0, 0, 900, 100, [5, 30, 10, 5])
    ctx.stroke()
    ctx.fill()

    ctx.fillStyle = `rgba(0, 0, 0, 0)`
    ctx.fillRect(0, 0, 910, 110)

    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 2

    if (get("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .3)"

    ctx.fillStyle = cor_destaque
    ctx.fillRect(5, 5, 90, 90)

    ctx.fillStyle = "white"
    ctx.font = `${siglas[(get("sigla").value).length]} Impact`

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText((get("sigla").value).toUpperCase(), 50, 50)

    ctx.shadowColor = "transparent"
    ctx.textAlign = "start"
    ctx.textBaseline = "alphabetic"

    ctx.font = "bold 16px Verdana"
    ctx.fillStyle = cor_titulo
    ctx.fillText(get("nome").value, 110, 25)

    ctx.drawImage(image, 460, 15, image.width, image.height)
    // ctx.drawImage(logo, 5, 5, logo.width, logo.height)

    const emojis = get("emojis").checked ? true : false

    if ((get("cargo").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(get("cargo").value, 110, 45)
    }

    if ((get("sigla").value).length > 0) {

        const e = get("sigla")

        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo
        ctx.fillText(e.options[e.selectedIndex].text, 110, 65)

        ctx.shadowColor = "transparent"
    }

    if ((get("subdivisao").value).length > 0 && get("sub_div_check").checked) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo
        ctx.fillText(get("subdivisao").value, 110, 85)
    }

    if ((get("email").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_links
        ctx.fillText(`${emojis ? "📧 " : ""}${get("email").value}`, 550, 25)
    }

    if ((get("telefone").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(`${emojis ? " 📞 " : ""}${get("telefone").value}`, 550, 45)
    }

    if ((get("endereco").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillStyle = "black"
        ctx.fillText(`${emojis ? "  📍  " : ""}${get("endereco").value}`, 550, 65)
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

    // Editando o canvas do timbre
    return

    ctx_timbre.clearRect(0, 0, 910, 110)
    ctx_timbre.restore()

    if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .1)"

    ctx_timbre.shadowBlur = 4

    ctx_timbre.strokeStyle = "white"
    ctx_timbre.fillStyle = "white"
    ctx_timbre.beginPath()
    ctx_timbre.roundRect(0, 0, 900, 140)
    ctx_timbre.stroke()
    ctx_timbre.fill()

    ctx_timbre.fillStyle = `rgba(0, 0, 0, 0)`
    ctx_timbre.fillRect(0, 0, 900, 140)
    ctx_timbre.shadowBlur = 2

    ctx_timbre.font = `${siglas[(get("sigla").value).length]} Impact`

    ctx_timbre.textAlign = "center" // Alinhando no centro do ponto
    ctx_timbre.textBaseline = "middle" // Alinhando no meio da linha

    ctx_timbre.fillText((get("sigla").value).toUpperCase(), 50, 50)
    ctx_timbre.shadowColor = "transparent"

    ctx_timbre.textAlign = "start"
    ctx_timbre.textBaseline = "alphabetic"

    ctx_timbre.font = "bold 16px Verdana"
    ctx_timbre.fillStyle = cor_titulo
    ctx_timbre.fillText(get("nome").value, 110, 25)

    ctx_timbre.drawImage(image, 15, 25, image_timbre.width, image_timbre.height)

    if ((get("sigla").value).length > 0) {

        const e = get("sigla")
        if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .1)"

        ctx_timbre.font = "13px Verdana"
        ctx_timbre.fillStyle = cor_titulo
        ctx_timbre.fillText(e.options[e.selectedIndex].text, 110, 65)

        ctx_timbre.shadowColor = "transparent"
    }

    if (get("sub_sombra").checked) ctx_timbre.shadowColor = "rgba(0, 0, 0, .2)"

    ctx_timbre.lineWidth = 10
    ctx_timbre.strokeStyle = cor_destaque

    ctx_timbre.shadowOffsetX = 0
    ctx_timbre.shadowOffsetY = 3

    // Linha do topo
    ctx_timbre.beginPath()
    ctx_timbre.moveTo(0, 5)
    ctx_timbre.lineTo(900, 5)

    ctx_timbre.stroke()
}

atualiza_canvas()

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function redefine_cor() {

    get("check_cor_destaque").value = "#dd3333"
    get("check_cor_links").value = "#2b63d4"
    get("check_cor_linha").value = "#616161"
    atualiza_canvas()

    get("sub_cor_padrao").checked = false
    get("cor_padrao").style.display = "none"
}

// function previewImage() {

//     let file = get("logo").files

//     if (file.length > 0) {
//         let fileReader = new FileReader()

//         fileReader.onload = function (event) {
//             logo.src = event.target.result
//             atualiza_canvas()
//         }

//         fileReader.readAsDataURL(file[0])
//     }
// }

function get(alvo) {

    let alvos = document.getElementsByClassName(alvo)

    if (alvos.length < 1)
        alvos = document.getElementById(alvo)

    return alvos
}

function mudar_tema(auto) {

    let tema_atual = localStorage.getItem("tema_rodape")

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
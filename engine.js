const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = 910
canvas.height = 110

const image = new Image(85, 85)
image.src = "./brasao.png"

const siglas = {
    "rh": [15, 75, "65px"],
    "de": [18, 75, "65px"],
    "dj": [22, 75, "65px"],
    "lc": [21, 75, "65px"],
    "dp": [16, 75, "65px"],
    "ds": [16, 75, "65px"],
    "daf": [10, 75, "55px"],
    "das": [7, 75, "55px"],
    "del": [13, 75, "55px"],
    "dvs": [6, 75, "55px"],
    "doe": [8, 75, "55px"],
    "cras": [11, 68, "37px"],
    "dsur": [10, 68, "37px"],
    "dtcj": [15, 68, "37px"],
    "dama": [7, 68, "37px"],
}

function atualiza_canvas() {

    ctx.clearRect(0, 0, 910, 110)
    ctx.restore()

    const cor_links = document.getElementById("check_cor_links").value
    const cor_linha = document.getElementById("check_cor_linha").value
    const cor_destaque = document.getElementById("check_cor_destaque").value

    let cor_titulo = hexToRgb(cor_destaque)
    cor_titulo = `rgb(${cor_titulo.r - 21}, ${cor_titulo.g - 20}, ${cor_titulo.b - 20})`

    let cor_destaque_2 = hexToRgb(cor_destaque)
    cor_destaque_2 = `rgb(${cor_destaque_2.r - 31}, ${cor_destaque_2.g - 22}, ${cor_destaque_2.b - 22})`

    if (cor_destaque !== "#dd3333")
        document.getElementById("cor_padrao").style.display = "block"

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

    if (document.getElementById("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .3)"

    ctx.fillStyle = cor_destaque
    ctx.fillRect(5, 5, 90, 90)

    ctx.fillStyle = "white"
    ctx.font = `${siglas[document.getElementById("sigla").value][2]} Impact`

    ctx.fillText((document.getElementById("sigla").value).toUpperCase(), siglas[document.getElementById("sigla").value][0], siglas[document.getElementById("sigla").value][1])
    ctx.shadowColor = "transparent"

    ctx.font = "bold 16px Verdana"
    ctx.fillStyle = cor_titulo
    ctx.fillText(document.getElementById("nome").value, 110, 25)

    ctx.drawImage(image, 460, 15, image.width, image.height)

    const emojis = document.getElementById("emojis").checked ? true : false

    if ((document.getElementById("cargo").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(document.getElementById("cargo").value, 110, 45)
    }

    if ((document.getElementById("sigla").value).length > 0) {

        const e = document.getElementById("sigla")

        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo
        ctx.fillText(e.options[e.selectedIndex].text, 110, 65)

        ctx.shadowColor = "transparent"
    }

    if ((document.getElementById("subdivisao").value).length > 0 && document.getElementById("sub_div_check").checked) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_titulo
        ctx.fillText(document.getElementById("subdivisao").value, 110, 85)
    }

    if ((document.getElementById("email").value).length > 0) {
        ctx.font = "13px Verdana"
        ctx.fillStyle = cor_links
        ctx.fillText(`${emojis ? "📧 " : ""}${document.getElementById("email").value}`, 550, 25)
    }

    if ((document.getElementById("telefone").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillStyle = cor_linha
        ctx.fillText(`${emojis ? " 📞 " : ""}${document.getElementById("telefone").value}`, 550, 45)
    }

    if ((document.getElementById("endereco").value).length > 0) {
        ctx.font = "11px Verdana"
        ctx.fillStyle = "black"
        ctx.fillText(`${emojis ? "  📍  " : ""}${document.getElementById("endereco").value}`, 550, 65)
    }

    ctx.font = "12px Verdana"
    ctx.fillText("Prefeitura do Município de Tuiuti - ", 550, 90)

    ctx.fillStyle = cor_links
    ctx.fillText("www.tuiuti.sp.gov.br", 758, 90)

    ctx.strokeStyle = cor_destaque
    ctx.lineWidth = 2

    if (document.getElementById("sub_sombra").checked) ctx.shadowColor = "rgba(0, 0, 0, .2)"

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

    if (document.getElementById("borda_triangular").checked) {

        ctx.shadowOffsetX = -5
        ctx.shadowOffsetY = 0

        ctx.fillStyle = cor_destaque_2
        ctx.beginPath()
        ctx.moveTo(780, 0)
        ctx.lineTo(901, 60)
        ctx.lineTo(901, 0)
        ctx.fill()

        ctx.fillStyle = cor_destaque
        ctx.beginPath()
        ctx.moveTo(800, 0)
        ctx.lineTo(901, 60)
        ctx.lineTo(901, 0)
        ctx.fill()
    }

    ctx.shadowColor = "transparent"
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

    document.getElementById("check_cor_destaque").value = "#dd3333"
    document.getElementById("check_cor_links").value = "#2b63d4"
    document.getElementById("check_cor_linha").value = "#909090"
    atualiza_canvas()

    document.getElementById("cor_padrao").style.display = "none"
}
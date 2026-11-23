
let tamanhoFonte = 20;
let fluxoCamera = null;

// LEITURA DE TEXTO
function lerTexto() {
    const texto = document.getElementById("texto").value;

    if (!texto.trim()) {
        alert("Digite um texto primeiro!");
        return;
    }

    speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 0.9;

    speechSynthesis.speak(fala);
}

// PARAR LEITURA
function pararLeitura() {
    speechSynthesis.cancel();
}

// AUMENTAR FONTE
function aumentarFonte() {
    tamanhoFonte += 4;
    document.body.style.fontSize = tamanhoFonte + "px";
}

// DIMINUIR FONTE
function diminuirFonte() {
    tamanhoFonte = Math.max(12, tamanhoFonte - 4);
    document.body.style.fontSize = tamanhoFonte + "px";
}

// ALTO CONTRASTE
function alternarContraste() {
    document.body.classList.toggle("contraste");
}

// ABRIR CÂMERA
async function abrirCamera() {
    try {
        fluxoCamera = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        document.getElementById("camera").srcObject = fluxoCamera;

        falar("Câmera ativada com sucesso.");

    } catch (erro) {
        alert("Não foi possível acessar a câmera.");
    }
}

// TIRAR FOTO
function tirarFoto() {
    const video = document.getElementById("camera");
    const canvas = document.getElementById("canvas");
    const contexto = canvas.getContext("2d");

    if (!video.videoWidth) {
        alert("Primeiro abra a câmera!");
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(video, 0, 0);

    document.getElementById("resultado").innerText =
        "Foto capturada. Para descrever objetos, será necessário conectar um serviço de inteligência artificial.";
    
    falar("Foto capturada com sucesso.");
}

// FALAR MENSAGEM
function falar(mensagem) {
    const voz = new SpeechSynthesisUtterance(mensagem);
    voz.lang = "pt-BR";
    speechSynthesis.speak(voz);
}

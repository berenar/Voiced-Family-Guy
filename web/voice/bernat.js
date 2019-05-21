window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
let rec;
const icon = document.querySelector('i.fa.fa-microphone');
const sound = document.querySelector('.sound');
//const myVideo = document.getElementById('mainVid');

const vPlay = ['play', 'reproducir', 'reproduce', 'reprodueix'];
const vPause = ['pause', 'pausar', 'pausa'];
const vStop = ['stop', 'detener', 'deten', 'parar', 'parate', 'detenir', 'detendre'];
const vENG = ['english', 'ingles', 'angles'];
const vPT = ['portuguese', 'portugal', 'portugues'];
const vCH = ['chinese', 'chino', 'xines'];
const vESP = ['español', 'spanish', 'espanyol', 'castella', 'castellano'];
const vNoSub = ['desactivar subtitulos', 'sin subtitulos', 'no subtitulos', 'quitar subtitulos', 'llevar subtitols',
    'desactivar subtitols', 'fora subtitols', 'disable subtitles', 'no subtitles'];
const vExpand = ['expand', 'full screen', 'fullscreen', 'sunscreen', 'bigger video', 'pantalla completa', 'pantalla grande',
    'aumentar', 'expandir', 'augmentar'];
const vTheme = ['Turn off the lights', 'lights off', 'black theme', 'dark theme', 'me duelen los ojos', 'apaga la luz',
    'apagar la luz', 'apaga las luces', 'tema oscuro', 'fondo negro', 'atura el llum', 'aturar el llum', 'tema obscur'];
const vVolumeUp = ['louder', 'more volume', 'subir volumen', 'mas volumen', 'mes fort', 'pujar volum', 'pujar volumen'];

const vAll = [vPlay, vPause, vStop, vENG, vPT, vCH, vESP, vNoSub, vExpand, vTheme, vVolumeUp];

/*Listener of the mic icon that triggers the sound and the text recognition function*/
icon.addEventListener('click', () => {
    sound.play();
    dictate();
});

/* Remove accents and special characters and to lower case */
function normalitza(rec) {
    return rec.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/* Searches if the recognized text is included in a given array of arrays */
function conte(all_play) {
    for (let i = 0; i < vAll.length; i++) {
        for (let j = 0; j < vAll[i].length; j++) {
            if (normalitza(rec).includes(all_play[i][j])) {
                return i;
            }
        }
    }
};

/* Checks if the recognized text coincides with any of the declared arrays and, if so, executes the matching actions */
const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
        rec = event.results[0][0].transcript;
        console.log(rec);

        if (event.results[0].isFinal) {
            var entes = conte(vAll);
            console.log(entes);
            switch (entes) {
                case 0:
                    playpause();
                    break;
                case 1:
                    playpause();
                    break;
                case 2:
                    stopVid();
                    break;
                case 3:
                    setSubtitles(0);
                    break;
                case 4:
                    setSubtitles(1);
                    break;
                case 5:
                    setSubtitles(2);
                    break;
                case 6:
                    setSubtitles(3);
                    break;
                case 7:
                    removeSubtitles();
                    break;
                case 8:
                    expandVid();
                    break;
                case 9:
                    apagaLlum(document.getElementById('idLlum'));
                    break;
                case 10:
                    //TODO: no funciona
                    volumeVid(0.1);
                    break;
                default:
                    //TODO: sintesi de veu: "no the entes"
                    console.log("Que putes dius amic?")
            }
        }
    }
};


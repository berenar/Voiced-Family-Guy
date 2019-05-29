//TODO: https://stackoverflow.com/questions/22932636/speech-to-text-with-javascript-in-chrome-doesnt-recognize-anything
//TODO: https://www.html5rocks.com/en/tutorials/webrtc/basics/
//TODO: https://www.tutorialspoint.com/html5/html5_web_rtc.htm

//Exemples:
//TODO: https://www.scaledrone.com/blog/webrtc-tutorial-simple-video-chat/
//TODO: https://www.sitepoint.com/webrtc-video-chat-application-simplewebrtc/
//TODO: https://scotch.io/tutorials/build-a-video-chat-service-with-javascript-webrtc-and-okta

// noinspection JSUnresolvedVariable
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
let rec;
const icon = document.querySelector('i.fa.fa-microphone');
const sound = document.querySelector('.sound');

// @formatter:off

/* 00 */
const vPlay = ['play', 'reproducir', 'reproduce', 'reprodueix'];
/* 01 */
const vPause = ['pause', 'pausar', 'pausa'];
/* 02 */
const vStop = ['stop', 'detener', 'deten', 'parar', 'parate', 'detenir', 'detendre'];
/* 03 */
const vENG = ['english', 'ingles', 'angles'];
/* 04 */
const vPT = ['portuguese', 'portugal', 'portugues'];
/* 05 */
const vCH = ['chinese', 'chino', 'xines'];
/* 06 */
const vESP = ['español', 'spanish', 'espanyol', 'castella', 'castellano'];
/* 07 */
const vNoSub = ['desactivar subtitulos', 'sin subtitulos', 'no subtitulos', 'quitar subtitulos',
    'llevar subtitols', 'desactivar subtitols', 'fora subtitols', 'disable subtitles',
    'no subtitles'];
/* 08 */
const vExpand = ['expand', 'full screen', 'fullscreen', 'sunscreen', 'bigger video', 'pantalla completa',
    'pantalla grande', 'aumentar', 'expandir', 'augmentar', 'agrandar'];
/* 09 */
const vTheme = ['Turn off the lights', 'lights off', 'black theme', 'dark theme', 'me duelen los ojos',
    'apaga la luz', 'apagar la luz', 'apaga las luces', 'tema oscuro', 'fondo negro',
    'atura el llum', 'aturar el llum', 'tema obscur'];
/* 10 */
const vVolumeUp = ['louder', 'more volume', 'subir volumen', 'mas volumen', 'mes fort', 'pujar volum',
    'pujar volumen'];
/* 11 */
const vBrian = ['brian', 'brayan', 'perro', 'ca', 'dog', 'per', 'pero', 'gos', 'boss'];
/* 12 */
const vChris = ['chris', 'cris', 'hijo', 'fill', 'son'];
/* 13 */
const vLois = ['lois', 'louis', 'wife', 'guais', 'esposa', 'dona', 'mum', 'mother', 'mare', 'madre'];
/* 14 */
const vMeg = ['meg', 'mec', 'hija', 'daughter', 'filla'];
/* 15 */
const vPeter = ['peter', 'padre', 'pare', 'dad', 'husband', 'marido'];
/* 16 */
const vStewie = ['stewie', 'hijo pequeño', 'youngest son'];
/* 17 */
const vClevelang = ['cleveland', 'negro', 'negre', 'black', 'amigo negro', 'amic negre', 'black friend'];
/* 18 */
const vGlenn = ['glenn', 'pervertido sexual', 'salido', 'amigo blanco', 'amic blanc', 'white friend'];
/* 19 */
const vJoe = ['joe', 'police', 'police friend', 'policia', 'amigo policia', 'poli', 'amic poli',
    'amic policia', 'minusvalid', 'cadira de rodes', 'amic minusvalid', 'silla de ruedas'];

//TODO: canviar quan hagi ficat totes les const
//0..19
const vAll = [vPlay, vPause, vStop, vENG, vPT, vCH, vESP, vNoSub, vExpand, vTheme, vVolumeUp,
    vBrian, vChris, vLois, vMeg, vPeter, vStewie, vClevelang, vGlenn, vJoe];

const array_of_functions = [
    function f_0() {
        myVideo.play();
    },
    function f_1() {
        myVideo.pause();
    },
    function f_2() {
        stopVid();
    },
    function f_3() {
        setSubtitles(0)
    },
    function f_4() {
        setSubtitles(1)
    },
    function f_5() {
        setSubtitles(5)
    },
    function f_6() {
        setSubtitles(4)
    },
    function f_7() {
        removeSubtitles()
    },
    function f_8() {
        expandVid()
    },
    function f_9() {
        apagaLlum(document.getElementById('idLlum'))
    },
    function f_10() {
        volumeVid(0.1)
    },
    function f_11() {
        click_personatge('Brian_Griffin')
    },
    function f_12() {
        click_personatge('Chris_Griffin')
    },
    function f_13() {
        click_personatge('Lois_Griffin')
    },
    function f_14() {
        click_personatge('Meg_Griffin')
    },
    function f_15() {
        click_personatge('Peter_Griffin')
    },
    function f_16() {
        click_personatge('Stewie_Griffin')
    },
    function f_17() {
        click_personatge('Cleveland_Brown')
    },
    function f_18() {
        click_personatge('Glenn_Quagmire')
    },
    function f_19() {
        click_personatge('Joe_Swanson')
    }
];

// @formatter:on

/* Actions to execute to listen to the user */
function actionMic() {
    sound.play();
    dictate();
}

/*Listener of the mic icon that triggers the sound and the text recognition function*/
icon.addEventListener('click', () => {
    actionMic();
});

/* Trigger actionMic() whenever the space bar is pressed */
document.onkeydown = keydown;

function keydown(evt) {
    if (evt.ctrlKey && evt.keyCode == 32) { //CTRL+SPACE
        evt.preventDefault();
        actionMic();
    }
}

/* Remove accents and special characters and to lower case */
function normalitza(rec) {
    return rec.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/* Searches if the recognized text is included in a given array of arrays */
function index_func_conte(all_play) {
    for (let i = 0; i < vAll.length; i++) {
        for (let j = 0; j < vAll[i].length; j++) {
            if (normalitza(rec).includes(all_play[i][j])) {
                return i;
            }
        }
    }
}

/* Checks if the recognized text coincides with any of the declared arrays and, if so, executes the matching actions */
const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
        rec = event.results[0][0].transcript;
        console.log(rec);
        if (event.results[0].isFinal) {
            try {
                //Execute the action corresponding to the understood word
                array_of_functions[index_func_conte(vAll)]();
            } catch (e) {
                //Word not recognized
                console.log("Què putes dius amic");
                console.log(e.stack);
            }
        }
    }
};


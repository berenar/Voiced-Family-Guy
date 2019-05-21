window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
let rec;
const icon = document.querySelector('i.fa.fa-microphone');
const sound = document.querySelector('.sound');
//const myVideo = document.getElementById('mainVid');

const all_play = ['play', 'reproducir', 'reproduce', 'reprodueix'];
const all_pause = ['pause', 'pausar', 'pausa'];
const all_stop = ['stop', 'detener', 'deten', 'detenir'];
const all_ENG = ['english', 'ingles', 'angles'];
const all_PT = ['portuguese', 'portugal', 'portugues'];
const all_CH = ['chinese', 'chino', 'xines'];
const all_ESP = ['español', 'spanish', 'espanyol', 'castella', 'castellano'];


/*Listener of the mic icon that triggers the sound and the text recognition function*/
icon.addEventListener('click', () => {
    sound.play();
    dictate();
});

/* Remove accents and special characters and to lower case */
function normalitza(rec) {
    return rec.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/* Searches if the recognized text is included in a given array of Strings */
function conte(all_play) {
    for (let i = 0; i < all_play.size(); i++) {
        if (normalitza(rec).includes(all_play[i])) {
            return true;
        }
    }
    return false;
}

/* Checks if the recognized text coincides with any of the declared arrays and, if so, executes the matching actions */
const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
        rec = event.results[0][0].transcript;
        console.log(rec);

        if (event.results[0].isFinal) {

            if (conte(all_play)) {
                myVideo.play();
            } else if (conte(all_pause)) {
                myVideo.pause();
            } else if (conte(all_stop)) {
                myVideo.stop();
            }
        }
    }
}


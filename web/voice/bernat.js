window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
    sound.play();
    dictate();
});

//TODO: fer que sigui case insensitive

const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        console.log(speechToText);

        if (event.results[0].isFinal) {

            if (speechToText.includes('Reproducir')) {
                document.getElementById('mainVid').play();
            } else if (speechToText.includes('pausar')) {
                document.getElementById('mainVid').pause();
            }
        }
    }
}

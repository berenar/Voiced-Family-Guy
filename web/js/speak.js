var synth = window.speechSynthesis;
var buttonSpeak = document.getElementById('speak');
var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var voices = [];

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        console.log("Aún está hablando!");
        return;
    }
    if (inputTxt.value !== '') {
        inputTxt.value = document.getElementById('tospeak').innerHTML;
        var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
        utterThis.onend = function () {
            console.log("He acabado de hablar");
        };
        utterThis.onerror = function () {
            console.error("Error de habla");
        };
        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        console.log(selectedOption);
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
            }
        }
        synth.speak(utterThis);
    }
}


function xerra() {
    event.preventDefault();

    speak();

    inputTxt.blur();
}

voiceSelect.onchange = function () {
    speak();
}

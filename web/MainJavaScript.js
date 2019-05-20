var personatges =["Brian_Griffin","Chris_Griffin","Cleveland_Brown","Glenn_Quagmire","Joe_Swanson","Lois_Griffin","Meg_Griffin",
    "Peter_Griffin","Stewie_Griffin"];

var myVideo = document.getElementById("mainVid");
var puntuacion = 0;
var pNumber =1;
var scene_track = myVideo.textTracks[2];
// var curiositats_track = myVideo.textTracks[];
var gag_track = myVideo.textTracks[3];


$(function () {
    start_track ();
});

function click_personatge(personatge) {
    var max;
    var min;
    var rnd;
    min = 0;
    max= scene_track.cues.length-1;
    rnd = Math.round(Math.random() * (max - min) + min);
    console.log(rnd.toString());
    var info = JSON.parse(scene_track.cues[rnd].text);

    if (info.characters.includes(personatge)){
        myVideo.play();
        myVideo.currentTime=scene_track.cues[rnd].startTime.toString();
        console.log(myVideo.currentTime);
        //ja que el video s'iniciiara, canviar el boto principal de Pause a Play
        $('#control-play').find('i').removeClass('fa-play').addClass('fa-pause');
    }else{
        click_personatge(personatge)
    }
}

function buscar() {
    var tag = document.getElementById("tag-filters").value;
    var cue;
    for (l = 0; l < scene_track.cues.length; l++){
        cue = scene_track.cues[l];
        var sceneInfo = JSON.parse(cue.text);
        if (sceneInfo.tags.includes(tag)){

            myVideo.play();
            myVideo.currentTime=scene_track.cues[l].startTime.toString();
            console.log(myVideo.currentTime);
            //ja que el video s'iniciiara, canviar el boto principal de Pause a Play
            $('#control-play').find('i').removeClass('fa-play').addClass('fa-pause');
            break;
        }
    }
}

const espera = ( function() {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function destaca (){
    //canvia a groc
    document.getElementById("peu").style.background="#ffff66";
    //canvia al color original despres d'1 segon
    espera(function(){
        document.getElementById("peu").style.background="#f2f2f2";
    }, 1000 ); // end espera
}

const fons = document.getElementById('fons');
fons.style.background = 'white';

const fonsWell = document.getElementById('idwell');
const color_fonsWell = fonsWell.style.background;

const fonsrow = document.getElementById('idrow');
const color_fonsrow = fonsrow.style.background;

function apagaLlum(o) {
    if (fons.style.background === 'white') {
        //apagar
        fons.style.background = 'black';
        fonsWell.style.background = '#1a1a1a';
        fonsrow.style.background = '##595959';
        o.innerHTML = 'Encender luces';

    }
    else {
        //encendre
        fons.style.background = 'white';
        fonsWell.style.background = color_fonsWell;
        fonsrow.style.background = color_fonsrow;
        o.innerHTML = 'Apagar luces';
    }
}
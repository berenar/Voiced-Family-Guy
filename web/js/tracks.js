function start_track () {
    myVideo.addEventListener('loadeddata', function() {
        // console.log("He acabado el load");
        scene_track.mode = 'showing';
        gag_track.mode = 'showing';
    }, false);
        // Cada vez que se cambie el cue: Actualizamos panel de informacion de escena (t characters y screenshots)
        var modal = document.getElementById('myModal');
        //modal.style.display = "none";
        scene_track.oncuechange = function() {
            element = document.getElementById('Personatges');
            for (s in personatges){
                personatge = document.getElementById(personatges[s]);
                personatge.style.opacity="0.2";
            }
            var activeCue = scene_track.activeCues[0];
            if (activeCue) {
                var info = JSON.parse(activeCue.text);
                for (i in info.characters){
                    // console.log(info.characters[i]);
                    // console.log(myVideo.currentTime);
                    element = document.getElementById(info.characters[i]);
                    element.style.opacity="0.9";
                }
            }
        };
        // console.log(scene_track);
        // console.log(gag_track);

        gag_track.oncuechange = function() {
            var gagActiveCue = gag_track.activeCues[0];
            if (gagActiveCue){
                var timeAux = (gagActiveCue.endTime-gagActiveCue.startTime)*1000;
                setTimeout(function(){
                    var gagInfo = JSON.parse(gagActiveCue.text);
                    myVideo.pause();
                    document.getElementById("gagTitol").innerHTML = gagInfo.titol;
                    document.getElementById("gagImage").src=gagInfo.captura;
                    modal.style.display = "block";
                 }, timeAux);
            }
        };
}
function quitarModalyGuardar(valor) {
        debugger;
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
        myVideo.play();
        puntuacion = puntuacion + valor;
        actualizar_estrellas(puntuacion/pNumber);
        actualizar_barras(valor);
        pNumber = pNumber + 1;
}

function actualizar_estrellas(valor) {
    debugger;
    var estrellasLlenas = Math.trunc(valor);
    for (i = 0; i < estrellasLlenas; i++) {
        document.getElementById('estrella' + i.toString()).className = 'fas fa-star checked';
    }
    for (j = estrellasLlenas; j < 5; j++) {
        document.getElementById('estrella' + j.toString()).className = 'fas fa-star';
    }

}

function actualizar_barras(valor) {
    for(i = 1; i<=5; i++){
        var valorEtiqueta = document.getElementById('barra'+i+'val');
        var numero = parseFloat(valorEtiqueta.innerHTML);
        if (valor === i) {
            numero = numero + 1;
            valorEtiqueta.innerText = numero.toString();
        }
        var porcentaje = ((numero/ pNumber).toFixed(2))*100;
        document.getElementById("bar"+i).style.width = porcentaje.toString()+"%";
    }
}

$('#tag-filter').click(function () {
    debugger;
    buscar();
});







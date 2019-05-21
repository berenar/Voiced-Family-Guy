$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    init_video_controls();
    init_subtitles();
});
const languages = {'en': 0, 'pt': 1, 'es': 4, 'xi': 5};

function init_subtitles() {


    $('.set-subtitle').click(function () {
        // amagar tots els tracks
        for (let i = 0; i < myVideo.textTracks.length; i++) myVideo.textTracks[i].mode = 'hidden';
        //mostrar nomes aquell track de subtitols
        console.log("mostrar nomes aquell track de subtitols");
        myVideo.textTracks[languages[$(this).attr('lang')]].mode = 'showing';
        $(this).attr('data-state', 'active')
    });

    $('#control-no-sub').click(function () {
        removeSubtitles();
    });
}

function setSubtitles(idioma) {
    myVideo.textTracks[languages[idioma]].mode = 'showing';
    //$(this).attr('data-state', 'active')
}

function removeSubtitles(){
    //amagar tots els subtitols
    for (let i = 0; i < myVideo.textTracks.length; i++) myVideo.textTracks[i].mode = 'hidden';
}
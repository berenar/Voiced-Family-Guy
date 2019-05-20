function init_video_controls() {
    myVideo.addEventListener('loadedmetadata', function () {
        $('#duration').text(get_normalized_time(myVideo.duration));
        $('#filter-btn').prop("disabled", false);
    });

    // By the time the video has ended, it will be back at starter point
    myVideo.onended = function () {
        $('#control-stop').click()
    };

    // Play/Pause Button
    $('#control-play').click(function () {
        playpause();
    });

    // Stop Button
    $('#control-stop').click(function () {
        $('#control-play').find('i').removeClass('fa-pause').addClass('fa-play');
        myVideo.pause();
        myVideo.currentTime = 0;
    });

    // On change on the volume input range
    $('#control-volume-range').on('change', function () {
        update_volume()
    });

    // Full Screen Button
    $('#control-expand').click(function () {
        if (myVideo.requestFullscreen) {
            myVideo.requestFullscreen();
        } else if (myVideo.mozRequestFullScreen) { /* Firefox */
            myVideo.mozRequestFullScreen();
        } else if (myVideo.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            myVideo.webkitRequestFullscreen();
        } else if (myVideo.msRequestFullscreen) { /* IE/Edge */
            myVideo.msRequestFullscreen();
        }
    });
    // Every time that changes the current time of the video
    $('#mainVid').bind('timeupdate', function () {
        $("#actual-progress").slider('value', (myVideo.currentTime / myVideo.duration) * 100);
        $('#actual-time').text(get_normalized_time(myVideo.currentTime));
    });

    // Video time slider
    $("#actual-progress").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 100
    });

    // When you click over the slider, you will be redirected to that specific time
    $("#actual-progress").slider({
        slide: function (event, ui) {
            myVideo.currentTime = (ui.value * myVideo.duration) / 100
        }
    });
}

function update_volume() {
    myVideo.volume = parseFloat(($('#control-volume-range').val() / 100)).toFixed(1);
}

function get_normalized_time(totalSeconds) {
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    seconds = seconds.toFixed(0);
    if (seconds.length === 1) seconds = '0' + seconds;
    if (minutes < 9) minutes = '0' + minutes;
    return ((hours > 0) ? hours + ':' : '') + ((minutes > 0) ? minutes + ':' : '00:') + seconds
}

function playpause() {
    if (myVideo.paused) {
        $('#control-play').find('i').removeClass('fa-play').addClass('fa-pause');
        myVideo.play();
    } else {
        $('#control-play').find('i').removeClass('fa-pause').addClass('fa-play');
        myVideo.pause();
    }
}
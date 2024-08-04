document.getElementById('menu-toggle').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.querySelector('.play');
    const muteButton = document.querySelector('.mute');
    const progressBar = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    if (!audio || !playButton || !muteButton || !progressBar || !currentTimeDisplay || !durationDisplay) {
        console.error('Elemen tidak ditemukan');
        return;
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play().then(() => {
                playButton.innerHTML = '&#10074;&#10074;'; // Pause icon
            }).catch(error => {
                console.error('Gagal memutar audio:', error);
            });
        } else {
            audio.pause();
            playButton.innerHTML = '&#9658;'; // Play icon
        }
    }

    function toggleMute() {
        audio.muted = !audio.muted;
        muteButton.innerHTML = audio.muted ? '&#128263;' : '&#128266;';
    }

    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Bind button events
    playButton.addEventListener('click', togglePlay);
    muteButton.addEventListener('click', toggleMute);
});

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

const songs = document.querySelectorAll('.song');
const songList = document.getElementById('song-list');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const muteBtn = document.getElementById('mute-btn');

audio.src = songs[currentSongIndex].getAttribute('data-src');

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}); 

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].getAttribute('data-src');
    audio.play();  
    isPlaying = true;
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].getAttribute('data-src');
    audio.play();  
    isPlaying = true;
});

function loadSong(index) {
    audio.src = songs[index].getAttribute('data-src');
    if(isPlaying) {
        audio.play();
    }
}

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value /100) * audio.duration;
    audio.currentTime = seekTime;
});

function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

muteBtn.addEventListener('click', () => { 
    if(audio.volume > 0) {
        audio.volume = 0;
        volumeBar.value = 0;
    } else {
        audio.volume = 1;
        volumeBar.value = 100;
    }
});

audio.addEventListener('ended',() => {
    currentSongIndex = currentSongIndex + 1 % songs.length;
    loadSong(currentSongIndex);    
})


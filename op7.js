const hugBtn = document.getElementById('hugBtn');
const hugPopup = document.getElementById('hugPopup');
const closeHugPopup = document.getElementById('closeHugPopup');
const heartbeat = document.getElementById('heartbeat');
const hugVideo = document.getElementById('hugVideo');

hugBtn.addEventListener('click', () => {
    hugPopup.classList.add('active');
    heartbeat.currentTime = 0;
    heartbeat.play();
    if (hugVideo) {
        hugVideo.currentTime = 0;
        hugVideo.play();
    }
});

closeHugPopup.addEventListener('click', () => {
    hugPopup.classList.remove('active');
    heartbeat.pause();
    heartbeat.currentTime = 0;
    if (hugVideo) {
        hugVideo.pause();
        hugVideo.currentTime = 0;
    }
});

// Optional: close popup when clicking outside the content
hugPopup.addEventListener('click', (e) => {
    if (e.target === hugPopup) {
        hugPopup.classList.remove('active');
        heartbeat.pause();
        heartbeat.currentTime = 0;
        if (hugVideo) {
            hugVideo.pause();
            hugVideo.currentTime = 0;
        }
    }
});
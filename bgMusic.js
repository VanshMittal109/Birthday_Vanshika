// Function to handle background music autoplay
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.3; // Set volume to 30%
        
        // Try to play the music
        const playPromise = bgMusic.play();
        
        // Handle the play promise
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                console.log('Background music started successfully');
            }).catch(error => {
                // Autoplay was prevented
                console.log('Autoplay prevented:', error);
                
                // Add click event listener as fallback
                document.addEventListener('click', function() {
                    bgMusic.play();
                }, { once: true });
            });
        }
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initBackgroundMusic); 
document.addEventListener('DOMContentLoaded', () => {
    const balloonsContainer = document.getElementById('balloons-container');
    const finalMessage = document.getElementById('final-message');
    const popSound = document.getElementById('popSound');
    let poppedBalloons = 0;
    const totalBalloons = 19;
    const maxBalloonsOnScreen = 5;

    const messages = [
        "You're amazing! 💖",
        "You make me smile! 😊",
        "You're my favorite! 💝",
        "You're so special! 💕",
        "You're the best! 💗",
        "You're incredible! 💓",
        "You're wonderful! 💞",
        "You're perfect! 💘",
        "You're beautiful! 💖",
        "You're my everything! 💝"
    ];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        balloon.style.animationDuration = (Math.random() * 2 + 3) + 's';
        balloon.style.animationDelay = '0s';
        balloon.style.backgroundColor = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
        return balloon;
    }

    function showMessage(x, y, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;
        messageElement.style.left = x + 'px';
        messageElement.style.top = y + 'px';
        document.body.appendChild(messageElement);
        setTimeout(() => messageElement.remove(), 2000);
    }

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.querySelector('.hearts').appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }

    function showFinalMessage() {
        finalMessage.style.display = 'block';
        finalMessage.querySelector('.congrats').textContent = "Congratulations! You're now 19 years old! 🎉🎂";
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                createHeart(x, window.innerHeight);
            }, i * 200);
        }
    }

    function popBalloon(balloon, event) {
        if (!balloon.classList.contains('popped')) {
            balloon.classList.add('popped');
            popSound.currentTime = 0;
            popSound.play();
            
            const message = messages[poppedBalloons % messages.length];
            showMessage(event.clientX, event.clientY, message);
            
            poppedBalloons++;
            
            // Check if all balloons on screen are popped
            const activeBalloons = balloonsContainer.querySelectorAll('.balloon:not(.popped)');
            if (activeBalloons.length === 0) {
                // Spawn a new set of balloons instantly
                for (let i = 0; i < maxBalloonsOnScreen; i++) {
                    addNewBalloon();
                }
            }

            // Check if total balloons are popped
            if (poppedBalloons === totalBalloons) {
                setTimeout(showFinalMessage, 1000);
            }
        }
    }

    function addNewBalloon() {
        if (balloonsContainer.children.length < maxBalloonsOnScreen && poppedBalloons < totalBalloons) {
            const balloon = createBalloon();
            balloon.addEventListener('click', (event) => popBalloon(balloon, event));
            balloonsContainer.appendChild(balloon);
            
            // Shorter removal time (4 seconds instead of 8)
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                    // Add a new balloon instantly if we're below max
                    if (balloonsContainer.children.length < maxBalloonsOnScreen && poppedBalloons < totalBalloons) {
                        addNewBalloon();
                    }
                }
            }, 4000);
        }
    }

    // Create initial balloons
    for (let i = 0; i < maxBalloonsOnScreen; i++) {
        addNewBalloon();
    }
});

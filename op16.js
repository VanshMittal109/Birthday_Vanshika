document.addEventListener('DOMContentLoaded', () => {
    const kissButton = document.querySelector('.kiss-button');
    const kissCount = document.querySelector('.kiss-count');
    const messageContainer = document.querySelector('.message-container');
    const heartsContainer = document.querySelector('.hearts');
    const finalMessage = document.querySelector('.final-message');
    const congrats = document.querySelector('.congrats');
    
    let count = 0;
    const targetCount = 1000;
    const messages = [
        "Keep going! 💋",
        "You're doing great! 💕",
        "Almost there! 💖",
        "Just a few more! 💝",
        "You're amazing! 💗",
        "Keep kissing! 💘",
        "Love is in the air! 💓",
        "You're getting closer! 💞",
        "Don't stop now! 💟",
        "You're a kissing champion! 💌"
    ];

    const specialMessages = {
        100: "💋 100 Kisses! You're getting warmed up! 💋",
        300: "💋 300 Kisses! You're on fire! 💋",
        500: "💋 500 Kisses! Halfway to forever! 💋",
        1000: "💋 1000 Kisses! You're my forever kisser! 💋"
    };

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    function showMessage() {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        messageContainer.innerHTML = '';
        messageContainer.appendChild(message);
    }

    function showSpecialMessage(message) {
        const specialMessage = document.createElement('div');
        specialMessage.className = 'message';
        specialMessage.textContent = message;
        messageContainer.innerHTML = '';
        messageContainer.appendChild(specialMessage);
    }

    function celebrate() {
        finalMessage.style.display = 'block';
        congrats.textContent = "Congratulations! You've reached 1000 kisses! 💋💖";
        
        // Create more hearts for celebration
        setInterval(createHeart, 200);
    }

    kissButton.addEventListener('click', () => {
        count++;
        kissCount.textContent = count;
        
        // Create a heart on each click
        createHeart();
        
        // Show random message every 10 kisses
        if (count % 10 === 0) {
            showMessage();
        }
        
        // Show special messages at milestones
        if (specialMessages[count]) {
            setTimeout(() => {
                showSpecialMessage(specialMessages[count]);
            }, 1000);
        }
        
        // Celebrate when reaching target
        if (count === targetCount) {
            celebrate();
        }
    });

    // Initial heart creation
    setInterval(createHeart, 1000);
});

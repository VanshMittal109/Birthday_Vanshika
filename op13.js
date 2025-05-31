document.addEventListener('DOMContentLoaded', function() {
    const candlesContainer = document.getElementById('candlesContainer');
    const blowSound = document.getElementById('blowSound');
    const totalCandles = 19;

    // TODO: Replace with your actual image paths
    const CANDLE_ON_IMAGE = 'candle.png';
    const CANDLE_OFF_IMAGE = 'candle-off.png';

    // Circle parameters
    const centerX = 35; // percent
    const centerY = 102; // percent (shifted further down)
    const radius = 40;  // percent (slightly larger spread)

    for (let i = 0; i < totalCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';

        const candleImg = document.createElement('img');
        candleImg.src = CANDLE_ON_IMAGE;
        candleImg.alt = 'Candle';

        candle.appendChild(candleImg);

        // Position in a circle, last candle in the center
        let x, y;
        if (i < totalCandles - 1) {
            const angle = (2 * Math.PI / (totalCandles - 1)) * i - Math.PI / 2;
            x = centerX + radius * Math.cos(angle);
            y = centerY + radius * Math.sin(angle);
        } else {
            x = centerX;
            y = centerY;
        }
        candle.style.left = `${x}%`;
        candle.style.top = `${y}%`;

        // Interactivity
        candle.addEventListener('click', function() {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blowing');
                blowSound.currentTime = 0;
                blowSound.play().catch(() => {});
                setTimeout(() => {
                    candle.classList.remove('blowing');
                    candle.classList.add('blown');
                    candleImg.src = CANDLE_OFF_IMAGE;
                }, 500);
            }
        });

        candlesContainer.appendChild(candle);
    }
}); 
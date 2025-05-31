const sections = [
    { type: 'message', content: 'You really doing so good my love!' },
    { type: 'image', content: "photobooth/photo20.jpg" },
    { type: 'message', content: 'Well! you got kiss bombed here!' },
    { type: 'image', content: 'photobooth/photo19.jpg' },
    { type: 'message', content: 'ohooo!! Looking so pretty wowww!' },
    { type: 'image', content: 'photobooth/photo21.jpg' },
    { type: 'message', content: 'I LOVE YOU SOOOOO MUCH!!' },
    { type: 'image', content: 'photobooth/photo22.jpg' }
];

const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
const closePopup = document.getElementById('closePopup');
const numSections = sections.length;
const sectionAngle = 2 * Math.PI / numSections;
let currentAngle = 0;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < numSections; i++) {
        ctx.beginPath();
        ctx.moveTo(175, 175);
        ctx.arc(175, 175, 170, i * sectionAngle + currentAngle, (i + 1) * sectionAngle + currentAngle);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? 'rgb(113, 0, 20)' : 'rgb(22, 22, 2)';
        ctx.fill();
        ctx.save();
        ctx.translate(175, 175);
        ctx.rotate((i + 0.5) * sectionAngle + currentAngle);
        ctx.textAlign = 'right';
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(sections[i].type === 'message' ? 'hmmmm' : 'HMMMM', 150, 10);
        ctx.restore();
    }
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(175, 10);
    ctx.lineTo(165, 40);
    ctx.lineTo(185, 40);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
}

drawWheel();

function spinWheel() {
    if (spinning) return;
    spinning = true;
    resultDiv.innerHTML = '';
    let spinAngle = Math.random() * 2 * Math.PI + 8 * Math.PI; // 4 full spins + random
    let duration = 3000; // 3 seconds
    let start = null;
    let startAngle = currentAngle;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let elapsed = timestamp - start;
        let progress = Math.min(elapsed / duration, 1);
        // Ease out
        let angle = startAngle + spinAngle * (1 - Math.pow(1 - progress, 3));
        currentAngle = angle % (2 * Math.PI);
        ctx.clearRect(0, 0, 350, 350);
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            showResult();
        }
    }
    requestAnimationFrame(animate);
}

function showResult() {
    // The pointer is at -90deg (top), so calculate the section at that angle
    let pointerAngle = (3 * Math.PI / 2 - currentAngle + 2 * Math.PI) % (2 * Math.PI);
    let index = Math.floor(pointerAngle / sectionAngle) % numSections;
    const section = sections[index];
    // Show popup for both message and image
    if (section.type === 'message') {
        popupImg.style.display = 'none';
        popupImg.src = '';
        // Create or update a message div inside popup
        let msgDiv = document.getElementById('popupMsg');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'popupMsg';
            msgDiv.style.fontSize = '22px';
            msgDiv.style.fontFamily = 'Font1';
            msgDiv.style.marginTop = '20px';
            msgDiv.style.color = '#a83279';
            msgDiv.style.background = '#fff';
            msgDiv.style.padding = '20px 30px';
            msgDiv.style.borderRadius = '18px';
            msgDiv.style.boxShadow = '0 4px 16px #0008';
            msgDiv.style.textAlign = 'center';
            popup.appendChild(msgDiv);
        }
        msgDiv.innerHTML = section.content;
        msgDiv.style.display = 'block';
        popup.classList.add('active');
    } else if (section.type === 'image') {
        let msgDiv = document.getElementById('popupMsg');
        if (msgDiv) msgDiv.style.display = 'none';
        popupImg.src = section.content;
        popupImg.style.display = 'block';
        popup.classList.add('active');
    }
}

spinBtn.addEventListener('click', spinWheel);

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    popupImg.src = '';
    let msgDiv = document.getElementById('popupMsg');
    if (msgDiv) msgDiv.style.display = 'none';
});

// Close popup when clicking outside the image or message
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
        popupImg.src = '';
        let msgDiv = document.getElementById('popupMsg');
        if (msgDiv) msgDiv.style.display = 'none';
    }
});

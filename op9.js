const roseMessages = {
    red:   "Red is the color of love and strong feelings. You are my red lovely bear. You're the reason my heart beats faster and my face smiles without even trying. I love you sooo much! ❤️",
    white: "White means peace and love that never ends. You are my white. You're so pure, kind, and forever mine. You make my heart feel full and safe.🤍",
    pink:  "Pink is sweet and soft, just like you. You are my pink my cutie. You're my sweet smile, the one who makes my heart go “aww!! ye kinna paaaruuu haii” all day long.💗",
    yellow:"As yellow signifies joy and all things warm and bright, I just want to tell you… you are my yellow, darling. You light up my life, make my heart smile, and bring a glow to even my dullest days. With you, everything feels like golden hour. 💛",
    blue:  "As blue stands for calmness, you are my blue sweetheart. You're my peace, my safest place. With you, I never feel lost baccha💙"
};

const roses = document.querySelectorAll('.rose');
const modal = document.getElementById('roseModal');
const modalMsg = document.getElementById('roseModalMessage');
const modalClose = document.getElementById('roseModalClose');

roses.forEach(rose => {
    rose.addEventListener('click', () => {
        const type = rose.getAttribute('data-rose');
        modalMsg.textContent = roseMessages[type];
        modal.classList.add('active');
    });
    // Keyboard accessibility
    rose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            rose.click();
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Optional: ESC key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
    }
});

const bucketGoals = [
    "Treat You everything special around my home.",
    "A cuddle and sleep",
    "Adopt a cat",
    "Cook a meal together",
    "Give you whole lot of new experiences",
    "A trip Together",
];

const bucketImg = document.getElementById('bucketImg');
const shakeBtn = document.getElementById('shakeBtn');
const bucketList = document.getElementById('bucketList');
const partySound = document.getElementById('partySound');

let revealed = 0;

shakeBtn.addEventListener('click', () => {
    // Shake animation
    bucketImg.classList.remove('shake');
    void bucketImg.offsetWidth; // reflow for restart
    bucketImg.classList.add('shake');

    // Reveal next item
    if (revealed < bucketGoals.length) {
        const li = document.createElement('li');
        li.textContent = bucketGoals[revealed];
        bucketList.appendChild(li);
        revealed++;
        // Scroll to the new item on mobile
        li.scrollIntoView({ behavior: "smooth", block: "center" });
        // Play party sound after last item
        if (revealed === bucketGoals.length) {
            setTimeout(() => {
                partySound.currentTime = 0;
                partySound.play();
            }, 700);
        }
    }
});

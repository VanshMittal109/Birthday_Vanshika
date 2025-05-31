const memories = [
    {
        type: "image",
        media: "photobooth/photo23.jpg",
        clear: "photobooth/photo23.jpg"
    },
    {
        type: "image",
        media: "photobooth/photo37.jpg",
        clear: "photobooth/photo37.jpg"
    },
    {
        type: "image",
        media: "photobooth/photo24.jpg",
        clear: "photobooth/photo24.jpg"
    },
    {
        type: "image",
        media: "photobooth/photo26.jpg",
        clear: "photobooth/photo26.jpg"
    },
    {
        type: "video",
        media: "photobooth/video1.mp4",
        clear: "photobooth/video1.mp4"
    }
    // Add more memories as needed
];

let current = 0;
let revealed = false;

const container = document.getElementById('memory-container');
const finalMessage = document.getElementById('final-message');

function renderMemory(idx) {
    const mem = memories[idx];
    revealed = false;
    container.innerHTML = "";

    // Media
    let mediaEl;
    if (mem.type === "image") {
        mediaEl = document.createElement("img");
        mediaEl.src = mem.media;
        mediaEl.className = "memory-media blurred";
    } else if (mem.type === "video") {
        mediaEl = document.createElement("video");
        mediaEl.src = mem.media;
        mediaEl.className = "memory-media blurred";
        mediaEl.muted = true;
        mediaEl.autoplay = true;
        mediaEl.loop = true;
        mediaEl.playsInline = true;
    }
    container.appendChild(mediaEl);

    // Guessed button
    const guessedBtn = document.createElement("button");
    guessedBtn.className = "memory-btn";
    guessedBtn.textContent = "Guessed!";
    container.appendChild(guessedBtn);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "memory-next-btn";
    nextBtn.textContent = "Next";
    nextBtn.style.display = "none";
    container.appendChild(nextBtn);

    // Events
    guessedBtn.onclick = () => {
        if (revealed) return;
        // Reveal clear media
        if (mem.type === "image") {
            mediaEl.src = mem.clear;
        } else if (mem.type === "video") {
            mediaEl.src = mem.clear;
            mediaEl.muted = false;
        }
        mediaEl.classList.remove("blurred");
        nextBtn.style.display = "block";
        revealed = true;
    };
    nextBtn.onclick = () => {
        if (current < memories.length - 1) {
            current++;
            renderMemory(current);
        } else {
            container.style.display = "none";
            finalMessage.style.display = "block";
        }
    };
}

// Start
renderMemory(current);

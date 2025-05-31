const PUZZLE_SIZE = 3; // 3x3 grid
const CANVAS_SIZE = 900; // 900x900px
const PIECE_SIZE = CANVAS_SIZE / PUZZLE_SIZE; // 300px
const LEVELS = 10;
const images = [];
const messages = [
    "You complete my puzzle, piece by piece ❤️",
    "Every memory with you is picture perfect 🖼️",
    "Your smile is my favorite part 🧩",
    "We fit together better than any puzzle 💕",
    "I'd put the world together to keep you happy 🌎",
    "Our love is a masterpiece in progress 🎨",
    "You make life less puzzling 😄",
    "Every moment with you is a piece of paradise 🌺",
    "You're the missing piece I didn't know I needed 💘",
    "Now that you solved it all… Will you always be mine? 💍"
];

let currentLevel = 0;
let pieces = [];
let placed = [];
let selectedPiece = null;
let selectedEl = null;
let isGameActive = false;

// Preload images
const loadingScreen = document.getElementById('loading-screen');
let loadedCount = 0;
for (let i = 1; i <= LEVELS; i++) {
    const img = new Image();
    img.src = `jigsaw/img${i}.jpg`;
    img.onload = () => {
        loadedCount++;
        if (loadedCount === LEVELS) {
            loadingScreen.style.display = 'none';
            startLevel(0);
        }
    };
    images.push(img);
}

// DOM elements
const canvas = document.getElementById('puzzle-canvas');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
const ctx = canvas.getContext('2d');
const piecesContainer = document.getElementById('pieces-container');
const messageContainer = document.getElementById('message-container');
const levelMessage = document.getElementById('level-message');
const nextLevelBtn = document.getElementById('next-level-btn');
const finalMessage = document.getElementById('final-message');

// Puzzle logic
function startLevel(level) {
    currentLevel = level;
    placed = Array(PUZZLE_SIZE * PUZZLE_SIZE).fill(null);
    pieces = [];
    piecesContainer.innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelMessage.textContent = '';
    levelMessage.classList.remove('visible');
    nextLevelBtn.style.display = 'none';
    finalMessage.style.display = 'none';
    isGameActive = true;
    selectedPiece = null;
    selectedEl = null;

    // Create pieces
    for (let y = 0; y < PUZZLE_SIZE; y++) {
        for (let x = 0; x < PUZZLE_SIZE; x++) {
            pieces.push({
                sx: x * PIECE_SIZE,
                sy: y * PIECE_SIZE,
                x: 0,
                y: 0,
                idx: y * PUZZLE_SIZE + x,
                img: images[level]
            });
        }
    }
    // Shuffle pieces
    pieces = pieces.sort(() => Math.random() - 0.5);

    // Render pieces in container
    pieces.forEach((piece, i) => {
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = PIECE_SIZE;
        pieceCanvas.height = PIECE_SIZE;
        pieceCanvas.className = 'piece';
        const pctx = pieceCanvas.getContext('2d');
        pctx.drawImage(
            piece.img,
            piece.sx, piece.sy, PIECE_SIZE, PIECE_SIZE,
            0, 0, PIECE_SIZE, PIECE_SIZE
        );
        pieceCanvas.setAttribute('data-idx', piece.idx);
        piecesContainer.appendChild(pieceCanvas);

        // Desktop drag events
        pieceCanvas.setAttribute('draggable', 'true');
        pieceCanvas.addEventListener('dragstart', (e) => {
            selectedPiece = piece;
            selectedEl = pieceCanvas;
            setTimeout(() => pieceCanvas.classList.add('dragging'), 0);
        });
        pieceCanvas.addEventListener('dragend', (e) => {
            selectedPiece = null;
            selectedEl = null;
            pieceCanvas.classList.remove('dragging');
        });

        // Mobile/tap events
        pieceCanvas.addEventListener('click', () => {
            // Deselect if already selected
            if (selectedEl) selectedEl.classList.remove('dragging');
            if (selectedPiece === piece) {
                selectedPiece = null;
                selectedEl = null;
                return;
            }
            selectedPiece = piece;
            selectedEl = pieceCanvas;
            pieceCanvas.classList.add('dragging');
        });
    });
}

// Canvas drop logic (desktop)
canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});
canvas.addEventListener('drop', (e) => {
    if (!selectedPiece || !isGameActive) return;
    const { x, y } = getCanvasCoords(e);
    handleDrop(x, y);
});

// Tap-to-place logic (mobile)
canvas.addEventListener('click', (e) => {
    if (!isGameActive) return;
    const { x, y } = getCanvasCoords(e);
    const gridX = Math.floor(x / PIECE_SIZE);
    const gridY = Math.floor(y / PIECE_SIZE);
    const idx = gridY * PUZZLE_SIZE + gridX;

    // If a piece is already placed here and nothing is selected, remove it
    if (placed[idx] && !selectedPiece) {
        const piece = placed[idx];
        placed[idx] = null;
        drawPuzzle();

        // Recreate the piece element in the tray
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = PIECE_SIZE;
        pieceCanvas.height = PIECE_SIZE;
        pieceCanvas.className = 'piece';
        const pctx = pieceCanvas.getContext('2d');
        pctx.drawImage(
            piece.img,
            piece.sx, piece.sy, PIECE_SIZE, PIECE_SIZE,
            0, 0, PIECE_SIZE, PIECE_SIZE
        );
        pieceCanvas.setAttribute('data-idx', piece.idx);
        piecesContainer.appendChild(pieceCanvas);

        // Add event listeners for the new piece
        pieceCanvas.setAttribute('draggable', 'true');
        pieceCanvas.addEventListener('dragstart', (e) => {
            selectedPiece = piece;
            selectedEl = pieceCanvas;
            setTimeout(() => pieceCanvas.classList.add('dragging'), 0);
        });
        pieceCanvas.addEventListener('dragend', (e) => {
            selectedPiece = null;
            selectedEl = null;
            pieceCanvas.classList.remove('dragging');
        });
        pieceCanvas.addEventListener('click', () => {
            if (selectedEl) selectedEl.classList.remove('dragging');
            if (selectedPiece === piece) {
                selectedPiece = null;
                selectedEl = null;
                return;
            }
            selectedPiece = piece;
            selectedEl = pieceCanvas;
            pieceCanvas.classList.add('dragging');
        });
        return;
    }

    // Otherwise, handle normal placement
    if (selectedPiece) {
        handleDrop(x, y);
    }
});

function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches && e.touches.length) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    // Scale for responsive canvas
    x *= (canvas.width / rect.width);
    y *= (canvas.height / rect.height);
    return { x, y };
}

function handleDrop(x, y) {
    const gridX = Math.floor(x / PIECE_SIZE);
    const gridY = Math.floor(y / PIECE_SIZE);
    const idx = gridY * PUZZLE_SIZE + gridX;
    if (gridX < 0 || gridX >= PUZZLE_SIZE || gridY < 0 || gridY >= PUZZLE_SIZE) return;
    if (placed[idx] !== null) return; // already placed

    // Place piece (regardless of correctness)
    placed[idx] = selectedPiece;
    drawPuzzle();
    // Remove from tray
    const pieceEl = [...piecesContainer.children].find(el => +el.getAttribute('data-idx') === selectedPiece.idx);
    if (pieceEl) pieceEl.remove();

    // Check complete (all pieces placed and all in correct spot)
    if (placed.every((p, i) => p && p.idx === i)) {
        isGameActive = false;
        setTimeout(() => {
            levelMessage.textContent = messages[currentLevel];
            levelMessage.classList.add('visible');
            if (currentLevel < LEVELS - 1) {
                nextLevelBtn.style.display = 'inline-block';
            } else {
                setTimeout(() => {
                    finalMessage.style.display = 'block';
                }, 1200);
            }
        }, 600);
    }
    if (selectedEl) selectedEl.classList.remove('dragging');
    selectedPiece = null;
    selectedEl = null;
}

function drawPuzzle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    placed.forEach((piece, i) => {
        if (piece) {
            const x = (i % PUZZLE_SIZE) * PIECE_SIZE;
            const y = Math.floor(i / PUZZLE_SIZE) * PIECE_SIZE;
            ctx.drawImage(
                piece.img,
                piece.sx, piece.sy, PIECE_SIZE, PIECE_SIZE,
                x, y, PIECE_SIZE, PIECE_SIZE
            );
        } else {
            // Optional: draw a blank or subtle background for empty slots
            const x = (i % PUZZLE_SIZE) * PIECE_SIZE;
            const y = Math.floor(i / PUZZLE_SIZE) * PIECE_SIZE;
            ctx.fillStyle = "#f8f8f8";
            ctx.fillRect(x, y, PIECE_SIZE, PIECE_SIZE);
        }
    });
}

// Next level
nextLevelBtn.addEventListener('click', () => {
    if (currentLevel < LEVELS - 1) {
        startLevel(currentLevel + 1);
    }
});

// Hide loading if images already cached
if (loadedCount === LEVELS) loadingScreen.style.display = 'none';

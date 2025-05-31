document.addEventListener("DOMContentLoaded", function () {
    const scratchCards = document.querySelectorAll(".scratch-card");

    scratchCards.forEach((card) => {
        const canvas = card.querySelector(".scratchCanvas");
        const ctx = canvas.getContext("2d");
        let isDrawing = false;

        // Load the custom scratch image
        const scratchImage = new Image();
        scratchImage.src = "scrathcardtop.jpg"; // Replace with your image file

        function setCanvasSize() {
            canvas.width = card.clientWidth;
            canvas.height = card.clientHeight;

            // Draw the scratch image instead of gray
            scratchImage.onload = function () {
                ctx.drawImage(scratchImage, 0, 0, canvas.width, canvas.height);
            };
        }

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            let x, y;
            if (e.touches) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            return { x, y };
        }

        function scratch(x, y) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
        }

        function startScratching(e) {
            e.preventDefault();
            isDrawing = true;
            const { x, y } = getPos(e);
            scratch(x, y);
        }

        function continueScratching(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const { x, y } = getPos(e);
            scratch(x, y);
        }

        function stopScratching() {
            isDrawing = false;
            checkReveal();
        }

        canvas.addEventListener("mousedown", startScratching);
        canvas.addEventListener("mousemove", continueScratching);
        canvas.addEventListener("mouseup", stopScratching);
        canvas.addEventListener("mouseleave", stopScratching);

        canvas.addEventListener("touchstart", startScratching);
        canvas.addEventListener("touchmove", continueScratching);
        canvas.addEventListener("touchend", stopScratching);

        function checkReveal() {
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let erasedPixels = 0;

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i + 3] === 0) erasedPixels++;
            }

            const revealPercentage = (erasedPixels / (canvas.width * canvas.height)) * 100;
            if (revealPercentage > 65) {
                canvas.style.display = "none";
            }
        }
    });
});

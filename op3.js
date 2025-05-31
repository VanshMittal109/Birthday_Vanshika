let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 0;

  init(paper) {
    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      paper.style.zIndex = highestZ;
      highestZ += 1;
    });

    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      paper.style.zIndex = highestZ;
      highestZ += 1;
    });

    document.addEventListener('mousemove', (e) => {
      if (this.holdingPaper) {
        this.velX = e.clientX - this.startX;
        this.velY = e.clientY - this.startY;
        this.currentX += this.velX;
        this.currentY += this.velY;
        this.startX = e.clientX;
        this.startY = e.clientY;
        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (this.holdingPaper) {
        this.velX = e.touches[0].clientX - this.startX;
        this.velY = e.touches[0].clientY - this.startY;
        this.currentX += this.velX;
        this.currentY += this.velY;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });

    document.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.papers'));

if (papers.length > 0) {
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
} else {
  console.log('No .papers elements found');
}
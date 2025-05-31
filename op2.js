const letters = [
    { heading: "", text: "I don’t know if you realize this, but the day I met you, something inside me shifted. The world didn’t look the same anymore. It was brighter, softer, and full of possibilities—because you were in it. I never knew that one person could make such a difference in my life, but you did. And from that day forward, I was never the same.I still remember the first time our eyes met, the way time seemed to pause for a moment. It felt like the universe whispered, “This is the one.” Maybe it was fate, or maybe it was just two souls finally finding their way to each other. Either way, I know for sure that my life was meant to be intertwined with yours. Since that day, my world has been filled with a kind of happiness I never knew existed. And it’s all because of you." },

    { heading: "", text: "If I were to list all the things I love about you, I’d run out of paper before I could never finish. But here are just a few that come to mind right now. I love the way your eyes light up when you talk about something you love, as if the entire universe is shining through them. I love the way you scold me, pretending to be mad, but deep down, you care more than anyone else ever could. I love the way you hold my hand, as if it’s the only place it belongs, making me feel safe, wanted, and loved. But more than all of that, I love the way you make me feel. You make me feel like I am home, no matter where I am. You make the most ordinary moments feel like something out of a fairy tale. You are the most beautiful person, not just in looks but in your heart, your mind, your soul. I don’t just love you. I adore you, I cherish you, and I would choose you over and over again, in every lifetime." },

    { heading: "", text: "Have you ever wondered what a day without you feels like? I have. And let me tell you, it’s dull, colorless, and empty. No laughter that makes my heart race, no random texts that make me smile, no one to remind me to take care of myself. Every second without you feels like an eternity I don’t want to live through. When you are not around, the world loses its spark. Even the brightest days feel cloudy, and even my favorite songs sound incomplete. I realize, in those moments, just how much you mean to me. You are not just a part of my life—you are my life. I never want to know a world where you are not by my side. Because without you, nothing feels right." },

    { heading: "", text: "There’s something about the way you love that leaves me in awe. It’s in the smallest things—how you remember the little details about me, how you look after me when I forget to look after myself, how you make even the most ordinary moments feel special. You love without hesitation, without conditions, without expecting anything in return. And that is the rarest, most beautiful kind of love. It’s the kind of love that changes people. The kind that makes life worth living. The kind I never thought I would find, until you. I don’t think I’ll ever fully understand how I got so lucky to be loved by you, but I promise, I will spend the rest of my life making sure you feel just as loved." },

    { heading: "", text: "Sometimes I wonder what life would have been like if we had met earlier. Maybe I would have had more time to love you, more time to make memories with you, more time to cherish every little moment. But then I realize something even more beautiful. We met at the perfect time—just when I needed you the most, just when my heart was ready to recognize you. Maybe we were meant to find each other exactly when we did because that’s when our love was supposed to begin. And honestly, it doesn’t matter when we met. What matters is that we did. And now that I have you, I am never letting go." },

    { heading: "", text: "If I had to pick just one memory with you as my favorite, I don’t think I could. Every single moment with you feels like magic. But if I had to choose, it would be the time you looked at me with that unspoken understanding, as if we were the only two people in the world. That was the moment I knew. I knew I had found something real, something I never wanted to lose. Every laugh we’ve shared, every time you’ve held my hand, every time you’ve whispered my name—it’s all part of the beautiful story we’re writing together. And I can’t wait to create a million more memories with you." },

    { heading: "", text: "Today, on your birthday, I want to make you a promise. I promise to always stand by your side, no matter what. I promise to make you smile when you’re sad and hold you when you need strength. I promise to love you not just in words, but in actions, every single day. To remind you, even on the hardest days, that you are cherished beyond measure. To be your partner, your best friend, your biggest supporter. You are my greatest blessing, and I will never take you for granted." },

    { heading: "", text: "My love, my life, \n Today is special because today, the most beautiful soul was born—you. Every day with you is a gift, but today, I celebrate you. You are my happiness, my peace, my greatest love. I hope this birthday brings you as much joy as you bring me every day. I love you more than words can ever say, and I always will.\nForever yours,\nVansh" },

];

let currentIndex = 0;
const heading = document.getElementById("letter-heading");
const text = document.getElementById("letter-text");
const container = document.querySelector(".letter-container");
const nextBtn = document.getElementById("next-btn");

// Function to update letter content with animation
function updateLetter() {
    container.classList.remove("active"); // Fade out
    setTimeout(() => {
        heading.textContent = letters[currentIndex].heading;
        text.textContent = letters[currentIndex].text;
        container.classList.add("active"); // Fade in
    }, 300); // Delay for smooth transition
}

// Load the first letter on page load
updateLetter();

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % letters.length; // Loop back after last letter
    updateLetter();
});

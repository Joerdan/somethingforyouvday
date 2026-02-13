// Elements
const welcomeContainer = document.getElementById('welcomeContainer');
const complimentContainer = document.getElementById('complimentContainer');
const thinkingContainer = document.getElementById('thinkingContainer');
const nervousContainer = document.getElementById('nervousContainer');
const memoryContainer = document.getElementById('memoryContainer');
const continueBtn = document.getElementById('continueBtn');
const complimentBtn = document.getElementById('complimentBtn');
const thinkingBtn = document.getElementById('thinkingBtn');
const nervousBtn = document.getElementById('nervousBtn');
const memoryBtn = document.getElementById('memoryBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const mainContainer = document.getElementById('mainContainer');
const successContainer = document.getElementById('successContainer');
const petalsContainer = document.getElementById('petalsContainer');
const bgMusic = document.getElementById('bgMusic');

// Rose petal images (using data URIs for the uploaded images)
const petalImages = [
    'petal1.png',
    'petal2.png',
    'petal3.png',
    'petal4.png'
];

// State
let noClickCount = 0;
let hasClickedNo = false;
let musicStarted = false;

// No button text variations - "I won't let you" theme
const noButtonTexts = [
    "No 😢",
    "I won't let you! 💕",
    "Nope! Not happening! 😊",
    "SAY YES YOU SEXY SLUT! 😏",
    "Not happening baby 💕",
    "What's wrong with you!!! 😤",
    "Say yes pft 🙄",
    "Bro what the hell 😂",
    "I refuse to accept! 💝",
    "Never! 💕"
];

// Start music on first user interaction
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(err => {
            console.log('Music autoplay prevented:', err);
        });
        musicStarted = true;
    }
}

// Create falling rose petals
function createPetal() {
    const petalWrapper = document.createElement('div');
    petalWrapper.className = 'petal';

    // Random petal image
    const randomImage = petalImages[Math.floor(Math.random() * petalImages.length)];
    const img = document.createElement('img');
    img.src = randomImage;
    img.alt = 'Rose petal';
    petalWrapper.appendChild(img);

    // Random starting position
    petalWrapper.style.left = Math.random() * 100 + '%';

    // Random size variation (larger range for more variety)
    const size = 25 + Math.random() * 40; // 25-65px
    petalWrapper.style.width = size + 'px';

    // Random animation duration (fall speed) - faster for more intensity
    const duration = 5 + Math.random() * 5; // 5-10 seconds
    petalWrapper.style.animationDuration = duration + 's';

    // Random rotation - more dramatic
    const rotation = Math.random() * 1080 - 540; // -540 to 540 degrees (1.5 full rotations)
    petalWrapper.style.setProperty('--rotation', rotation + 'deg');

    // Horizontal sway as they fall (left or right)
    const sway = Math.random() * 300 - 150; // -150 to 150px
    petalWrapper.style.setProperty('--sway', sway + 'px');

    petalsContainer.appendChild(petalWrapper);

    // Remove after animation completes - ensure they're fully off screen
    setTimeout(() => {
        petalWrapper.remove();
    }, (duration + 1) * 1000);
}

// Generate petals continuously - more intense!
setInterval(createPetal, 200); // Doubled the frequency for more petals

// Generic transition function
function transitionToScreen(fromContainer, toContainer) {
    startMusic();
    fromContainer.style.opacity = '0';
    fromContainer.style.transform = 'scale(0.9)';
    fromContainer.style.transition = 'all 0.5s ease';

    setTimeout(() => {
        fromContainer.classList.add('hidden');
        toContainer.classList.remove('hidden');
        toContainer.style.opacity = '0';
        toContainer.style.transform = 'scale(0.9)';

        setTimeout(() => {
            toContainer.style.transition = 'all 0.5s ease';
            toContainer.style.opacity = '1';
            toContainer.style.transform = 'scale(1)';
        }, 50);
    }, 500);
}

// Step 1: Welcome screen
continueBtn.addEventListener('click', () => {
    transitionToScreen(welcomeContainer, complimentContainer);
});

// Step 2: Compliment screen
complimentBtn.addEventListener('click', () => {
    transitionToScreen(complimentContainer, thinkingContainer);
});

// Step 3: Thinking screen
thinkingBtn.addEventListener('click', () => {
    transitionToScreen(thinkingContainer, nervousContainer);
});

// Step 4: Nervous screen
nervousBtn.addEventListener('click', () => {
    transitionToScreen(nervousContainer, memoryContainer);
});

// Step 5: Memory screen
memoryBtn.addEventListener('click', () => {
    transitionToScreen(memoryContainer, mainContainer);
});

// Yes button handler
let yesClickCount = 0;
const yesMessages = [
    "Wait! Check the 'No' button first, I worked hard on it! 😊",
    "SAY YES YOU SEXY SLUT! 😏",
    "Not happening baby 💕",
    "What's wrong with you!!! 😤",
    "Say yes pft 🙄",
    "Bro what the hell 😂"
];

yesBtn.addEventListener('click', () => {
    startMusic();

    if (!hasClickedNo) {
        // First time clicking Yes without clicking No - cycle through funny messages
        hint.textContent = yesMessages[yesClickCount % yesMessages.length];
        hint.style.color = '#e91e63';
        yesBtn.style.animation = 'shrinkButton 0.3s ease';
        setTimeout(() => {
            yesBtn.style.animation = '';
        }, 300);
        yesClickCount++;
    } else {
        // Clicked No before, now can proceed
        showSuccess();
    }
});

// No button handler - make it run away!
noBtn.addEventListener('click', (e) => {
    startMusic();
    hasClickedNo = true;
    noClickCount++;

    // Change the button text
    const textIndex = Math.min(noClickCount, noButtonTexts.length - 1);
    noBtn.textContent = noButtonTexts[textIndex];

    // Add shrink animation
    noBtn.classList.add('shrink');
    setTimeout(() => {
        noBtn.classList.remove('shrink');
    }, 300);

    // Different messages based on click count
    const messages = [
        "Oops! The button moved! 😄",
        "You can't click it that easily! 💕",
        "I won't let you say no! 😊",
        "Come on, you know you want to say yes! 💖",
        "Nice try! But I'm not giving up! 💝",
        "The 'No' button is running away from you! 😉",
        "I told you, I won't let you! 💗",
        "You're making this harder for yourself! 😘",
        "Just say yes already! 💕",
        "I'll keep this up all day! 💖"
    ];

    const messageIndex = Math.min(noClickCount - 1, messages.length - 1);
    hint.textContent = messages[messageIndex];

    // Make button move to random position
    moveButton();
});

// Move the No button to a random position
function moveButton() {
    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Make button absolutely positioned
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
        noBtn.style.position = 'absolute';
    }

    // Calculate random position within the card
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Show success screen
function showSuccess() {
    mainContainer.style.display = 'none';
    successContainer.classList.remove('hidden');

    // Create celebration petals
    for (let i = 0; i < 50; i++) {
        setTimeout(createPetal, i * 100);
    }
}

// Prevent context menu on buttons for better mobile experience
yesBtn.addEventListener('contextmenu', (e) => e.preventDefault());
noBtn.addEventListener('contextmenu', (e) => e.preventDefault());

// Initial petals - more intense!
for (let i = 0; i < 20; i++) {
    setTimeout(createPetal, i * 150);
}

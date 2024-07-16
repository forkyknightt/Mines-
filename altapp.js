let gameSeq = [];
let userSeq = [];
let started = false;
let wallet = 1000;
let betAmount = 0;
let rewardAmount = 0;
let h1 = document.querySelector("h1");
let startButton = document.querySelector(".start");
let cashOutButton = document.querySelector(".cout");
let amountInput = document.querySelector('.money');
let minesDropdown = document.getElementById('minees');
let walletDisplay = document.getElementById('wallet');
const gemFound = new Audio("dfound.mp3");
const blast = new Audio("bfound.mp3");

let allBtns = document.querySelectorAll('.boxes');

const betMultiplierTable = {
    1: [1.01, 1.08, 1.12, 1.18, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.9, 1.99, 2.06, 2.25, 2.47, 2.75, 3.09, 3.54, 4.12, 4.95, 6.19, 8.25, 12.38, 24.75],
    2: [1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81, 4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297],
    3: [1.12, 1.29, 1.48, 1.71, 2, 2.35, 2.79, 3.35, 4.07, 5, 6.26, 7.96, 10.35, 13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.3, 2277],
    4: [1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52, 25.3, 37.95, 59.64, 99.39, 178.9, 357.81, 834.9, 2504, 12523],
    5: [1.24, 1.56, 2, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.77, 40.87, 66.41, 113.85, 208.72, 417.45, 939.3, 2504, 8768, 52598],
    6: [1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38, 102.17, 189.75, 379.5, 834.9, 2087, 6261, 25047, 175329],
    7: [1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66, 277.33, 600.87, 1442, 3965, 13219, 59486, 475893],
    8: [1.46, 2.18, 3.35, 5.26, 8.5, 14.17, 24.47, 44.05, 83.2, 166.4, 356.56, 831.98, 2163, 6489, 23794, 118973, 1070759],
    9: [1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 41.6, 83.2, 176.8, 404.1, 1010, 2828, 9193, 36773, 202254, 2022545],
    10: [1.65, 2.83, 5, 9.17, 17.52, 35.03, 73.95, 166.4, 404.1, 1077, 3232, 11314, 49031, 367735, 3236072],
    11: [1.77, 3.26, 6.26, 12.51, 26.77, 58.38, 138.66, 356.56, 1010, 3232, 12123, 56574, 4412826],
    12: [1.9, 3.81, 7.96, 17.52, 40.87, 102.17, 277.33, 831.98, 2828, 11314, 56574, 396022],
    13: [2.06, 4.5, 10.35, 25.3, 66.41, 189.75, 600.87, 2163, 9193, 49031, 367735, 5148297],
    14: [2.25, 5.4, 13.8, 37.95, 113.9, 379.5, 1442, 6489, 36773, 294188, 4412826],
    15: [2.47, 6.6, 18.97, 59.64, 208.7, 834.9, 3965, 23794, 202254, 3236072],
    16: [2.75, 8.25, 27.11, 99.39, 417.5, 2087, 13219, 118973, 2022545],
    17: [3.09, 10.61, 40.66, 178.9, 939.3, 6261, 59486, 1070759],
    18: [3.54, 14.14, 65.06, 357.8, 2504, 25047, 475893],
    19: [4.12, 19.8, 113.9, 834.9, 8768, 175329],
    20: [4.95, 29.7, 227.7, 2504, 52598],
    21: [6.19, 49.5, 569.3, 12523],
    22: [8.25, 99, 2277],
    23: [12.38, 297],
    24: [24.75]
};

function setUp() {
    gameSeq = [];
    let uniquePositions = new Set();
    let numMines = parseInt(minesDropdown.value); 
    while (uniquePositions.size < numMines) {
        let pos = Math.floor(Math.random() * 25) + 1; 
        uniquePositions.add(pos);
    }
    gameSeq = Array.from(uniquePositions);
}

function gameStart() {
    started = true;
    rewardAmount = 0; 
    setUp();
    h1.innerText = "Pick Random Tiles";
}


function btnPress(event) {
    if (!started) {
        console.log("Game has not started yet.");
        return;
    }
    let btn = event.currentTarget;
    let tileId = parseInt(btn.getAttribute("id")); 
    if (!tileId) {
        console.log("Invalid tile clicked.");
        return;
    }
    userSeq.push(tileId); 
    checkAns(userSeq.length - 1);
}
function toggleButtons() {
    if (started) {
        startButton.style.display = 'none'; 
        cashOutButton.style.display = 'block'; 
    } else {
        startButton.style.display = 'block'; 
        cashOutButton.style.display = 'none'; 
    }
}

function checkAns(idx) {
    let isBomb = gameSeq.includes(userSeq[idx]);
    if (isBomb) {
        showBomb(userSeq[idx]);
    } else {
        showMine(userSeq[idx]);
    }
}


function showBomb(tileId) {
    let tile = document.querySelector(`.boxes[id='${tileId}']`);
    h1.innerHTML = "Game Over! Money has been deducted from your wallet!";
    if (tile) {
        tile.querySelector('.bomb').classList.add('appearIngrid');
        blast.play();
        setTimeout(() => {
            vanish();
            resetGame();
            toggleButtons();
        }, 1000); 
    } else {
        console.log("Element not found.");
    }
}




function showMine(tileId) {
    let tile = document.querySelector(`.boxes[id='${tileId}']`);
    if (tile) {
        tile.querySelector('.diamond').classList.add('appearIngrid');
        gemFound.play();
        let numMines = parseInt(minesDropdown.value);
        rewardAmount = betAmount * betMultiplierTable[numMines][userSeq.length - 1];
        if (userSeq.length == (25 - gameSeq.length)) {
            wallet += rewardAmount;
            h1.innerHTML = "Congratulations! You've won!";
            resetGame();
        }
    } else {
        console.log("Element not found.");
    }
}


function vanish() {
    userSeq.forEach(tileId => {
        let tile = document.querySelector(`.boxes[id='${tileId}']`);
        if (tile) {
            tile.querySelector('.bomb').classList.remove('appearIngrid');
            tile.querySelector('.diamond').classList.remove('appearIngrid');
        }
    });
}


function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    
    if (wallet < 10) {
        alert("Game Over! You have insufficient funds.");
        wallet = 1000; 
    }
    updateWalletDisplay(); 
}


function updateWalletDisplay() {
    walletDisplay.innerText = wallet;
}


startButton.addEventListener('click', function (event) {
    event.preventDefault();  
    betAmount = parseInt(amountInput.value);
    if (wallet < betAmount || betAmount <= 0) {
        alert("Invalid bet amount.");
        return;
    }
    wallet -= betAmount; 
    updateWalletDisplay();
    gameStart();
    toggleButtons(); 
});

cashOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (userSeq.length > 0) {
        wallet += rewardAmount;
        updateWalletDisplay();
        h1.innerText = "You've cashed out!";
        setTimeout(() => {
            vanish();
            resetGame();
            toggleButtons(); 
        }, 1000);
    } else {
        alert("You need to select at least one tile before cashing out.");
    }
});

allBtns.forEach(btn => {
    btn.addEventListener('click', btnPress);
});

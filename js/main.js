let handler;
document.querySelector(".control-buttons span").onclick = () => {
    let yourName = prompt("Whats Your Name?");
    if(!yourName) {
        document.querySelector(".info-container .name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons ").remove();
    // Set Timer || Duration
    handler = setInterval(() => {
        document.querySelector(".info-container .duration span").innerHTML++;
    }, 1000);
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
// let orderRange = [...Array(blocks.length).keys()]; // indexes from 0 to 19
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block, index) => {
    block.style.order = orderRange[index]
    block.addEventListener('click', function () {
        flipBlock(block);
    });
});
function flipBlock(selectedBlock) {
    // Add Class
    selectedBlock.classList.add("is-flipped");
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // If Thers two Selected Blocks
    if(allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        stopClicking();
        // Check Matched Block Function
        checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
};
/////////
function stopClicking() {
    // Add Class No Clicking on Main Container
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        // Reomve Class On Clicking After Duration
        blocksContainer.classList.remove("no-clicking");
    }, duration);
};
// Check Mathed Blocks
function checkMathedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.anime === secondBlock.dataset.anime) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
        // End Game
        let blocksMatched = Array.from(document.querySelectorAll('.has-match'));
        // console.log(blocksMatched);
        if(blocksMatched.length === blocks.length) {
            clearInterval(handler);
            endGame(parseInt(document.querySelector('.tries span').innerHTML), parseInt(document.querySelector(".info-container .duration span").innerHTML));
        }
    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();
    }
};
function shuffle (array) {
    // Setting Vars
    let current = array.length,
    temp,
    random;
    while(current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        current--;
        // [1] Save Current Element In Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
};
function endGame (wrongTries, time) {
    if(wrongTries <= 15 || time <= 90)
    document.querySelector('.end-game').innerHTML = `<div>Win, <span>Perfect</span> you finished the game in ${time} seconds and only ${wrongTries} wrong attempts</div>`;
    else if(wrongTries <= 30 || time <= 150)
    document.querySelector('.end-game').innerHTML = `<div>Win, <span>Good</span> you finished the game in ${time} seconds and only ${wrongTries} wrong attempts</div>`;
    else
    document.querySelector('.end-game').innerHTML = `<div><span>Game Over</span></div>`;
    document.querySelector(".end-game").style.top = '0';
};
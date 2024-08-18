var blockArr = [];
var clickedBlock = [];
var level = 1;
var started = false;
var highestScore = 0;
var userId = localStorage.getItem('userId'); // Retrieve userId from local storage

$(document).ready(async function() {
    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/M00916353/player/getHighestScore?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            if (data.highestScore !== undefined) {
                highestScore = data.highestScore;
                $('.highest-score').text(`Highest Score: ${highestScore}`);
            }
        } catch (error) {
            console.error('Error fetching highest score:', error);
        }
    }
});

$(document).keypress(function(event) {
    if (!started) {
        $('.level').text(`Level ${level}`).css('font-size', '3rem');
        randomBlockSelection();
        started = true;
    }
});

$('.block').click(function(event) {
    $(event.currentTarget).addClass('pressed');
    setTimeout(function() {
        $(event.currentTarget).removeClass('pressed');
    }, 200);

    const className = event.currentTarget.className;
    const clickedBlockNo = className.match(/block\d/)[0].substr(5);
    clickedBlock.push(parseInt(clickedBlockNo));

    var audio = new Audio(`./sound/click${clickedBlockNo}.wav`);
    audio.play();

    checkBlockSelection();
});

function randomBlockSelection() {
    let blockNum = Math.floor((Math.random() * 4) + 1);
    $(`.block${blockNum}`).addClass('pressed');
    setTimeout(function() {
        $(`.block${blockNum}`).removeClass('pressed');
    }, 200);
    blockArr.push(blockNum);
    console.log(blockArr);
    return blockNum;
}

function checkBlockSelection() {
    if (clickedBlock[clickedBlock.length - 1] !== blockArr[clickedBlock.length - 1]) {
        gameOver();
        return;
    }

    if (clickedBlock.length === blockArr.length) {
        level++;
        var audio = new Audio('./sound/level-complete.wav');
        audio.play();
        $('.level').text(`Level ${level}`).css('font-size', '3rem');
        clickedBlock = []; // Reset clickedBlock for the next level

        $('.game').css('background', '#198754');
        setTimeout(function() {
            $('.game').css('background', '#3C3C3B');
        }, 300);

        setTimeout(function() {
            randomBlockSelection();
        }, 1200);
    }
}

function gameOver() {
    var audio = new Audio('./sound/game-over.wav');
    audio.play();
    blockArr = [];
    clickedBlock = [];
    started = false;

    $('.game').css('background', '#B31B1B');
    $('.level').text('Game Over');

    setTimeout(function() {
        $('.game').css('background', '#3C3C3B');
    }, 500);

    setTimeout(function() {
        $('.level').text('Press any key to Start the Game').css('font-size', '1.8rem');
    }, 1500);

    // Update highest score if necessary
    updateHighestScore(level - 1); // level - 1 because level is incremented before gameOver
    level = 1; // Reset level after checking the highest score
}

async function updateHighestScore(score) {
    if (score > highestScore) {
        try {
            const response = await fetch('http://localhost:3000/M00916353/player/updateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, score }),
                credentials: 'include'
            });

            const data = await response.json();

            highestScore = data.highestScore;
            $('.highest-score').text(`Highest Score: ${highestScore}`);
        } catch (error) {
            console.error('Error updating highest score:', error);
        }
    }
}

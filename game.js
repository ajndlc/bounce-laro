const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverImage = new Image();
gameOverImage.src = 'loser.gif';  // Path to the game over image
const ballImage = new Image();
ballImage.src = 'ballball.jpeg';  // Path to your ball image



let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);  // Position and size of the image
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

function drawGameOver() {
    // Draw the image on the canvas when the game is over
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before drawing
    ctx.drawImage(gameOverImage, canvas.width / 4, canvas.height / 4, 200, 200);  // Adjust the position and size of the image

}

function moveBall() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            gameOver = true;
        }
    }

    x += dx;
    y += dy;
}

function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function restartGame() {
    gameOver = false;
    score = 0;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOver) {
        drawGameOver();
        return;  // Stop the game loop when game over
    }

    drawBall();
    drawPaddle();
    moveBall();
    movePaddle();
    drawScore();
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
        if (gameOver) {
            restartGame();
            draw();  // Restart the game loop
        }
    }
});

draw();

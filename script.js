window.onload = () => {



    class Snake {
        constructor(direction, ...body) {
            this.body = body;
            this.direction = direction;
            this.ateApple = false;
        }

        advance() {
            let nextPosition = this.body[0].slice();

            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                default:
                    throw ("invalid direction") ;
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        }

        setdirection(newDirection) {
            let allowedDirection;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;
                case "up":
                case "down":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw ("invalid direction") ;
            }

            if (allowedDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        }

        checkCollision(widthBlocks,heightBlocks) {

            let wallCollision = false;
            let snakeCollision = false;
            const [head, ...rest] = this.body
            const [snakeX, snakeY] = head;
            const minX = 0;
            const minY = 0;
            const maxX = widthBlocks - 1;
            const maxY = heightBlocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (let block of rest) {
                if (snakeX == block[0] && snakeY == block[1]) {
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;

        }

        isEatingApple(appleToEat) {
            const head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;

        }

    }

    class Apple {
        constructor(position = [10, 10]) {
            this.position = position;
            this.position = position;
        }

        setNewPosition(widthBlocks,heightBlocks) {

            const newX = Math.round(Math.random() * (widthBlocks - 1));
            const newY = Math.round(Math.random() * (heightBlocks - 1));
            this.position = [newX, newY];

        } ;

        isOnSnake(snakeToCheck) {

            let isOnSnake = false;

            for (let block of snakeToCheck.body) {
                if (this.position[0] === block[0] &&
                    this.position[1] === block[1]
                ) {
                    isOnSnake = true;
                }
            }

            return isOnSnake;

        } ;

    }

    class Drawing {
        static gameOver(ctx, centreX, centreY) {
            ctx.save();
            ctx.font = "bold 70px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;

            ctx.strokeText("Game Over", centreX, centreY - 180);
            ctx.fillText("Game Over", centreX, centreY - 180);
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
            ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
            ctx.restore();
        }

        static drawScore(ctx, centreX, centreY, score) {
            ctx.save();
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(score.toString(), centreX, centreY);
            ctx.restore();
        }

        static drawSnake(ctx, blockSize, snake) {

            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (let block of snake.body) {
                this.drawBlock(ctx, block, blockSize);
            }
            ctx.restore();
        }

        static drawApple(ctx, blockSize, apple) {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            const radius = blockSize / 2;
            const x = apple.position[0] * blockSize + radius;
            const y = apple.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        static drawBlock(ctx, position, blockSize) {
            const [x, y] = position
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
    }

    class Game {
        constructor(canvasWidth = 900, canvasHeight = 600 ) {
            this.canvas = document.createElement('canvas');
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.blockSize = 30;
            this.ctx = this.canvas.getContext('2d');
            this.delay = 100;   // joue sur la vitesse du serpent
            this.widthBlocks = this.canvasWidth / this.blockSize;
            this.heightBlocks = this.canvasHeight / this.blockSize;
            this.centreX = this.canvasWidth / 2;
            this.centreY = this.canvasHeight / 2;
            this.score;
            this.timeout;
            this.snakee;
            this.applee;
            this.audio = new Audio("stranger-things-124008.mp3");
        }

        init() {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this.canvas.style.border = "30px solid gray";
            this.canvas.style.margin = "50px auto";
            this.canvas.style.display = "block";
            // canvas.style.backgroundColor = "#C0DFEF" ;
            this.canvas.style.backgroundImage = "url(mountain-g0f98262b2_1280.jpg)";
            document.body.appendChild(this.canvas);
            this.launch();
        }

        launch() {
            this.snakee = new Snake("right", [6, 4], [5, 4], [4, 4], [3, 4], [2, 4]);
            this.applee = new Apple([10, 10]);
            this.score = 0;
            this.delay = 100;
            this.audio.play();
            clearTimeout(this.timeout);
            this.refreshCanvas();
        }

        refreshCanvas() {
            this.snakee.advance();
            if (this.snakee.checkCollision(this.widthBlocks, this.heightBlocks)) {
                Drawing.gameOver(this.ctx, this.centreX, this.centreY);
                this.audio.pause();
            } else {
                if (this.snakee.isEatingApple(this.applee)) {
                    this.snakee.ateApple = true;
                    this.score++;
                    if (this.score % 5 == 0 && this.score != 0) {
                        this.speedUp();
                    }
                    do {
                        this.applee.setNewPosition(this.widthBlocks, this.heightBlocks);
                    }
                    while (this.applee.isOnSnake(this.snakee)) ;
                }

                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
                Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
                Drawing.drawApple(this.ctx, this.blockSize, this.applee)
                this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay);
            }
        }

        speedUp() {
            this.delay -= 5;
        }

    }

    let myGame = new Game()
    myGame.init();

    let myGame2 = new Game(1200, 400)
    myGame2.init();


    document.onkeydown = (e) => {

        const key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37: // agauche
                newDirection = "left"
                break;
            case 38:
                newDirection = "up"
                break;
            case 39:
                newDirection = "right"
                break;
            case 40:
                newDirection = "down"
                break;
            case 32:
                myGame.launch();
                myGame2.launch();
                return;
            default:
                return;
        }

        myGame.snakee.setdirection(newDirection);
        myGame2.snakee.setdirection(newDirection);

    };
}



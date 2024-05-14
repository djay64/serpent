import Snake from "./snake";
import Apple from "./apple";
import Drawing from "./drawing";
export default  class Game {
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


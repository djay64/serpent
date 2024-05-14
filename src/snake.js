export default  class Snake {
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

        if (allowedDirection.includes(newDirection) ) {
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
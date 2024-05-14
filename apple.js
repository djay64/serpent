export default  class Apple {
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
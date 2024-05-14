import Game from "./game"


window.onload = () => {

    let myGame = new Game()
    myGame.init();

    let myGame2 = new Game(1200, 400)
    // myGame2.init();


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
                // myGame2.launch();
                return;
            default:
                return;
        }

        myGame.snakee.setdirection(newDirection);
        // myGame2.snakee.setdirection(newDirection);

    };
}



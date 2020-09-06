export default class InputHandler {

    constructor(canvas, board) {
        canvas.addEventListener('mousemove', event => {
            this.x = event.offsetX;
            this.y = event.offsetY;

            //console.log(this.x);
            console.log(board.canvasHeight);
        });
    }
}
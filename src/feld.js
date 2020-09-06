import Board, { SPIELER } from "./board.js";

export default class Feld {

    constructor(x1, y1, x2, y2, ctx) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(x1, y1, x2, y2);
    }

    drawFigure(spieler) {
        this.ctx.font = "150px Arial";
        this.ctx.textAlign = "center";

        if (spieler === SPIELER.SPIELER1) {
            this.ctx.fillStyle = "blue";
            var figure = "X";
        } else {
            this.ctx.fillStyle = "red";
            var figure = "O";
        }

        this.ctx.fillText(figure, this.calculateMiddle(this.x1, this.x2), 55 + this.calculateMiddle(this.y1, this.y2));
    }

    calculateMiddle(v1, v2) {
        if (v2 > v1) {
            return v1 + (v2 - v1) / 2;
        } else {
            return v2 + (v1 - v2) / 2;
        }
    }

}
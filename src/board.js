import Feld from "./feld.js";

export const SPIELER = {
    SPIELER1: 1,
    SPIELER2: 2
}

export default class Board {

    #boardWidth;
    #boardHeight;
    #ctx;
    #panelWidth;
    #panelHeight;
    #boardPosition;
    #panelPosition;
    #lineWidth;
    #dx;
    #dy;

    constructor(boardWidth, boardHeight, ctx) {

        this.#boardWidth = boardWidth;
        this.#boardHeight = boardHeight;
        this.#ctx = ctx;

        this.#panelWidth = this.#boardWidth;
        this.#panelHeight = this.#ctx.canvas.height - this.#boardHeight;

        this.#dx = this.#boardWidth / 3;
        this.#dy = this.#boardHeight / 3;

        this.#boardPosition = {
            x1: 0,
            y1: 0,
            x2: this.#panelWidth,
            y2: this.#boardHeight
        }

        this.#panelPosition = {
            x1: 0,
            y1: this.#boardHeight,
            x2: this.#panelWidth,
            y2: this.#ctx.canvas.height
        }

        this.#lineWidth = 3;

        this.felder = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.felder.push(new Feld(j * this.#dx, i * this.#dy, (j + 1) * this.#dx, (i + 1) * this.#dy, this.#ctx));
            }
        }

        let spieler = SPIELER.SPIELER1;
        for (let k = 0; k < this.felder.length; k++) {
            this.felder[k].drawFigure(spieler);
            spieler = this.toggleSpieler(spieler);
        }
    }

    toggleSpieler(spieler) {
        if (spieler === SPIELER.SPIELER1) {
            return SPIELER.SPIELER2;
        } else {
            return SPIELER.SPIELER1;
        }
    }

    get width() {
        return this.#boardWidth;
    }

    get height() {
        return this.#boardHeight;
    }

    get panelWidth() {
        return this.#panelWidth;
    }

    get panelHeight() {
        return this.#panelHeight;
    }

    clear() {
        this.#ctx.clearRect(this.#boardPosition.x1, this.#boardPosition.y1, this.#boardPosition.x2, this.#boardPosition.y2);
    }

    panelClear() {
        this.#ctx.clearRect(this.#panelPosition.x1, this.#panelPosition.y1, this.#panelPosition.x2, this.#panelPosition.y2);
    }

    draw() {
        // Board farblich absetzen
        //this.#ctx.rect(this.#boardPosition.x1, this.#boardPosition.y1, this.#boardPosition.x2, this.#boardPosition.y2);
        //this.#ctx.fillStyle = "rgba(0, 0, 0, 0)";
        //this.#ctx.fill();

        // waagerechte Linien
        for (let i = 1; i < 4; i++) {
            this.line(0, this.height * i / 3, this.width, this.height * i / 3, this.#lineWidth);
        }

        // senkrechte Linien
        for (let j = 1; j < 4; j++) {
            this.line(this.width * j / 3, 0, this.width * j / 3, this.height, this.#lineWidth);
        }

        // Statuspanel farblich absetzen
        this.#ctx.rect(this.#panelPosition.x1, this.#panelPosition.y1, this.#panelPosition.x2, this.#panelPosition.y2);
        this.#ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.#ctx.fill();
    }

    // zeichnet eine Linie
    line(x1, y1, x2, y2, lw) {
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = 'black';
        this.#ctx.lineWidth = lw;
        this.#ctx.moveTo(x1, y1);
        this.#ctx.lineTo(x2, y2);
        this.#ctx.stroke();
        this.#ctx.closePath();
    }
}
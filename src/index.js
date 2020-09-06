import Board from "./board.js";
import InputHandler from "./input.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 600;

let board = new Board(BOARD_WIDTH, BOARD_HEIGHT, ctx);
board.draw();

new InputHandler(canvas, board);

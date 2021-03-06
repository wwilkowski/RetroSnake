import _debounce from 'lodash/debounce';

import {
   createSnake,
   clearSnake,
   snakeBody,
   moveSnake,
   changeDirection
} from './snake';

import {
   createFood
} from './food';

const container = document.querySelector('.container');
const startButton = document.querySelector('.container__startButton');
const speed = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20);

const drawGame = () => {
   ctx.fillStyle = '#B3BD00';
   ctx.fillRect(0, 0, 25, 25);
   ctx.setLineDash([1]);
   ctx.strokeStyle = '#68500D';
   ctx.strokeRect(0, 0, 25, 25);
};

const drawFood = ({
   x,
   y
}) => {
   ctx.fillStyle = '#68500D';
   ctx.fillRect(x, y, 1, 1);
};

const drawPart = ({
   x,
   y
}) => {
   ctx.fillStyle = '#68500D';
   ctx.fillRect(x, y, 1, 1);
};

let foodPosition = createFood(25);

const runGame = () => {
   drawGame();
   drawFood(foodPosition);
   moveSnake();
   for (let part of snakeBody) {
      drawPart(part);
   }
};

let gameInterval;

startButton.addEventListener('click', () => {
   container.classList.add('container--hidden');
   clearInterval(gameInterval);
   clearSnake();
   createSnake();
   gameInterval = setInterval(runGame, speed);
});

const stopGame = () => {
   clearInterval(gameInterval);
   container.classList.remove('container--hidden');
}

/*
   0 - right
   1 - down
   2 - left
   3 - up
*/
const findNewDirection = (key) => {
   let dir;
   switch (key) {
      case 'ArrowLeft':
         dir = 2;
         break;
      case 'ArrowUp':
         dir = 3;
         break;
      case 'ArrowRight':
         dir = 0;
         break;
      case 'ArrowDown':
         dir = 1;
         break;
      default:
         break;
   }
   return dir;
};

document.addEventListener(
   'keydown',
   _debounce((e) => {
      changeDirection(findNewDirection(e.key));
   }, speed - 20)
);

export {
   canvas,
   ctx,
   stopGame,
   drawFood
};
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time'); 
const board = document.querySelector('#board');
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'aquamarine', 'chartreuse', 'coral',    'rosybrown', 'yellowgreen', 'violet', 'tomato', 'steelblue', 'orange'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  const timeBtn = event.target.classList.contains('time-btn');
  if (timeBtn) {
    time = parseInt(event.target.getAttribute('data-time'));
   
    screens[1].classList.add('up');

    startGame();
  }
});

board.addEventListener('click', event => {
  const clickInCircle = event.target.classList.contains('circle');
  if (clickInCircle) {
    score+= 1;
    event.target.remove();
    createRandomCircle();
  }
})

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }

    setTime(currentTime);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
};

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счет: <span class='primary'>${score}</span></h1>`;
};

function createRandomCircle() {
  const circle = document.createElement('div');
  const randomSizeCircle = getRandomSizeCircle(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomSizeCircle(0, width - randomSizeCircle);
  const y = getRandomSizeCircle(0, height - randomSizeCircle);
  const randomColor = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${randomSizeCircle}px`;
  circle.style.height = `${randomSizeCircle}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.style.background = randomColor;
  board.appendChild(circle);
};

function getRandomSizeCircle(min, max) {
  const randomSize = Math.round(Math.random() * (max - min) + min);
  return randomSize;
};

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
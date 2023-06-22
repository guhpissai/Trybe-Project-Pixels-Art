// Criando paleta de cores

for (let index = 1; index <= 4; index += 1) {
  const pallete = document.getElementById('color-palette');
  const colors = document.createElement('div');
  colors.classList.add('color');
  pallete.appendChild(colors);
}

//  Definindo cor preta como cor padrao

const selectedColor = document.querySelector('.color');
selectedColor.style.backgroundColor = 'black';
selectedColor.classList.add('selected');

// Definindo numero aleatorio

const randomNumber = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Definindo RGB aleatorio

const randomColor = () => [
  randomNumber(0, 255),
  randomNumber(0, 255),
  randomNumber(0, 255),
];

// LocalStorage

const saveColors = () => {
  const colorArray = [];
  const rgbValue = document.querySelectorAll('.color');
  for (let index = 0; index < rgbValue.length; index += 1) {
    const colors = rgbValue[index].style.backgroundColor;
    colorArray.push(colors);
    localStorage.setItem('colorPalette', JSON.stringify(colorArray));
  }
};

// Definindo funcao para o botao gerar cores aleatorias

const buttonColor = () => {
  for (let index = 1; index <= 3; index += 1) {
    const rgb = randomColor();
    const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    const textColor = color.toString();
    document.querySelectorAll('.color')[index].style.backgroundColor = textColor;
  }
  saveColors();
};

// Criando botao para cores aleatorias

const colorButton = document.createElement('button');
colorButton.id = 'button-random-color';
colorButton.innerHTML = 'Cores aleatórias';

const body = document.querySelector('body');
body.appendChild(colorButton);
colorButton.addEventListener('click', buttonColor);

function saveDrawing() {
  let pixelColors = [];
  const pixels = document.querySelectorAll('.pixel')
  for(i = 0; i < pixels.length; i++) {
    pixelColors.push(pixels[i].style.backgroundColor)
  }
  localStorage.setItem('drawing', JSON.stringify(pixelColors));
}

window.onload = function save() {
  const savedDrawing = JSON.parse(localStorage.getItem('drawing'));
  const savedColors = JSON.parse(localStorage.getItem('colorPalette'));
  const pixels = document.querySelectorAll('.pixel');
  const colorIndex = document.querySelectorAll('.color');
  if (localStorage.length > 0) {
    for (let index = 0; index < 4; index += 1) {
      colorIndex[index].style.backgroundColor = savedColors[index];
    }
  } else {
    buttonColor();
    saveColors();
  }
  if(savedDrawing.length > 0) {
    for(let i = 0; i < pixels.length; i++) {
      pixels[i].style.backgroundColor = savedDrawing[i]
    }
  }
};

// Criando grade de pixels

const pixelBoard = document.getElementById('pixel-board');

function createPixels (length = 25) {
  for (let index = 1; index <= length; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
  }
}
createPixels()

// Criando funcao para selecionar cor na paleta

const paletteColors = document.querySelectorAll('.color');

function recebeClick(eventoDeOrigem) {
  const myTarget = eventoDeOrigem.target;
  document.querySelector('.selected').classList.remove('selected');
  myTarget.classList.add('selected');
}

for (let index = 0; index < paletteColors.length; index += 1) {
  paletteColors[index].addEventListener('click', recebeClick);
}

// Criando funcao para preencher um pixel com a cor selecionada


function paintPixel(eventOrigin) {
  const recentColor = document.querySelector('.selected').style.backgroundColor;
  const myPixelTarget = eventOrigin.target;
  myPixelTarget.style.backgroundColor = recentColor;
  saveDrawing();
}

function paint () {
  const pixelsArt = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelsArt.length; index += 1) {
    pixelsArt[index].addEventListener('click', paintPixel);
  }
}
paint();

// Criando botao que retorne a cor do quadro

function clearFrame() {
  const defaultColor = document.querySelectorAll('.pixel');
  for (let i = 0; i < defaultColor.length; i += 1) {
    defaultColor[i].style.backgroundColor = 'white';
  }
  saveDrawing();
}

const clearButton = document.getElementById('clear-button');
const defaultColorButton = document.createElement('button');
defaultColorButton.id = 'clear-board';
defaultColorButton.innerHTML = 'Limpar';

const boardSizeButton = document.createElement('input');
boardSizeButton.setAttribute('type', 'number');
boardSizeButton.setAttribute('min', '1');
boardSizeButton.id = 'board-size';
boardSizeButton.innerHTML = ''

const vqmButton = document.createElement('button');
vqmButton.id = 'generate-board';
vqmButton.innerHTML = 'VQV';

clearButton.appendChild(defaultColorButton);
clearButton.appendChild(boardSizeButton);
clearButton.appendChild(vqmButton);


function attPixels () {
  let boardSize = boardSizeButton.value * boardSizeButton.value;
  if(!boardSize) {
    return window.alert('Board inválido!')
  }
  const pixels = document.querySelectorAll('.pixel');
  for(i = 0; i < pixels.length; i++) {
    pixels[i].remove()
  }
  for(i = 0; i < boardSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
  }
  let boardPixel = boardSizeButton.value * 42
  pixelBoard.style.maxWidth = `${boardPixel}px`;
  paint();
}

vqmButton.addEventListener('click', attPixels)

clearButton.addEventListener('click', clearFrame);

const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear-btn");
const toggleColorBtn = document.getElementById("toggle-color-btn");
let gridSize = 16;
const CANVAS_SIZE = 500;
let maxGridAmount;
clearBtn.addEventListener("click", clearCanvas);
toggleColorBtn.addEventListener("click", toggleColorMode);
let colorMode = 0;
const COLORMODE_AMOUNT = 3;

function createCanvas() {
    for (let i = 0; i < gridSize; i++){
        const column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < gridSize; j++){
            const square = document.createElement("div");
            square.classList.add("square");
            let squareSize =  CANVAS_SIZE / (gridSize);
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            square.addEventListener("mouseenter", markSquare);
            column.appendChild(square);
        }
        canvas.appendChild(column);
    }
    maxGridAmount = CANVAS_SIZE / 10;
}


function markSquare(e){
    switch(colorMode){
        case 0:
            e.target.style.backgroundColor = "black";
            break; 
        case 1:
            e.target.style.backgroundColor = randomColor();    
            break;
        case 2:
           e.target.style.backgroundColor = blackerEveryHover(e.target.style.backgroundColor);
            break;
        }

      
}

function clearCanvas(){
    canvas.innerHTML = "";
    let input = prompt("How big should your canvas be?");

    if (isNaN(parseInt(input))){    
        alert("Please input a number");
        clearCanvas();
    }
    else if (parseInt(input) > maxGridAmount){
        alert(`Please pick a number between 1 and ${maxGridAmount}`);
        clearCanvas();
    }
    else{
        gridSize = parseInt(input);
        createCanvas();
    }
}

function toggleColorMode(){
    colorMode++;
    if (colorMode >= COLORMODE_AMOUNT){
        colorMode = 0;
    }
}

function randomColor(){
    let red= Math.ceil(Math.random()*255); 
    let blue= Math.ceil(Math.random()*255); 
    let green= Math.ceil(Math.random()*255);
    return `rgb(${red},${blue},${green})`;
}

function blackerEveryHover(color){
    if (color == ""){
        return "rgb(230,230,230)";
    }

    let temp = color.slice(4, color.length-1);
    temp = temp.split(", ");
    let blackerRed = parseInt(temp[0]) - 25;
    let blackerBlue = parseInt(temp[1]) - 25;
    let blackerGreen = parseInt(temp[2]) - 25;
    return `rgb(${blackerRed},${blackerBlue},${blackerGreen})`;
}

createCanvas();
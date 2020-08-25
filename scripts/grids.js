const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear-btn");
const toggleColorBtn = document.getElementById("toggle-color-btn");
let gridSize = 16;
clearBtn.addEventListener("click", clearCanvas);
toggleColorBtn.addEventListener("click", toggleColorMode);
let colorMode = 0;
const COLORMODE_AMOUNT = 2;

function createCanvas() {
    for (let i = 0; i < gridSize; i++){
        const column = document.createElement("div");
        column.classList.add("column");
        if (gridSize === 1){
            column.classList.add("left-border");
            column.classList.add("right-border");
        }
        else if (i === 0){
            column.classList.add("left-border");
        }
        else if (i === gridSize-1){
            column.classList.add("right-border");
        }
        for (let j = 0; j < gridSize; j++){
            const square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener("mouseenter", markSquare);
            column.appendChild(square);
        }
        canvas.appendChild(column);
    }
}


function markSquare(e){
    switch(colorMode){
        case 0:
            e.target.style.backgroundColor = randomColor();    
            break;
        case 1:
            e.target.style.backgroundColor = blackerEveryHover(e.target.style.backgroundColor);
        }
      
}

function clearCanvas(){
    canvas.innerHTML = "";
    let input = prompt("How big should your canvas be?");
    if (typeof parseInt(input) != "number"){
        alert("Please input a number");
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
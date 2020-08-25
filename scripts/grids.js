const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear-btn");
let gridSize = 16;
clearBtn.addEventListener("click", clearCanvas);

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
    let red= Math.ceil(Math.random()*255); 
    let blue= Math.ceil(Math.random()*255); 
    let green= Math.ceil(Math.random()*255); 
    e.target.style.backgroundColor = `rgb(${red},${blue},${green})`;  
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

createCanvas();
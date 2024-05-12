const container = document.querySelector('.container');
const resetButton = document.querySelector('input[type="button"]');
const clearButton = document.querySelector("#clear");
let gridSelectionLog = [];


function updateWidthHeight(newDiv, numberSquares) {
    const bodyWidth = container.scrollWidth;   
    let containerWidth = bodyWidth/numberSquares;
    newDiv.style.width = `${containerWidth}px`
    newDiv.style.height = `${containerWidth}px`
};


function createGrid(numberSquares) {
    for (let i=0; i < (numberSquares*numberSquares); i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("unite_grid");
        updateWidthHeight(newDiv, numberSquares);
        container.appendChild(newDiv); 
        newDiv.addEventListener("mouseenter", (e) => {
            let rgbRandom = getRandomColor();
            e.target.style.background = rgbRandom;
            logGridSelected(e);
            gridSelectionLog.forEach(grid => {
                reduceOpacity(grid, gridSelectionLog);
            });
        });
    }; 
};

function updateGrid(numberSquares) {
    const oldDivs = document.querySelectorAll(".unite_grid");
    oldDivs.forEach(oldDiv => container.removeChild(oldDiv));
    createGrid(numberSquares);
};

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.addEventListener("DOMContentLoaded", () => createGrid(16));

resetButton.addEventListener("click", () => {
    let numberSquares = prompt("Enter number of squares per side for the new grid");
    while(numberSquares > 50) {
        numberSquares = prompt("Enter a value inferior to 51 :")
    } 
    updateGrid(numberSquares);
}
);

clearButton.addEventListener("click", () => {
    const coloredDivs = document.querySelectorAll(".unite_grid");
    coloredDivs.forEach(coloredDiv => coloredDiv.style.background = "");
});

function logGridSelected(e) {
    
    gridSelectionLog.push(e.target)
    if (gridSelectionLog.length > 10) {
        gridSelectionLog.shift(); 
    }
}

function reduceOpacity(div, parentDiv) {
    div.style.opacity = `${100 - (parentDiv.length-1) * 10}%`; 
}
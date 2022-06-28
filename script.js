const drawArea = document.querySelector(".draw-area");
const colorChanger = document.querySelector("#color-changer");
const colorButton = document.querySelector("#color");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");
const sliderButton = document.querySelector("#block-slider");


colorChanger.addEventListener('change', changeColor);
colorButton.addEventListener('click', colorMode);
rainbowButton.addEventListener('click', rainbowMode);
eraserButton.addEventListener('click', eraser);
clearButton.addEventListener('click', clear);
sliderButton.addEventListener('input', changeSlider);

let setColor = "#2b2b2b";
let drawColor = "#2b2b2b";
let mouse_clicked = false;
let rainbow_mode = false;

generateBlock(25);

function generateBlock(blockCount){
    for (let i=0; i<blockCount; i++){
        const blockRow = document.createElement('div');
        blockRow.classList.add('block-row');
        
        for (let j=0; j<blockCount; j++){
            const block = document.createElement('div');
            block.classList.add('block');
            block.addEventListener('mousedown', function(){
                mouse_clicked = true;
                if (rainbow_mode){
                    drawColor = randomColor();
                }
                this.style.backgroundColor = drawColor;
            });
            
            block.addEventListener('mousemove', function(){
                if (rainbow_mode){
                    drawColor = randomColor();
                }

                if (mouse_clicked){
                    this.style.backgroundColor = drawColor;
                }
            });

            window.addEventListener('mouseup', function(){
                mouse_clicked = false;
            });
            
            blockRow.appendChild(block);
        }
    
        drawArea.appendChild(blockRow);
        
    }
}

function randomColor(){
    return "#" + Math.random().toString(16).substring(2,8);
}

function removeBlock(){
    const blockRows = document.querySelectorAll(".block-row");
    for (let blockRow of blockRows){
        blockRow.remove();
        console.log("removed");
    }
}

function changeSlider(event){
    const boxSize = event.target.value;
    const sizeLabel = document.querySelector("label");
    sizeLabel.innerHTML = boxSize + "x" + boxSize;
    removeBlock();
    generateBlock(boxSize);
}

function colorMode(){
    colorButton.setAttribute("class", "btn-selected");
    rainbowButton.setAttribute("class", "");
    eraserButton.setAttribute("class", "");;
    drawColor = setColor;
    rainbow_mode = false;
}

function rainbowMode(){
    colorButton.setAttribute("class", "");
    rainbowButton.setAttribute("class", "btn-selected");
    eraserButton.setAttribute("class", "");;
    rainbow_mode = true;
}

function changeColor(event){
    setColor = drawColor = event.target.value;
} 

function eraser(){
    colorButton.setAttribute("class", "");
    rainbowButton.setAttribute("class", "");
    eraserButton.setAttribute("class", "btn-selected");
    drawColor = "#ffffff";
    rainbow_mode = false;
}


function clear(){
    const blocks = document.querySelectorAll(".block");
    for (let block of blocks){
        block.style.backgroundColor = "#ffffff";
    }
}


let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgContain = document.querySelector(".msg-contain");
let msg2 = document.querySelector("#msg2");

let turnO = true;

const winPatterns= [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    
};



boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            //playerO
            box.innerText ="O";
            turnO = false;
        }else{
            //playerX
            box.innerText="X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner(); 
    });
});
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}



const showMessage = (message, type = "info") => {
    msg2.innerText = message;
    if (type === "draw") {
        msgContain.classList.remove("hide2");
        msgContain.classList.add("draw-style"); 
    }
};

const checkForDraw = () => {
    let allFilled = true;
    boxes.forEach(box => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        if (msgContainer.classList.contains("hide")) {
            showMessage("Sorry, it's a draw! Try again.", "draw");
        }
        disableBoxes();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winnner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){ 
                showWinner(pos1Val);
                return;
            }
        }
    }
    checkForDraw();
};

newGameBtn.addEventListener("click",resetGame);resetBtn.addEventListener("click",resetGame);                                                        
 
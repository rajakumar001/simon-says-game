let gameSeq = [];
let userSeq = [];
let highScore = 0;

let started = false;
let level = 0;
let btns = ["red","green","yellow","blue"];

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game has started.");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
};

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randIdx);
    console.log(randColor);
    console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
};

function checkAns(idx){
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        //h2.innerHTML = `game over!Your score was <b>${level}</b> <br> press any key to restart the game`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};

function reset(){
    if (level > highScore) {
        highScore = level;
    }

    h2.innerHTML = `
        Game Over! Your Score: <b>${level}</b><br>
        Highest Score: <b>${highScore}</b><br>
        Press any key to restart.
    `;
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
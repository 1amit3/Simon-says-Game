let gamesq=[];
let usersq=[];

let gameOver = false;
let highScore = 0;
let started=false;
let level=0;

let btns=["yellow","green","purple","red"]

let h2= document.querySelector("h2")


const sounds = {
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    green: new Audio("sounds/green.mp3"),
    purple: new Audio("sounds/purple.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
};

sounds.red.volume = 1.0;
sounds.yellow.volume = 1.0;
sounds.green.volume = 1.0;
sounds.purple.volume = 1.0;

sounds.wrong.volume = 0.15;

h2.classList.add("start-text");

function startGame() {

    if (gameOver) {
        reset();
        gameOver = false;
        return;
    }

    if (!started) {
        started = true;

        setTimeout(() => {
            levelup();
        }, 1200);
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

function levelup(){
   h2.style.animationPlayState = "paused";
    document.querySelector(".button-container").classList.remove("collapse");
    usersq=[];
    level++;
    h2.innerText=`Level ${level}`;


    let randomindx=Math.floor(Math.random()*4)
    let randomcolor=btns[randomindx]
    let randombtn=document.querySelector(`.${randomcolor}`)

   gamesq.push(randomcolor);
    gameflash(randombtn);
    console.log(`gamesq: ${gamesq}`)
}



function gameflash(btn){
    btn.classList.add("gameflash");
    console.log(btn.id);
    sounds[btn.id].currentTime = 0;
    sounds[btn.id].play();

    setTimeout(function (){
        btn.classList.remove("gameflash");
    },300);
}




function userflash(btn){
   
    btn.classList.add("userflash")

    sounds[btn.id].currentTime = 0;
    sounds[btn.id].play();

    setTimeout(function (){
        btn.classList.remove("userflash")
    },300)
    

}


function checkans(idx){

    if(usersq[idx] === gamesq[idx]){

        if(usersq.length === gamesq.length){

            setTimeout(() => {
                levelup();
            },1000);

        }

    }else{

        sounds.wrong.currentTime = 0;
        sounds.wrong.play();

        document.querySelector(".button-container").classList.add("collapse");

       if(level > highScore){
        highScore = level;
    }

        h2.innerHTML = `
       Game Over! <br><br>

        Your Score : <b>${level}</b><br>
       Highest Score : <b>${highScore}</b> <br>
       <hr>
       Press any key to Restart 
      `;

       document.body.style.backgroundColor="red";
 
      setTimeout(()=>{
      document.body.style.backgroundColor="";
      } ,250);

      started = false;
      gameOver = true;
}
}

   function btnpress(){
    let btn=this;
     
   userflash(btn)

   let usercolor = btn.getAttribute("id");
   usersq.push(usercolor);
   console.log(usercolor)
   console.log(`tmhara sq: ${usersq}`)
    
   checkans(usersq.length-1)
}
 

let allbtns=document.querySelectorAll(".btn")

for(btn of allbtns){
    btn.addEventListener("click",btnpress)
}

function reset(){

    started = false;
    gamesq = [];
    usersq = [];
    level = 0;

    document.querySelector(".button-container").classList.remove("collapse");
    
    h2.innerText = "Press Any Key to Start";
    h2.classList.add("start-text");
    h2.style.animationPlayState = "running";
}

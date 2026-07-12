let gamesq=[];
let usersq=[];

let started=false;
let level=0;

let btns=["yellow","green","purple","red"]

let h2= document.querySelector("h2")

document.addEventListener("keypress",function(){

    if(started==false){
    console.log("game started")
    started=true;


 levelup();
}
})


function levelup(){
    usersq=[];
    level++;
    h2.innerText=`level ${level}`


    let randomindx=Math.floor(Math.random()*4)
    let randomcolor=btns[randomindx]
    let randombtn=document.querySelector(`.${randomcolor}`)

   gamesq.push(randomcolor);
    gameflash(randombtn);
    console.log(`gamesq: ${gamesq}`)
}



function gameflash(btn){
    btn.classList.add("gameflash");

    setTimeout(function (){
        btn.classList.remove("gameflash");
    },300);
}




function userflash(btn){
   
    btn.classList.add("userflash")

    setTimeout(function (){
        btn.classList.remove("userflash")
    },300)
    

}



function checkans(idx){

    if(usersq[idx] === gamesq[idx]){ 
        if(usersq.length==gamesq.length){

         setTimeout(function(){
            levelup()
         },1000)


        }
      
    }else{
        h2.innerHTML=`game over your score is <b>${level}</b> <br> Press any key to start`;


    reset()
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
    started=false;
    usersq=[];
    gamesq=[];
    level=0;
}




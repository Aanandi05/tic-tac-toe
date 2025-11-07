let boxes= document.querySelectorAll(".box");
let reset= document.querySelector(".reset");
let newbtn= document.querySelector(".new");
let msg= document.querySelector(".msg");
let cmsg= document.querySelector("#cmsg");


let turnO= true;
let count=0;
let gameover=false;



const win= [
    [0,1,2], 
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const disablebox=()=>{
    for(let box of boxes){
        box.disabled= true;
    }
    gameover=true;
}

const enablebox=()=>{
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
    gameover=false;
}

const showwin=(winner)=>{
    cmsg.innerText=`Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (gameover) return ;
        count+=1;
        if (turnO){
            box.innerText= "O";
            turnO= false;
            box.classList.add("oturn")
            box.classList.remove("xturn")


        }else{
            box.innerText="X";
            turnO= true;
            box.classList.add("xturn")
            box.classList.remove("oturn")

        }
        box.disabled= true;
        if (checkwin()) return;
        draw();

    })
});

const draw=()=>{
    if (!gameover && count==9){
        disablebox()
        cmsg.innerText=`Its a Draw!`
        msg.classList.remove("hide");
        
    }
}

const resetgame=()=>{
    turnO=true;
    enablebox();
    count=0;
    msg.classList.add("hide");
    boxes.forEach((box)=>
        box.classList.remove("oturn","xturn")
    );
}

const checkwin=()=>{
    for (let pattern of win){

        let pos1val= boxes[pattern[0]].innerText
        let pos2val= boxes[pattern[1]].innerText
        let pos3val= boxes[pattern[2]].innerText

        if(pos1val!="" && pos2val!="" && pos3val!="" ){
            if(pos1val==pos2val && pos2val==pos3val){
                showwin(pos1val);
                disablebox();
                return true;
            }
            
        }
        

    }
};

newbtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);



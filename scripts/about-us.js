var botones = document.querySelectorAll('button');
var info = document.querySelectorAll(".contenido");
var first = document.getElementById("first");

info[0].style.display = "block";


for(var i = 0; i < botones.length; i++ ){
    botones[i].addEventListener("mouseover", function(){
        this.style.background = "#3554EE";
        this.style.color = "black";

    });
    botones[i].addEventListener("mouseout", function(){
        this.style.background = "";
        this.style.color = "";
        
    })
}
console.log(info[1]);
for(let i = 0; i < botones.length; i++){
    botones[i].addEventListener("click", function(){
        for(let j = 0; j < info.length; j++){
            console.log(info[j]);
            info[j].style.display = "none";
        }
        console.log(i - 1);
        info[i].style.display = "block";
    })
}







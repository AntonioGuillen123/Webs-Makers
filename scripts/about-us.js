var names = document.querySelectorAll("#name");
var info = document.querySelectorAll("#personInfo");
var first = document.getElementById("first");

console.log(info)
for(var i = 0; i < names.length; i++ ){
    names[i].addEventListener("mouseover", function(){
        this.style.background = "#3554EE";
        this.style.color = "black";

    });
    names[i].addEventListener("mouseout", function(){
        this.style.background = "";
        this.style.color = "";
        
    })
}

for(var i = 0; i < names.length; i++){
    names[i].addEventListener("click", function(){
        first.parentNode.removeChild(first);
        first = info[i];
    })
}







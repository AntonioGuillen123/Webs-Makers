var botones = document.querySelectorAll('button');
var info = document.querySelectorAll(".contenido");
var first = document.getElementById("first");

info[0].style.display = "block";



for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener("mouseover", function () {
        this.style.background = "#3554EE";
        this.style.color = "black";

    });
    botones[i].addEventListener("mouseout", function () {
        this.style.background = "";
        this.style.color = "";

    })

}

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
        dontSee(info);
        quitStyle(botones);
        info[i].style.display = "block";
        botones[i].classList.add("activeBtn");

    })

}

function dontSee(element) {
    for (let i = 0; i < element.length; i++) {
        info[i].style.display = "none";
    }
}
function quitStyle(element){
    for (let i = 0; i < element.length; i++) {
        botones[i].classList.remove("activeBtn")
    }
}









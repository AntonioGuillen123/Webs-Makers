var botones = document.querySelectorAll('button');
var info = document.querySelectorAll(".contenido");



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
        info[i - 1].style.display = "block";
        botones[i].classList.add("activeBtn");

    })

}

function dontSee(element) {
    for (let i = 0; i < element.length; i++) {
        info[i].style.display = "none";
    }
}
function quitStyle(element) {
    for (let i = 0; i < element.length; i++) {
        botones[i].classList.remove("activeBtn")
    }
}



window.addEventListener('scroll', () => {
    var transitionElement = document.querySelectorAll('.transition');
    var windowHeight = window.innerHeight;

    transitionElement.forEach((container) => {

        // Esto obtiene la posicion vertical del elemento con respecto a la parte superior de la ventana del navegador. 
        // Devuelve un DOMRect y el .top es una propiedad para saber la distancia en píxeles entre la parte superior del elemento y
        // la parte superior visible del área de contenido de la ventana del navegador. 
        var position = container.getBoundingClientRect().top;

        if (position - windowHeight + 200 < 0) {
            container.classList.add('fade-in');
        }
    });
});




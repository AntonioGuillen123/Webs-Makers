function setActive(htmlValue){
    var options = document.getElementsByClassName("options");

    for (let i = 0; i < options.length; i++) {
        options[i].innerHTML.includes(htmlValue) ? options[i].classList.add("active") : options[i].classList.remove("active");
    }
}
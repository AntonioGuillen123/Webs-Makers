var div1 = document.getElementById("name");
var div2 = document.getElementById("personInfo");
// var elmMenu = document.getElementsByClassName("menu-item");
// var i;
// for (i = 0; i < elmMenu.length; i++) {
//   elmMenu[i].style.backgroundColor = "#92a8d1";
// }

for (i = 0; i < div1.length; i++) {
    function nameMouseOver(){
        
        div1[i].style.background = "#0404B4";
        div1[i].style.color = "black"
    
    }
    function nameMouseOut(){
        div1[i].style.background = "rgb(75, 208, 238)";
        div1[i].style.color = "white"
    
    }
    
    div1[i].addEventListener("mouseover", nameMouseOver);
    div1[i].addEventListener("mouseout", nameMouseOut);
    }



function infoMouseOver(){
    div2.style.background = "#A4A4A4";
    div2.style.color = "black"

}
function infoMouseOut(){
    div2.style.background = "black";
    div2.style.color = "white"

}


div2.addEventListener("mouseover", infoMouseOver);
div2.addEventListener("mouseout", infoMouseOut);


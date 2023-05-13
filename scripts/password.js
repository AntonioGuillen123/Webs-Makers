const truePassword = "asdf";
var count = 3;

function writePassword() {

    submitPassword();

    checkPassword();

}

function checkPassword() {
    var input = document.getElementById("data");
    var tries = document.getElementById("tries");
    var fail = document.getElementById("failPassword");

    if (input.value == truePassword) {
        window.location.href = "admin.html";
    }
    else {
        formAdmin.classList.add("vibration");
        removeVibration();
        tries.innerHTML = `Intentos restantes: ${count}`;
        if (count > 0) {
            if (input.value === "") {
                fail.innerHTML = "*No has introducido contraseña*";
            } else {
                fail.innerHTML = "*Contraseña incorrecta*";
                input.value = "";
            }
            count--;
        }
        else {
            alert("Ha alcanzado el máximo número de intentos\nNo ha podido entrar en modo Admin");
            window.location.href = "../index.html";
        }
    }
}

function submitPassword() {
    var form = document.getElementsByTagName("form")[0];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        if (input.value == truePassword) {
            form.submit();
        }
    })
}

function removeVibration() {
    var formAdmin = document.getElementById("formAdmin");
    setTimeout(() => {
        formAdmin.classList.remove("vibration");
    }, 500);
}
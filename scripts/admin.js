


function youAreAdmin() {
    var session = sessionStorage.getItem("firstTime");

    if (session != "true") {
        sessionStorage.setItem("firstTime", true);

        alert("Has entrado en modo admin\nAhora tienes privilegios");
    }
}
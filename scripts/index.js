async function startIndex() {
    var logo = document.getElementById("logoImg");
    var go = false;

    logo.addEventListener("mouseover", () => {
        go = true;

        logo.style.transform = "rotate(360deg)";
        logo.style.webkitTransform = "rotate(360deg)";

        setTimeout(() => {
            if (go) {
                logo.style.transform = "none";
                logo.style.webkitTransform = "none"

                setTimeout(() => {
                    window.location.href = "pages/password.html";
                }, 1000);
            }
        }, 10000);
    });

    logo.addEventListener("mouseleave", () => {
        go = false;

        logo.style.transform = "none";
        logo.style.webkitTransform = "none"
    });
}
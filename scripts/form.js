

function valideForm() {

    var form = document.getElementById("Form")
    
    form.addEventListener("submit", function(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        if(email == "" || message == "" ){
            alert("Please enter a valid email and message");
        } else{
            form.submit();
        }
    });


};

valideForm();


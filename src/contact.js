// MODAL SHOWING/HIDING
console.log("yippee");
var modal = document.getElementById("contactModal");
modal.style.display = "none";
function showModal() {
    if(modal.style.display == "none"){
        modal.style.display = "block";
    }else{
        modal.style.display = "none";
    }
    // clear success message
    document.querySelector('#errors').innerText.replace("Message sent successfully!","");
    return false;
}

var contactButton = document.getElementById("contactButton");
contactButton.addEventListener("click", showModal);

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", showModal);

// VALIDATE FORM FIELDS
function validateEmail() {
    const regex = /^[A-Za-z0-9._]+@{1}[A-Za-z0-9]+.{1}(com|net|dev|org|edu|gov){1}$/;
    var response = document.getElementById("user_email").value;
    if(regex.test(response) == true){
        return 0;
    }else{
        return 1;
    }
}

function validateName() {
    const regex = /^[a-z A-Z,.'-]+$/;
    var fnameResponse = document.getElementById("user_fname").value;
    var lnameResponse = document.getElementById("user_lname").value;
    if(regex.test(fnameResponse) == true && regex.test(lnameResponse == true)){
        return 0;
    }else{
        return 1;
    }
}

function validatePhone() {
    const regex = /^([0-9]{3}-[0-9]{3}-[0-9]{4})$/;
    var response = document.getElementById("user_phone").value;
    if(regex.test(response) == true){
        return 0;
    }else{
        return 1;
    }
}

// RENDER ERROR MESSAGES
function renderError(){
    var error = document.querySelector('#errors');
    // render email error
    if(validateEmail() == 1){
        error.append("Email address invalid. Please review your answer and ensure you are using an email from .com/.net/.org/.gov/.edu/.dev");
        return 1;
    }else{
        error.innerText = error.innerText.replace("Email address invalid. Please review your answer and ensure you are using an email from .com/.net/.org/.gov/.edu/.dev","");
    }
    // render name(s) error(s)
    if(validateName() == 1){
        error.append("Alphabetical and dashes/apostrophes only. Please review the name fields.");
        return 1;
    }else{
        error.innerText = error.innerText.replace("Alphabetical and dashes/apostrophes only. Please review the name fields.","");
    }
    // render phone error
    if(validatePhone() == 1){
        error.append("Phone number should be in the format 555-555-5555.");
        return 1;
    }else{
        error.innerText = error.innerText.replace("Phone number should be in the format 555-555-5555.","");
    }
    return 0;
}

// EMAILJS SET UP
emailjs.init('tLQQ9nD_XeWrLHmmI');

window.onload = function() {
    document.getElementById('contact').addEventListener('submit', function(event) {
        event.preventDefault();
        // check for no errors
        if(renderError() == 0){
        // try to send the email
        emailjs.sendForm('contact_service', 'template_u5c9gew', this)
            .then(function() {
                console.log('SUCCESS!');
                // remove error message and display success message
                document.querySelector('#errors').innerText.replace("Message failed to send. Please try again.","");
                document.querySelector('#errors').append("Message sent successfully!");
                // clear form
                document.getElementById('contact').reset();
            }, function(error) {
                // remove success message and display error message
                console.log('FAILED...', error);
                document.querySelector('#errors').innerText.replace("Message sent successfully!","");
                document.querySelector('#errors').append("Message failed to send. Please try again.");
            });
        }
    });
}
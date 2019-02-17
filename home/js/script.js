let nameInputNode = document.querySelector(".name-input");
let emailInputNode = document.querySelector(".email-input");
let formNode = document.querySelector("#game-form");
let submitButtonNode = document.querySelector(".subscribe-button");

formNode.addEventListener("submit", function (event) {
    if (submitButtonNode.classList.contains("disabled")) {
        event.preventDefault();
        console.log("już zapisany");
    } else {
        event.preventDefault();
        let emailInputValue = event.target.email.value;
        let nameInputValue = event.target.name.value;
        sendForm(nameInputValue, emailInputValue);
        submitButtonNode.classList.add("disabled");
    }
});

function sendForm(name, email) {
    fetch("https://moveit-landing-page.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
}


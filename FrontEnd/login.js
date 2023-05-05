/*let form = {
    email    : document.querySelector("#email"),
    password : document.querySelector("#password"),
    submit   : document.querySelector("#btn-submit")
}

async function fetchLogin (form) {
    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value
        })
    })

    if (response.status === 200) {
        let credentials = ''
        await response.json().then(body => credentials = body)

        // L'utilisateur doit étre connecté, tant que le navigateur est ouvert.
        await localStorage.setItem( 'userCredentials', JSON.stringify(credentials))
        window.location.href = 'index.html'

    }
    else if (response.status === 401) {
        const errorText = document.querySelector('.error')
        errorText.innerText = 'Mot de passe ou identifiant incorrect.'
    }
    else {
        window.location.href = '404.html'
    }
}

let submitButton = form.submit.addEventListener("click", (e) => {
    e.preventDefault()
    fetchLogin(form)
})*/

// Define an object that holds references to the form fields and submit button
const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password")
};
const submitBtn = document.querySelector("#btn-submit")




// Display an error message to the user
function displayError(message) {
    const errorText = document.querySelector('.error');
    errorText.innerText = message;
}

// Send a login request to the server and handle the response
async function login(formData) {

        // Send a POST request to the server with the email and password as JSON data in the request body
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // If the response indicates an error, display an appropriate error message to the user
        if (!response.ok) {
            if (response.status === 401) {
                displayError("Mot de passe incorrect");
            } else {
                displayError("Aucun utilisateur ne correspond");
                throw new Error(`Failed to login: ${response.statusText}`);
            }
            return;
        }

        // If the response is successful, extract the token and user ID from the response body
        const { token, userId } = await response.json();
        // Store the token and user ID in local storage for later use
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        // Redirect the user to the index page
        window.location.href = "index.html";

}

// Validate the form data and return an array of error messages, if any
function validateEmail(email) {
    // email validity test
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];

    if (!formData.email) {
        errors.push("Email is required");
    } else if (!validateEmail(formData.email)){
        errors.push("Email is not valid");
    }

    if (!formData.password) {
        errors.push("Password is required");
    }

    if(formData.email)
    return errors;
}

// Handle the form submission event
function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Extract the email and password from the form fields and trim any whitespace
    const formData = {
        email: form.email.value.trim(),
        password: form.password.value.trim()
    };
    console.log(formData)
    // Validate the form data and display any errors to the user
    const errors = validateForm(formData);
    if (errors.length) {
        displayError(errors.join("\n"));
        return;
    }
    // Send the login request to the server
    login(formData);
}

// Attach an event listener to the submit button to handle form submissions
submitBtn.addEventListener("click", handleSubmit);
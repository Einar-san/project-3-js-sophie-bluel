let form = {
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

        // L'utilisateur est connecté, tant que le navigateur est ouvert.
        await sessionStorage.setItem( 'userCredentials', JSON.stringify(credentials))
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
})


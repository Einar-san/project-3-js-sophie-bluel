// Get user credentials
const userCredentials = localStorage
const headerNode = document.querySelector('header')

// Create edit mod barre elements
const editModBar = document.createElement('div')
editModBar.classList.add('edit-mod-bar')

// Build logout button
const loginLink = document.querySelector('.login-link')

// Logout button process
 function logoutBtn () {
    loginLink.innerText = "Logout"
    loginLink.href='#'
    loginLink.addEventListener("click", clearLocalSession)
}

// remove logout process from button
function clearLocalSession (event) {
    event.preventDefault()
    localStorage.clear();
    loginLink.removeEventListener("click", clearLocalSession)
    window.location.href = "index.html"
}
function buildEditMod () {

        editModBar.innerText = "Mode édition"

        const publishBtn = document.createElement('button')
        publishBtn.classList.add('publish-button')
        publishBtn.innerText = "publier les changements"
        publishBtn.addEventListener("click", applyModification)


        const editIcon = document.createElement('iframe')
        editIcon.setAttribute('src', 'assets/icons/editIcon.svg')
        editModBar.prepend(editIcon)
        editModBar.append(publishBtn)
        headerNode.classList.add('connected')
        headerNode.parentNode.insertBefore(editModBar, headerNode)

}

// hidde filter and show modal button and reverse it
function hiddenClass () {
    const btnModal = document.querySelector(".modal-link")
    filters.classList.toggle('hidden')
    btnModal.classList.toggle('hidden')

}
function connected () {

    // Display logout button if user logged in
    if(userCredentials.userId === "1") {
        logoutBtn()
        buildEditMod()
        hiddenClass()
    }
    else {

    }
}

async function applyModification (event) {
    event.preventDefault()
    if(projectToDelete.length !== 0) {
        for (project of projectToDelete) {
            const response = await fetch("http://localhost:5678/api/works/"+ project, {
                method: "DELETE",
                headers: {
                    'Authorization' : `Token ${localStorage.userToken}`
                }
            })

            if(!response.ok) {
                throw new Error(`failed : ${response.statusText}`)
            }
            console.log(response.statusCode)
        }

    }

}

connected()

// Store modification used by edit mod
let projectToDelete = []


// Get the modal
let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
const modalContent = document.querySelector('.modal-content')

// Get the button that opens the modal
const btnModal = document.querySelector(".modal-link")


// Get the container for the projects
const projectContainer = document.createElement("div")
projectContainer.classList.add('project-container')

// Get the modal cards container
const modalCards = document.createElement("div")
modalCards.classList.add("modal-cards")

// Get the "add project" button
const addProjectBtn = document.createElement('button')
addProjectBtn.classList.add('add-project-btn')
addProjectBtn.innerText = "Ajouter une photo"

//get <hr/> before addProjectBtn
const modalHr = document.createElement('hr')
modalHr.classList.add('modal-hr')

// Get the "delete gallery" button
const deleteGalleryBtn = document.createElement('a')
deleteGalleryBtn.setAttribute('href', '#')
deleteGalleryBtn.classList.add('delete-gallery-btn')
deleteGalleryBtn.innerText = "Supprimer la galerie"

/*
// Get the form
const form = document.createElement("form")

// Get the title input field
const titleField = document.createElement("input")
titleField.type = "text"
titleField.name = "title"
titleField.placeholder = "Title"
titleField.required = true

// Get the select field for project categories
const categorySelect = document.createElement("select")
categorySelect.name = "category"
const categoryRoot = "http://localhost:5678/api/categories"
fetch(categoryRoot)
    .then((response) => response.json())
    .then((categories) => {
        categories.forEach((category) => {
            const option = document.createElement("option")
            option.value = category.id
            option.text = category.name
            categorySelect.appendChild(option)
        })
    })

// Get the file input field
const fileField = document.createElement("input")
fileField.type = "file"
fileField.name = "file"
fileField.accept = "image/jpeg"
fileField.required = true

// Get the submit button
const submitBtn = document.createElement("button")
submitBtn.type = "submit"
submitBtn.textContent = "Envoyer"

// Get the progress spinner
const spinner = document.createElement("div")
spinner.classList.add("spinner")

// Function to clear the modal content
function clearModalContent() {
    modalCards.innerHTML = "";
}

// Function to show the progress spinner
function showSpinner() {
    modalCards.appendChild(spinner)
}

// Function to hide the progress spinner
function hideSpinner() {
    spinner.remove()
}

// Function to handle the form submission
function handleFormSubmission(event) {
    event.preventDefault()

    // Show the progress spinner
    showSpinner()

    // Get the form data
    const formData = new FormData(event.target)

    // Add the token to the headers
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${localStorage.token}`)

    // Send the form data to the server
    const addProjectRoot = "http://localhost:5678/api/works"
    fetch(addProjectRoot, {
        method: "POST",
        headers: headers,
        body: formData,
    })
        .then((response) => response.json())
        .then((project) => {
            // Hide the progress spinner
            hideSpinner()

            // Clear the form fields
            form.reset()

            // Add the new project card
            const card = createProjectCard(project)
            modalCards.prepend(card)
        })
        .catch((error) => console.error(error))
}*/

// Function to create a project card
function createProjectCard(project) {

    // If the element was deleted from a previous modal opening, it will not appear again
    if(document.querySelector(`figure[data-id="${project.id}"]`) === null) {
        const card = document.createElement("div")
        card.setAttribute('style', "display: none")
        return card
    }
    const card = document.createElement("div")
    card.setAttribute('data-id', project.id)
    card.classList.add("modal-card")

    const cardDeleteBtn = document.createElement("a")
    cardDeleteBtn.setAttribute('href', '#')
    cardDeleteBtn.setAttribute('data-id', project.id)
    cardDeleteBtn.classList.add('card-delete-btn')
    const cardDeleteBtnIcon = document.createElement("img")
    cardDeleteBtnIcon.setAttribute('data-id', project.id)
    cardDeleteBtnIcon.classList.add('delete-btn-icon')
    cardDeleteBtnIcon.setAttribute('src', 'assets/icons/delete.png')
    cardDeleteBtn.appendChild(cardDeleteBtnIcon)
    // Add event to delete buttons for each project listed in the modal
    cardDeleteBtn.addEventListener('click', deleteProject)
    card.appendChild(cardDeleteBtn)

    const img = document.createElement("img")
    img.classList.add('project-img')
    img.src = project.imageUrl
    img.alt = project.title
    card.appendChild(img)

    const editLink = document.createElement("a")
    editLink.classList.add('edit-link')
    editLink.href = project.url
    editLink.textContent = "éditer"
    card.appendChild(editLink)

    return card
}

function stopPropagation (e) {
    e.stopPropagation()
}
function openModal (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener("click", closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)

    for(post of posts) {
        projectContainer.appendChild(createProjectCard(post))
    }
    modalContent.appendChild(projectContainer)
    modalContent.appendChild(modalHr)
    modalContent.appendChild(addProjectBtn)
    modalContent.appendChild(deleteGalleryBtn)
}

// Keep focus on modal when open
function focusModal (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if(e.shiftKey === true) {
        index--
    }
    else {
        index++
    }
    if(index >= focusables.length) {
        index = 0
    }
    if(index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

// Close modal and clear it content
function closeModal (e)  {
    if (modal === null) return
    e.preventDefault()
    projectContainer.innerHTML = ""
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation)
    modal = null
}

// Add event to the button that opens the modal
btnModal.addEventListener('click', openModal)

// Add event to listen to the keys ESC, to close the modal
window.addEventListener('keydown', function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusModal(e)
    }
})

// Function to delete a project from the html file


function deleteProject (event) {
    event.preventDefault()
    const projectId = event.target.getAttribute('data-id')
    projectToDelete.push(projectId)
    event.target.parentNode.parentNode.remove()
    const indexProject = document.querySelector(`figure[data-id="${projectId}"]`)
    indexProject.remove()

    // Prevent deleted project to come back if using the filters
    const index = posts.findIndex(post => post.id == projectId)

    if (index !== -1) {
        posts.splice(index, 1)
    }
}




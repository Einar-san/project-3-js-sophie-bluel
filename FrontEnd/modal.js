// Store modification used by edit mod
let projectToDelete = []


// Get the modal
let modal = null
const modalContainer = document.createElement("div")
modalContainer.classList.add("modal-container")
const modalContent = document.querySelector(".modal-content")

// Get the button that opens the modal
const btnModal = document.querySelector(".modal-link")

// Close Modal Button
const closeModalBtn = document.createElement("a")
closeModalBtn.classList.add("js-close-modal")
closeModalBtn.setAttribute("tabindex", "1")
const closeCross = document.createElement("img")
closeCross.setAttribute("src", "assets/icons/close.svg")
closeModalBtn.appendChild(closeCross)

// Project Modal title
const modalProjectTitle = document.createElement("h2")
modalProjectTitle.classList.add("project-modal-title")
modalProjectTitle.innerText = "Galerie photo"

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


// Get the form
const newProjectForm = document.createElement("form")
newProjectForm.classList.add("new-project-form")

// Get back Arrow
const getBackArrowBtn = document.createElement("a")
getBackArrowBtn.classList.add("get-back-btn")
const getBackArrow = document.createElement("img")
getBackArrow.setAttribute("src", "assets/icons/getBackArrow.svg")
getBackArrowBtn.appendChild(getBackArrow)
// Get form title
const newProjectFormTitle = document.createElement("h2")
newProjectFormTitle.innerText = "Ajout photo"

// Get the title input field
const titleFormControl = document.createElement("div")
titleFormControl.classList.add("form-control")
const titleFieldLabel = document.createElement("label")
titleFieldLabel.setAttribute("for", "title")
titleFieldLabel.innerText = "Titre"
const titleField = document.createElement("input")
titleField.id = "title"
titleField.type = "text"
titleField.name = "title"
titleField.required = true

// Get the select field for project categories
const categoryFormControl = document.createElement("div")
categoryFormControl.classList.add("form-control")
const categoryLabel = document.createElement("label")
categoryLabel.for = "category"
categoryLabel.innerText = "Catégorie"
const categorySelect = document.createElement("select")
categorySelect.name = "category"
category.id = "category"
const voidOption = document.createElement("option")
voidOption.value = ""
voidOption.text = ""
categorySelect.appendChild(voidOption)
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
const fileFieldFormControl = document.createElement("div")
fileFieldFormControl.classList.add("form-control")
fileFieldFormControl.classList.add("file-box")

const uploadIcon = document.createElement("iframe")
uploadIcon.setAttribute("src", "assets/icons/uploadFile.svg")

const fileFieldLabel = document.createElement("label")
fileFieldLabel.innerText = "+ Ajouter photo"

const previewImage = document.createElement("img")
previewImage.setAttribute("id", "previewImage")
previewImage.setAttribute("src", "")

const fileField = document.createElement("input")
fileField.type = "file"
fileField.name = "image"
fileField.accept = "image/jpeg"
fileField.id = "file-image"

const indications = document.createElement("p")
indications.innerText = "jpg, png : 4mo max"

// Get the submit button
const submitBtn = document.createElement("button")
submitBtn.classList.add("disabled")
submitBtn.type = "submit"
submitBtn.textContent = "Envoyer"
submitBtn.disabled = true

// When an image is selected in the input file field, this will replace the field with a preview of it
function previewImageDisplay(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        if (input.files[0].size > 4000000) {
            alert("File size must be less than 4MB.");
            input.value = "";
            return;
        }
        const fileType = input.files[0].type;
        if (fileType !== "image/png" && fileType !== "image/jpeg") {
            alert("File type must be PNG or JPEG.");
            input.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

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
    cardDeleteBtnIcon.setAttribute('src', 'assets/icons/delete.svg')
    cardDeleteBtn.appendChild(cardDeleteBtnIcon)

    // Add event to delete buttons for each project listed in the modal
    cardDeleteBtn.addEventListener('click', deleteProject)
    card.appendChild(cardDeleteBtn)

    // Create the move card button
    const cardMoveBtn = document.createElement("div")
    cardMoveBtn.setAttribute('href', '#')
    cardMoveBtn.setAttribute('data-id', project.id)
    cardMoveBtn.classList.add('card-move-btn')
    const cardMoveBtnIcon = document.createElement("img")
    cardMoveBtnIcon.setAttribute('data-id', project.id)
    cardMoveBtnIcon.classList.add('move-btn-icon')
    cardMoveBtnIcon.setAttribute('src', 'assets/icons/move.svg')
    cardMoveBtn.appendChild(cardMoveBtnIcon)


    card.appendChild(cardMoveBtn)

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

// Stop the propagation of the close event on the close modal button
function stopPropagation (event) {
    event.stopPropagation()
}

// Function to open the modal
function openModal (event) {
    event.preventDefault()
    modal = document.querySelector('#modal')
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener("click", closeModal)
    closeModalBtn.addEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)

    for(post of posts) {
        projectContainer.appendChild(createProjectCard(post))
    }
    modalContainer.appendChild(modalProjectTitle)
    modalContainer.appendChild(projectContainer)
    modalContainer.appendChild(modalHr)
    modalContainer.appendChild(addProjectBtn)
    modalContainer.appendChild(deleteGalleryBtn)
    modalContent.appendChild(closeModalBtn)
    modalContent.appendChild(modalContainer)

}

// Keep focus on modal when open
function focusModal (event) {
    event.preventDefault()

    const focusables = [...modalContent.querySelectorAll('a, button, input, textarea, select')];
    let index = focusables.indexOf(document.activeElement);
    if (focusables.indexOf(document.activeElement) === -1) index =0
    // rest of your code
    if(event.shiftKey === true && index != 0) {
        index--
        focusables[index].focus()
    }
    else if (event.shiftKey === true && index === 0) {
        index = focusables.length - 1
        focusables[index].focus()
    }
    else if (event.shiftKey === false && index >= focusables.length-1) {
        index = 0
        focusables[index].focus()
    }
    else if (event.shiftKey === false && index < focusables.length){
        index++
        focusables[index].focus()
    }
}

// Close modal and clear it content
function closeModal (event)  {
    if (modal === null) return
    event.preventDefault()
    projectContainer.innerHTML = ""
    modalContainer.innerHTML = ""
    modalContent.innerHTML = ""

    // Time out to play the close animations of the modal
    window.setTimeout(() => {
        modal.style.display = "none"
        modal = null
    }, 500)

    previewImage.src = ""
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    closeModalBtn.removeEventListener('click', closeModal)
    modalContent.removeEventListener('click', stopPropagation)

}

// Back from add project modal to gallery modal
function getBack (event) {
    event.preventDefault()
    modalContainer.innerHTML = ""
    modalContent.innerHTML = ""


    for(post of posts) {
        projectContainer.appendChild(createProjectCard(post))
    }
    modalContainer.appendChild(modalProjectTitle)
    modalContainer.appendChild(projectContainer)
    modalContainer.appendChild(modalHr)
    modalContainer.appendChild(addProjectBtn)
    modalContainer.appendChild(deleteGalleryBtn)
    modalContent.appendChild(closeModalBtn)
    modalContent.appendChild(modalContainer)
}

function handleSubmit (event) {
    event.preventDefault()
    const form = document.querySelector('.new-project-form');

        const file = document.querySelector('#file-image').value;
        const title = document.querySelector('#title').value;
        const select = newProjectForm.querySelector('select').value;
        if (file !== '' && title !== '' && select !== "") {
            submitBtn.classList.remove("disabled")
            submitBtn.disabled = false
            newProjectForm.addEventListener("submit", newProject)
        }
        else {
            if(!submitBtn.classList.contains("disabled")) {
                submitBtn.classList.add("disabled")
                submitBtn.disabled = true
                newProjectForm.removeEventListener("submit", newProject)
            }
        }
}


// Create a new project
async function newProject (event) {
    event.preventDefault()

    // Test

    const form = document.querySelector(".new-project-form");
        const formData = new FormData(form);

        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.userToken}`
            },
            body: formData
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.location.href = "index.html"
}

// Open a form in a modal to add a new project
function openAddProjectModal (event) {
    event.preventDefault()

    projectContainer.innerHTML = ""
    modalContainer.innerHTML = ""

    getBackArrowBtn.addEventListener("click", getBack)
    modalContent.appendChild(getBackArrowBtn)

    fileField.addEventListener("change", previewImageDisplay)
    fileFieldLabel.appendChild(fileField)
    fileFieldFormControl.appendChild(uploadIcon)
    fileFieldFormControl.appendChild(fileFieldLabel)
    fileFieldFormControl.appendChild(previewImage)
    fileFieldFormControl.appendChild(indications)
    newProjectForm.appendChild(fileFieldFormControl)

    titleFormControl.appendChild(titleFieldLabel)
    titleFormControl.appendChild(titleField)
    newProjectForm.appendChild(titleFormControl)

    categoryFormControl.appendChild(categoryLabel)
    categoryFormControl.appendChild(categorySelect)
    newProjectForm.appendChild(categoryFormControl)

    newProjectForm.appendChild(modalHr)
    submitBtn.addEventListener("click", newProject)
    newProjectForm.appendChild(submitBtn)

    modalContainer.appendChild(newProjectFormTitle)
    newProjectForm.addEventListener("change", handleSubmit)
    modalContainer.appendChild(newProjectForm)
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

// Jump to the add project modal form
addProjectBtn.addEventListener("click", openAddProjectModal)




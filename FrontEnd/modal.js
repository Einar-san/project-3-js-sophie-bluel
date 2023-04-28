/*const modalLink = document.querySelector('.modal-link')
const modalCards = document.querySelector('.modal-cards')
let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []


function createMiniature(post) {

    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.src = post.imageUrl
    img.alt = post.title
    figure.append(img)
    const figCaption = document.createElement('figcaption')
    figCaption.innerText = post.title
    figure.append(figCaption)

    return figure
}
async function createArticles () {
    await articles()
    clearGallery(wrapper)
    const loader = document.createElement('figure')
    loader.innerText = 'chargement...'
    wrapper.append(loader)


    loader.remove()
    for(let post of posts) {
        wrapper.append(createMiniature(post))
    }
}


function stopPropagation (e) {
    e.stopPropagation()
}
function openModal (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    console.log(focusables)
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener("click", closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)
}

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

function closeModal (e)  {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation)
    modal = null
}

modalLink.addEventListener("click", openModal)

window.addEventListener('keydown', function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusModal(e)
    }
})


createArticles ()*/
// Get the gallery container
let gallery = document.querySelector("#gallery")

// Get the filter container
const filters = document.querySelector(".filters")

// The articles fetched from the server will be stored here
let posts = []

// The categories fetched from the server will be stored here
let category = []

// Get the articles from the server
const articles =  async () => {
    try {
        const res = await fetch("http://localhost:5678/api/works", {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        })
        if (!res.ok) {
            throw new Error('Erreur serveur')

        }
        posts = await res.json()

    } catch (e) {
        throw new Error('Impossible de contacter le serveur')
    }
}

// Function to create every article figure
function createFigure(post) {

    const figure = document.createElement('figure')
    figure.setAttribute("style", "display:none")
    figure.setAttribute('data-id', post.id)
    const img = document.createElement('img')
    img.src = post.imageUrl
    img.alt = post.title
    figure.append(img)
    const figCaption = document.createElement('figcaption')
    figCaption.innerText = post.title
    figure.append(figCaption)

    return figure
}

// Function to clear the gallery
function clearGallery () {
    gallery.innerHTML = ''
}

// Build gallery
async function buildGallery () {
    await articles()
    clearGallery()
    createFilters(posts)
        for(let post of posts) {
            gallery.append(createFigure(post))
        }
    const animedFigures = gallery.querySelectorAll("figure")
    for(figure of animedFigures) {
        figure.setAttribute("style", "display:block")
    }
}

// Generate the filtered gallery
async function filterFunction (filteredPosts) {
    clearGallery()
    for(let post of filteredPosts) {
        gallery.append(createFigure(post))
    }
    const animedFigures = gallery.querySelectorAll("figure")
    for(figure of animedFigures) {
        figure.setAttribute("style", "display:block")
    }
}

// Add class Active to filters when clicked
function addFilterClass (filter) {
    let activeFilter = document.querySelector('.active')
    activeFilter.classList.remove('active')
    activeFilter = document.querySelector('.'+ filter)
    activeFilter.classList.add('active')
}

// Create filter buttons
async function createFilters (posts) {

    for (post of posts) {
        if(!category.includes(post.category.name)) {
            category.push(post.category.name)
        }
    }
    let filterConstructor = document.createElement('button')
    filterConstructor.classList.add('filter')
    filterConstructor.classList.add('tout')
    filterConstructor.classList.add('active')
    filterConstructor.innerText = 'Tout'
    filters.append(filterConstructor)
    await createFilterEvent('tout')

   for (filter of category) {
        filterConstructor = document.createElement('button')
        filterConstructor.classList.add('filter')
        let filterClass = filter.replace(/[ &]/g, "-")
        filterConstructor.classList.add(filterClass)
        filterConstructor.innerText = filter
        filters.append(filterConstructor)
        let className = filter
        await createFilterEvent(className)
    }

}

// Create an array of articles that match the filter, this array will be used to display the filtered articles
async function createFilterEvent (className) {
    let classValid = className.replace(/[ &]/g, "-")
    document.querySelector('.'+classValid).addEventListener('click', ()=> {

        addFilterClass(classValid)

        let filteredPosts = []
        for(post of posts) {
            if(className === 'tout') {
                filteredPosts.push(post)
            }
            else if(className === post.category.name) {
                filteredPosts.push(post)
            }
        }
        filterFunction(filteredPosts)

    })
}


// Generate gallery
buildGallery ()










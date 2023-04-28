let wrapper = document.querySelector("#gallery")
const filters = document.querySelector(".filters")
let posts = []
let category = []


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


function createFigure(post) {

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

function clearGallery (wrapper) {
    wrapper.innerHTML = ''
}
async function createArticles () {
    await articles()
    clearGallery(wrapper)
    const loader = document.createElement('figure')
    loader.innerText = 'chargement...'
    wrapper.append(loader)

    createFilters(posts)

        loader.remove()
        for(let post of posts) {
            wrapper.append(createFigure(post))
        }
}
async function filterFunction (filteredPosts) {
    clearGallery(wrapper)
    const loader = document.createElement('figure')
    loader.innerText = 'chargement...'
    wrapper.append(loader)


    loader.remove()
    for(let post of filteredPosts) {
        wrapper.append(createFigure(post))
    }
}
function addFilterClass (filter) {
    let activeFilter = document.querySelector('.active')
    activeFilter.classList.remove('active')
    activeFilter = document.querySelector('.'+ filter)
    activeFilter.classList.add('active')
}
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

window.addEventListener('beforeunload', function(event) {
    localStorage.clear();
});

createArticles ()










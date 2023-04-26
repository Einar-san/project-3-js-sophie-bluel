let wrapper = document.querySelector("#gallery")
let posts = []
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

document.querySelector('.objets').addEventListener('click', ()=> {

    addFilterClass('objets')

    let filteredPosts = []
    for(post of posts) {
        if(1 === post.categoryId) {
            filteredPosts.push(post)
        }
    }
    filterFunction(filteredPosts)

})

document.querySelector('.appartements').addEventListener('click', ()=> {
    addFilterClass('appartements')
    let filteredPosts = []
    for(post of posts) {
        if(2 === post.categoryId) {
            filteredPosts.push(post)
        }
    }
    filterFunction(filteredPosts)
})

document.querySelector('.hotel').addEventListener('click', ()=> {
    addFilterClass('hotel')
    let filteredPosts = []
    for(post of posts) {
        if(3 === post.categoryId) {
            filteredPosts.push(post)
        }
    }
    filterFunction(filteredPosts)
})

document.querySelector('.tout').addEventListener('click', ()=> {
    addFilterClass('tout')
    filterFunction(posts)
})


createArticles ()










let logs = {}

async function logoutBtn () {
    const loginLink = document.querySelector('.login-link')
    loginLink.innerHTML = "Logout"
    loginLink.href='#'
    loginLink.addEventListener("click", () => {
        document.cookie = ""
        window.location.href = "index.html"
    })
}
/*async function editMod () {
    const editBar = document.createElement('div')
    const
    editBar.classList.add('edit-bar')
    document.body.insertBefore(editBar, document.body.querySelector('header'))

}*/
async function connected () {
    if (document.cookie === ""){
    }
    else {
        logs = JSON.parse(document.cookie)
        if(logs.userId === 1) {
            logoutBtn()
            //editMod()
        }
        else {

        }
    }


}

connected()
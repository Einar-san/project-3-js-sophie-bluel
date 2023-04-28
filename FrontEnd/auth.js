let logsLocal  = {}
async function logoutBtn () {
    const loginLink = document.querySelector('.login-link')
    loginLink.innerHTML = "Logout"
    loginLink.href='#'
    loginLink.addEventListener("click", () => {
        sessionStorage.clear();
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

    // L'utilisateur doit étre connecté, tant que le navigateur est ouvert.
    logsLocal  = await JSON.parse(localStorage.getItem('userCredentials'))
    if( logsLocal != null && logsLocal.userId === 1) {
        logoutBtn()
        //editMod()
    }
    else {

    }
}

connected()
const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
    trasactions: []
}

checkedLogged();

document.getElementById("button-logout").addEventListener("click", logout);

function checkedLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return; 
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    } 
}

function logout(){
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");

        window.location.href = "index.html";
}
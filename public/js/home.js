const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let cashIn = [];
let cashOut = [];
let data = {
    trasactions: []
};

checkedLogged();

document.getElementById("button-logout").addEventListener("click", logout);

// Adicionar lancamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-imput").value);
    const description = document.getElementById("description-imput").value;
    const date = document.getElementById("date-imput").value;
    const type = document.querySelector('input[name="type-imput"]:checked').value;
    
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    
    alert("Lançamento adicionado com sucesso!")
});


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

    getCashIn()
}

function logout(){
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");

        window.location.href = "index.html";
}

function getCashIn(){
    const transaction = data.transaction;
    const cashIn = transaction.filter((item) => item.type == "1");

    console.log(data);
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
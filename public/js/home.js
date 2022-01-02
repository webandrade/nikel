const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
    transactions: []
};

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
    
    getCashIn();
    getCashOut();
    
    alert("Lançamento adicionado com sucesso!")
});

checkedLogged();

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

    getCashIn();
    getCashOut();
}

function logout(){
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");

        window.location.href = "index.html";
}

function getCashIn(){
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type == "1");

    if(cashIn.length){
        let cashInHtml = '';
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        }else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;            
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;

    }
}

function getCashOut(){
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type == "2");

    if(cashIn.length){
        let cashInHtml = '';
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        }else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;            
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;

    }
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
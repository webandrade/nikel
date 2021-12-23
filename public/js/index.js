const myModal = new bootstrap.Modal("#register-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

checkLogged();

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-imput").value;
    const password = document.getElementById("password-imput").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Opss! Verifique o usuário ou a senha.");
        return;       
    }    

    if (account) {
        if(account.password !== password) {
            alert("Opss! Verifique o usuário ou a senha.");
            return;
        }
        
        saveSession(email, checkSession);

        window.location.href = "home.html"
    }    
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

document.getElementById("creat-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email-create-imput").value;
    const password = document.getElementById("password-create-imput").value;

    if(email.length <5 ) {
        alert("Preencha o campo com um e-mail válido!")
        return;
    }

    if(password.length <4 ) {
        alert("Preencha a senha com no mínimo de 4 dígitos!")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();

    alert("Conta criada com sucesso.");
})

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    
    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
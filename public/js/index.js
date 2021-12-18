const myModal = new bootstrap.Modal("#register-modal");

//Criar Conta
document.getElementById("creat-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email-create-imput").value;
    const pasword = document.getElementById("password-create-imput").value;

    if(email.length <5 ) {
        alert("Preencha o campo com um e-mail válido!")
        return;
    }

    if(pasword.length <4 ) {
        alert("Preencha a senha com no mínimo de 4 dígitos!")
        return;
    }

    saveAccount({
        login:email,
        pasword: pasword,
        transactions: []

    })

    myModal.hide();

    alert("Conta criada com sucesso.");
})

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
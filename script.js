document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector(".form-group");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const telefone = document.getElementById("telefone");
  const botao = document.querySelector(".btn-login");

  
  telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "");
    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    telefone.value = valor;
  });

  const forcaDiv = document.createElement("div");
  forcaDiv.id = "forca-senha";
  forcaDiv.style.marginBottom = "10px";
  senha.insertAdjacentElement("afterend", forcaDiv);

  let forcaSenha = 0;

  senha.addEventListener("input", function () {
    const valor = senha.value;
    forcaSenha = 0;
    if (valor.length >= 6) forcaSenha++;
    if (/[A-Z]/.test(valor)) forcaSenha++;
    if (/[0-9]/.test(valor)) forcaSenha++;
    if (/[^A-Za-z0-9]/.test(valor)) forcaSenha++;

    const mensagens = ["", "Fraca", "Média", "Boa", "Forte"];
    forcaDiv.textContent = valor.length > 0 ? "Senha: " + mensagens[forcaSenha] : "";
  });


  [nome, email, senha, telefone].forEach(function (campo) {
    campo.addEventListener("blur", function () {
      if (campo.value.trim() === "") {
        campo.style.border = "2px solid red";
      } else {
        campo.style.border = "2px solid green";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (nome.value.trim() === "" || email.value.trim() === "" ||
        senha.value.trim() === "" || telefone.value.trim() === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (forcaSenha <= 1) {
      alert("Sua senha é fraca! Use letras maiúsculas, números ou símbolos.");
      return;
    }

    alert("Cadastro realizado com sucesso, " + nome.value + "! 🎉");
    form.reset();
    forcaDiv.textContent = "";
    forcaSenha = 0;

    [nome, email, senha, telefone].forEach(function (campo) {
      campo.style.border = "";
    });
  });

});
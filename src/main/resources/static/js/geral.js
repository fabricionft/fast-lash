function travarTela() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

function destravarTela() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
}

function gerarMessageBox(cor, mensagem, textoBtn){
    let corDeFundo = (cor == 1) ? "rgb(214, 253, 226)" : "rgb(253, 214, 214)";

    $('#esconder').addClass('ativo')
    $('#mensagem').css("transform", "translateY(250px)").css("background", corDeFundo);
    $('#textoMensagem').html(mensagem);
    $('#btnMessage').html(textoBtn);

    travarTela();
}

function fecharMessageBox(){
    $('#esconder').removeClass('ativo')
    $('#mensagem'). css("transform", "translateY(-250px)");

    if($('#btnMessage').html() == "Voltar aos agendamentos") location.href="agendamentos.html";
    if($('#btnMessage').html() == "Prosseguir") location.reload();
    if($('#btnMessage').html() == "Entendido") finalizarsessao();
    if($('#btnMessage').html() != "Tentar novamente") destravarTela();
}

function tratarErro(err){
    if(err.status == 403) gerarMessageBox(2, "Sem autorização:<br><br> Seu token de autenticação expirou ou não existe!! Por motivos de segurança você será deslogado e redirecionado para a página inicial!", "Entendido");
    else gerarMessageBox(2, err.responseJSON.message, "Ok");
}

//Sessões
function verficarSessao(){
    if(localStorage.getItem('sessao') != "logado" || localStorage.getItem('role') != "ROLE_ADMIN") location.href="index.html";
}

function finalizarsessao(){
    localStorage.setItem('sessao', "deslogado");
    localStorage.setItem('token', "");
    localStorage.setItem('role', "");

    location.href="loginAdmin.html";
}
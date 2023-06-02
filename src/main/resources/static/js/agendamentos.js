window.onload = () =>{
    verficarSessao();
    buscarAgendamentos();
    alterarFiltro(localStorage.getItem('filtro'));
}

function alterarFiltro(filtro){
    filtro = (filtro != null) ? filtro : "Pendente";
    localStorage.setItem('filtro', filtro)
    $('#filtro').val(filtro);
    buscarAgendamentos();
}

function listarAgendamentos(dados){
    while($('[name="linha"]').length) $('#linha').remove();

    let lista = [];
    dados.forEach(agendamento =>{
        if(agendamento.status == localStorage.getItem('filtro')) lista.push(agendamento);
    });

    lista.slice().reverse().forEach(agendamento => criarLinha(agendamento));
}

function buscarAgendamentos(){
    $.ajax({
        method: "GET",
        url: "/agendamento",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        listarAgendamentos(dados);
    }).fail(function (err){
        tratarErro(err);
    });
}

function pesquisarAgendamentoPorNome(){
    if(!$('#pesquisar').val().length) location.reload();
    $.ajax({
        method: "GET",
        url: "/agendamento/nome/"+$('#pesquisar').val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        listarAgendamentos(dados);
    }).fail(function (err){
        tratarErro(err);
    });
}

function criarLinha(dados){
    $('#painel').append(
        '<div class="linha" name="linha" id="linha">'+
            '<div class="coluna-1">'+
                '<p class="texto-conteudo-agendamentos">'+dados.data+'</p>'+
            '</div>'+

            '<div class="coluna-2">'+
                '<p class="texto-conteudo-agendamentos">'+dados.codigo+'</p>'+
            '</div>'+

            '<div class="coluna-3">'+
                '<p class="texto-conteudo-agendamentos">'+dados.nome.split(" ")[0]+'</p>'+
            '</div>'+

            '<div class="coluna-4">'+
                '<p class="texto-conteudo-agendamentos">'+dados.celular+'</p>'+
            '</div>'+

            '<div class="coluna-5">'+
                '<button class="btn-detalhe" onclick="irParaOsDetalhes('+dados.codigo+')">Detalhes</button>'+
            '</div>'+
        '</div>'
    );
}

function irParaOsDetalhes(codigo){
    localStorage.setItem('codigoAgendamento', codigo);
    location.href="detalhesAgendamento.html";
}
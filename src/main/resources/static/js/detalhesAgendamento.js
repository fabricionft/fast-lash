window.onload = () =>{
    verficarSessao();
    buscarDadosDetalhamento();
}

function buscarDadosDetalhamento(){
    $.ajax({
        method: "GET",
        url: "/agendamento/"+localStorage.getItem('codigoAgendamento'),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        $("#dataAgendamento").html(dados.data);
        $("#nome").html(dados.nome);
        $("#dataNascimento").html(dados.dataNascimento);
        $("#profissao").html(dados.profissao);
        $("#celular").html(dados.celular);
        $("#email").html(dados.email);
        $("#cpf").html(dados.cpf);
        $("#rg").html(dados.rg);
        $("#endereco").html(dados.endereco);
        //Dados avaliativos
        mudarCor(dados.respostas)
        $("#detalheAlergia").html(dados.detalhesAlergia);
        $("#detalheProblemaOcular").html(dados.detalhesProblemaOcular);
        $("#detalheLado").html(dados.detalhesLado);
        $("#detalheProcedimentoAdcional").html(dados.detalhesProcedimentoAdcional);

        (dados.status == "Pendente") ? $('[name="btnAlterarStatus"]').hide().first().show() : $('[name="btnAlterarStatus"]').hide().last().show();
    }).fail(function (err)  {
        tratarErro(err);
    });
}

function mudarCor(respostas){
    let itens = $('[name="respostaSelecionada"]');

    for(i = 0; i < itens.length; i++)
        if(respostas[i] == 'nao')
            itens[i].style.background="orangered";
}

function alterarStatus(acao){
    console.log(acao)
    $.ajax({
        method: "PUT",
        url: "/agendamento/alterarStatus/"+localStorage.getItem('codigoAgendamento')+"/"+acao,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        location.href="agendamentos.html";
    }).fail(function (err)  {
        tratarErro(err);
    });
}
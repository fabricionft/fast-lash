$(document).ready(function(){
    $('[name="etapas"]').hide().first().show();
    gerarAnos();
});

function abrirFormulario(formulario){
    $('#containerCadastro').addClass('ativo');
    $('[name="form"]').hide();
    $('#'+formulario).show();

    $('[name="etapas"]').hide().first().show();
    travarTela();

    $('[name="tamanhoFio"]').remove();
    for(var i = 7; i <= 15;i++){
        $('[name="selectTamanhoFio"]').append(
            '<option value="'+i+'" name="tamanhoFio">'+i+'</option>'
        )
    }
}

function fecharFormulario(){
    $('[name="horarios"]').remove();
    indice=0;
    let formularios = document.getElementsByTagName('form');
    for(var i = 0; i < formularios.length; i++){
        formularios[i].reset();
    }
    $('#containerCadastro').removeClass('ativo');
    destravarTela();
}

function esconder(){
    $('[name="etapas"]').hide();
}

var indice = 0;
function proximo(){
    if(indice == 2) exibirInputsDeDetalhamento();
    esconder()
    indice++;
    $('#step-'+indice).hide().next().show();
}

function anterior(){
    esconder();
    $('#step-'+indice).show();
    indice--;
}

function validarEtapas(){
    switch(indice){
        case 0:
            if(validarEtapa1()) proximo();
            break;
        case 1:
            if(validarEtapa2()) proximo();
            break;
        case 2:
            if(validarEtapa3()) proximo();
            break;
        default:
            gerarMessageBox(2, "Erro não esperado, reinicie a página!", "Prosseguir");
    }
}

function exibirInputsDeDetalhamento(){
    ($('[name="possuiAlergia"]:checked').val() == "sim") ? $('#detalheAlergia').show() : $('#detalheAlergia').hide();
    ($('[name="possuiProblemaOcular"]:checked').val() == "sim") ? $('#detalheProblemaOcular').show() : $('#detalheProblemaOcular').hide();
    ($('[name="dormeDeLado"]:checked').val() == "sim") ? $('#detalheLado').show() : $('#detalheLado').hide();
}

function gerarAnos(){
    for(var i = 2018; i>= 1940; i--){
        $('#anoDataNascimento').append(
            '<option>'+i+'</option>'
        );
    }
}

function gerarDias(){
    let mes = $('#mesDataNascimento').val();
    let dias = (mes == 01 || mes == 03 || mes == 05 ||mes == 07 ||
                mes == 08 || mes == 10 || mes == 12) ? 31 : 30;
                if(mes == 02) dias = 28;

    while($("[name='dia']").length) $('#dia').remove();
    for(var i = 1; i <= dias; i++){
        let dia = (i <= 9) ? "0"+i : i;
        $('#diaDataNascimento').append(
            '<option id="dia" name="dia">'+dia+'</option>'
        );
    }
}


function buscarEnderecoPorCEP(){
    if($('#cep').val().length != 8) gerarMessageBox(2, "Por favor digite o CEP completo", "Tentar novamente");
    else{
        $.ajax({
            method: "GET",
            url: "https://viacep.com.br/ws/"+$('#cep').val()+"/json/",
            success: function (dados){
                if(dados.uf == null) gerarMessageBox(2, "CEP inexistente", "Ok");
                else{
                    $('#estado').val(dados.uf);
                    $('#cidade').val(dados.localidade);
                    $('#bairro').val(dados.bairro);
                    $('#rua').val(dados.logradouro);
                }
            }
        }).fail(function(err){
            tratarErro(err);
        });
    }
}


function agendar(){
    let dataDeNascimento = $('#diaDataNascimento').val() +"/"+$('#mesDataNascimento').val()+"/"+$('#anoDataNascimento').val();
    let complemante = ($('#complemento').val().length) ? $('#complemento').val() : "sem complemento";
    let endereco = $('#cep').val()+", "+$('#estado').val()+", "+$('#cidade').val()+", "+$('#bairro').val()+
                   ", "+$('#rua').val()+", "+$('#numero').val()+", "+complemante;
    let detalheProcedimentoAdcional = ($('#textoDetalheProcedimentoAdcional').val().length) ? $('#textoDetalheProcedimentoAdcional').val() : "Sem procedimento adcional";
    let detalheAlergia = ($('#textoDetalheAlergia').val().length) ? $('#textoDetalheAlergia').val() : "Não possui alergia";
    let detalheProblemaOcular = ($('#textoDetalheProblemaOcular').val().length) ? $('#textoDetalheProblemaOcular').val() : "Não possui problema ocular";
    let detalheLado = ($('#textoDetalheLado').val().length) ? $('#textoDetalheLado').val() : "Não dorme de lado";

    listaDeRespostas = [$('[name="estaDeRimel"]:checked').val(),
                        $('[name="estaGravida"]:checked').val(),
                        $('[name="procedimentoRecenteNosOlhos"]:checked').val(),
                        $('[name="possuiAlergia"]:checked').val(),
                        $('[name="possuiProblemaNaTireoide"]:checked').val(),
                        $('[name="possuiProblemaOcular"]:checked').val(),
                        $('[name="estaEmTratamentoOncologico"]:checked').val(),
                        $('[name="dormeDeLado"]:checked').val()];

   $.ajax({
        method: "POST",
        url: "/agendamento",
        data: JSON.stringify(
        {
            //Dados pessoais
            nome: $('#nome').val(),
            dataNascimento: dataDeNascimento,
            profissao: $('#profissao').val(),
            celular: $('#celular').val(),
            email: $('#email').val().trim(),
            rg: $('#rg').val(),
            cpf: $('#cpf').val(),
            endereco: endereco,
            //Dados avaliativos
            respostas: listaDeRespostas,
            detalhesAlergia: detalheAlergia,
            detalhesProblemaOcular: detalheProblemaOcular,
            detalhesLado: detalheLado,
            detalhesProcedimentoAdcional: detalheProcedimentoAdcional
        }),
        contentType: "application/json; charset-utf8",
        success: function (dados){
            console.log(dados.codigo);
            gerarMessageBox(1, "Agendamento realizado com sucesso! Em breve entraremos em contato<br><br>Código do agendamento: "+dados.codigo, "Prosseguir");
        }
    }).fail(function(err){
        gerarMessageBox(2, err.responseJSON.message, "Tentar novamente");
    });
}

function mudarTipoInput(){
    if($('#senha').attr('type') == "password"){
        $('#senha').attr('type', "text");
        $('#imgOlho').attr('src', "img/olhoF.png")
    }else{
        $('#senha').attr('type', "password");
        $('#imgOlho').attr('src', "img/olho.png")
    }
}

function fazerLogin(){
    $.ajax({
        method: "POST",
        url: "/admin/login/"+$('#usuario').val()+"/"+$('#senha').val(),
        success: function (dados){
            if(dados.role == "ROLE_ADMIN"){
                adcionarSessaoDeLogin(dados);
                location.href="menuAdmin.html";
            }else gerarMessageBox(2, "Desculpe, seu usuário não possui o papel de administrador!", "Tentar novamente");
        }
    }).fail(function(err){
        tratarErro(err);
    });
}

function adcionarSessaoDeLogin(dados){
    localStorage.setItem('sessao', "logado");
    localStorage.setItem('token', dados.token);
    localStorage.setItem('role', dados.role);
}
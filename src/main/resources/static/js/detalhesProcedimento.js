window.onload = () =>{
    verficarSessao();
    adcionarDados();
}

function adcionarDados(){
    $.ajax({
        method: "GET",
        url: "/agendamento/"+localStorage.getItem('codigoAgendamento'),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        $("#mappingVizualizar").html(dados.procedimento.mapping);
        $("#estiloVizualizar").html(dados.procedimento.estilo);
        $("#estiloVizualizar").html(dados.procedimento.estilo);
        $("#modeloFiosVizualizar").html(dados.procedimento.modeloDosFios);
        $("#espessuraVizualizar").html(dados.procedimento.espessura+" cm");
        $("#curvaturaVizualizar").html(dados.procedimento.curvatura+" º");
        $("#adesivoOuColaVizualizar").html(dados.procedimento.adesivoCola);
        $("#diaVizualizar").html(dados.procedimento.dia.replace('-', "/").replace('-', "/"));
        $("#horarioVizualizar").html(dados.procedimento.horario);
        $("#valorVizualizar").html("R$ "+dados.procedimento.valor.toFixed(2));

        for(let i = 1; i <= 6; i++){
            $('#olhoE-vizualizar-fio-'+i).html(dados.procedimento.fiosOlhoEsquerdo[i-1]);
            $('#olhoD-vizualizar-fio-'+i).html(dados.procedimento.fiosOlhoDireito[i-1]);
        }

        if(dados.status == "Concluido") $('[name="btn-procedimento"]').css('display', "none")
        else $('[name="btn-procedimento"]').css('display', "flex");
    }).fail(function (err)  {
        tratarErro(err);
    });
}

function alterarDados(){
    $.ajax({
        method: "GET",
        url: "/agendamento/procedimento/"+localStorage.getItem('codigoAgendamento'),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        abrirFormulario()
        $("#mapping").val(dados.mapping);
        $("#estilo").val(dados.estilo);
        $("#modeloFios").val(dados.modeloDosFios);
        $("#espessura").val(dados.espessura);
        $("#curvatura").val(dados.curvatura);
        $("#adesivoOuCola").val(dados.adesivoCola);

        for(let i = 1; i <= 6; i++){
            $('#olhoE-fio-'+i).val(dados.fiosOlhoEsquerdo[i-1]);
            $('#olhoD-fio-'+i).val(dados.fiosOlhoDireito[i-1]);
        }
    }).fail(function (err)  {
        tratarErro(err);
    });
}

function alterarAgenda(){
    let fiosDireito = [];
    let fiosEsquerdo = [];

    for(let i = 1; i <= 6; i++){
        fiosEsquerdo.push($('#olhoE-fio-'+i).val());
        fiosDireito.push($('#olhoD-fio-'+i).val());
    }

    $.ajax({
        method: "PUT",
        url: "/agenda",
        data: JSON.stringify(
        {
            codigoAgendamento: localStorage.getItem('codigoAgendamento'),
            mapping: $('#mapping').val(),
            estilo: $('#estilo').val(),
            modeloDosFios: $('#modeloFios').val(),
            espessura: $('#espessura').val(),
            curvatura: $('#curvatura').val(),
            adesivoCola: $('#adesivoOuCola').val(),
            fiosOlhoEsquerdo: fiosEsquerdo,
            fiosOlhoDireito: fiosDireito
        }),
        contentType: "application/json; charset-utf8",
        success: function (dados){
            gerarMessageBox(1, "Agendamento de horário realizado com sucesso!<br><br>Código da agenda: "+dados.codigo, "Prosseguir");
        }
    }).fail(function(err){
        gerarMessageBox(2, err.responseJSON.message, "Tentar novamente");
    });
}

function removerDaAgenda(){
    $.ajax({
        method: "DELETE",
        url: "/agenda/removerAgendamento/"+localStorage.getItem('codigoAgendamento'),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        gerarMessageBox(1, "Agendamento removido da agenda com sucesso!", "Voltar aos agendamentos");
    }).fail(function (err)  {
        tratarErro(err);
    });
}
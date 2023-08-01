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
        let dia = dados.procedimento.dia.replace('-', '/').replace('-', '/');
        let diaFormatado = dia.split("/")[2] +"/"+ dia.split("/")[1] +"/"+ dia.split("/")[0];

        $("#mappingVizualizar").html(dados.procedimento.mapping);
        $("#estiloVizualizar").html(dados.procedimento.estilo);
        $("#estiloVizualizar").html(dados.procedimento.estilo);
        $("#modeloFiosVizualizar").html(dados.procedimento.modeloDosFios);
        $("#espessuraVizualizar").html(dados.procedimento.espessura+" mm");
        $("#curvaturaVizualizar").html(dados.procedimento.curvatura);
        $("#adesivoOuColaVizualizar").html(dados.procedimento.adesivoCola);
        $("#diaVizualizar").html(diaFormatado);
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

function abrirFormularioEditarProcedimento(){
    $.ajax({
        method: "GET",
        url: "/agendamento/procedimento/"+localStorage.getItem('codigoAgendamento'),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        abrirFormulario('alterarProcedimento');
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

function alterarProcedimento(){
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

function alterarData(){
   let dia = $('#data').val();
   let valorDia = dia.split("-");
   let data = new Date(valorDia[0], valorDia[1]-1, valorDia[2]).getDay();
   let diaDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][data];

   if($('#horarios').val() != "escolha"){
        $.ajax({
           method: "PUT",
           url: "agenda/alterarDiaEHorario/"+localStorage.getItem('codigoAgendamento'),
           data: JSON.stringify(
           {
               diaDaSemana: diaSemana,
               dia: dia,
               horario: $('#horarios').val()
           }),
           contentType: "application/json; charset-utf8",
           beforeSend: function (xhr) {
               xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
           }
       }).done(function (dados) {
           gerarMessageBox(1, "Data e horário alterados com sucesso!", "Prosseguir");
       }).fail(function (err)  {
           tratarErro(err);
       });
   }else gerarMessageBox(2, "Você precisa escolher um horário para poder concluir a alteração!", "Tentar novamente");
}
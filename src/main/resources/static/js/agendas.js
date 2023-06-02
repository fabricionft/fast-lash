window.onload = () =>{
    verficarSessao();
    listarAgendas();
}

function listarAgendas(){
    $.ajax({
        method: "GET",
        url: "/agenda",
        success: function (dados){
            criarAgendas(dados);
        }
    }).fail(function(err){
        tratarErro(err);
    });
}

function criarAgendas(agendas){
    $('[name="dia"]').remove();
    agendas.forEach(agenda => {
        $('#painel').append(
            '<div class="dia" name="dia">'+
                '<div class="margem-dia">'+
                    '<div class="texto-dia">'+agenda.data.replace('-', '/').replace('-', '/')+'<br>'+agenda.diaDaSemana+'</div>'+
                    '<div id="'+agenda.codigo+'" class="horarios" id="horarios">'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        agenda.agendamentos.forEach(agendamento => {
            $('#'+agenda.codigo).append(
                '<button class="btn-redirecionar-para-agendamento" onclick="irParaOsDetalhes('+agendamento.codigo+')">'+agendamento.procedimento.horario+'</button>'
            );
        })
    });

    if(!agendas.length){
        $('#conteudo').append(
           '<h1 class="aviso">Sem agendas</h1>'
        );
    }
}

function irParaOsDetalhes(codigo){
    localStorage.setItem('codigoAgendamento', codigo);
    location.href="detalhesAgendamento.html";
}

function gerarHorarios(valor){
    let dia = valor.split("-");
    let data = new Date(dia[0], dia[1]-1, dia[2]).getDay();
    diaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][data];
    dataFormatada = valor.split("-")[2]+"-"+valor.split("-")[1]+"-"+valor.split("-")[0];

    if(diaSemana == "SÁB") gerarMessageBox(2, "Você não pode selecionar sabádos", "Tentar novamente");
    else buscarHorariosDisponiveis(dataFormatada, diaSemana);
}

function buscarHorariosDisponiveis(data, diaSemana){
    $.ajax({
        method: "GET",
        url: "/agenda/"+data+"/"+diaSemana,
        success: function (dados){
            adcionarHorarios(dados);
        }
    }).fail(function(err){
        tratarErro(err);
    });
}

function adcionarHorarios(horarios){
    $('[name="horarios"]').remove();
    horarios.forEach(horario => {
        $('#horarios').append(
            '<option value="'+horario+'" name="horarios">'+horario+'</option>'
        );
    });
}

function agendarHorario(){
    let fiosEsquerdo = [];
    let fiosDireito = [];

    for(let i = 1; i <= 6; i++){
        fiosEsquerdo.push($('#olhoE-fio-'+i).val());
        fiosDireito.push($('#olhoD-fio-'+i).val());
    }

    $.ajax({
        method: "POST",
        url: "/agenda",
        data: JSON.stringify(
        {
            codigoAgendamento: localStorage.getItem('codigoAgendamento'),
            data: dataFormatada,
            diaDaSemana: diaSemana,
            mapping: $('#mapping').val(),
            estilo: $('#estilo').val(),
            modeloDosFios: $('#modeloFios').val(),
            espessura: $('#espessura').val(),
            curvatura: $('#curvatura').val(),
            adesivoCola: $('#adesivoOuCola').val(),
            dia: dataFormatada,
            horario: $('#horarios').val(),
            valor: 70.0,
            fiosOlhoEsquerdo: fiosEsquerdo,
            fiosOlhoDireito: fiosDireito
        }),
        contentType: "application/json; charset-utf8",
        success: function (dados){
            console.log(fiosEsquerdo, fiosDireito)
            gerarMessageBox(1, "Agendamento de horário realizado com sucesso!<br><br>Código da agenda: "+dados.codigo, "Voltar aos agendamentos");
        }
    }).fail(function(err){
        gerarMessageBox(2, err.responseJSON.message, "Tentar novamente");
    });
}
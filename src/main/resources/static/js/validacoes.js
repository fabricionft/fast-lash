function verficarPreenchimentoDosCampos(nomeElementos){
    let inputs = document.getElementsByName(nomeElementos);
    let quantidadeNulo = 0;
    for(i = 0; i < inputs.length; i++)
        if(inputs[i].value.length == 0) quantidadeNulo++;

    if(quantidadeNulo == 0) return true;
    else{
        gerarMessageBox(2, "Por favor preencha todos os campos!!", "Tentar novamente");
        return false;
    };
}

function verificarErros(quantidadeDeErros, erros){
    let exibirErros = "Atenção:";
    erros.forEach(erro => exibirErros += "<br><br>- "+erro);

    if(quantidadeDeErros == 0) return true;
    else{
        gerarMessageBox(2, exibirErros, "Tentar novamente");
        return false;
    }
}

//Validação de etapas
function validarEtapa1(){
    if(verficarPreenchimentoDosCampos('inputFormulario-1')){
        let erros = [];
        let quantidadeDeErros = 0;

        for(i = 0; i < $('#nome').val().length; i++){
            if($.isNumeric($('#nome').val().substring(i, i+1))){
                erros.push("O nome não pode possuir números em sua composição");
                quantidadeDeErros++;
                break;
            }
        }

        if($('#mesDataNascimento').val() == "escolha" ||
           $('#diaDataNascimento').val() == "escolha" ||
           $('#anoDataNascimento').val() == "escolha"){
            erros.push("Por favor preencha complemante a data de nascimento");
            quantidadeDeErros++;
        }

        if($('#rg').val().length != 9)  {
            erros.push("Por favor digite o RG completo");
            quantidadeDeErros++;
        }

        if($('#cpf').val().length != 11)  {
            erros.push("Por favor digite o CPF completo");
            quantidadeDeErros++;
        }
        else{
            if(!verficarCPF($('#cpf').val())){
                erros.push("Por favor digite um cpf válido");
                quantidadeDeErros++;
            }
        }

        if($('#email').val().substring($('#email').val().length - 10) != "@gmail.com") {
            erros.push("É necessário que o seu email possua o prefixo '@gmail.com' no final");
            quantidadeDeErros++;
        }


        if($('#celular').val().length != 11) {
            erros.push("Por favor digite o número completo");
            quantidadeDeErros++;
        }


        if(verificarErros(quantidadeDeErros, erros)) return true;
    }
}

function validarEtapa2(){
    if(verficarPreenchimentoDosCampos('inputFormulario-2')){
        let erros = [];
        let quantidadeDeErros = 0;

        if($('#cep').val().length != 8) {
            erros.push("Por favor digite o CEP completo");
            quantidadeDeErros++;
        }

        if($('#estado').val() == "escolha") {
            erros.push("Por favor escolha seu estado");
            quantidadeDeErros++;
        }

        if(verificarErros(quantidadeDeErros, erros)) return true;
    }
}

function validarEtapa3(){
    let quantidadeDeInputsRadiosSelecionados = 0;
    for(i = 0; i < $('.input-radio').length; i++)
        quantidadeDeInputsRadiosSelecionados += ($('.input-radio')[i].checked) ? 1 : 0;

    if(quantidadeDeInputsRadiosSelecionados == 8) return true;
    else gerarMessageBox(2, "Por favor preencha todas as perguntas!", "Tentar novamente")
}



//Validação CPF
function verficarCPF(cpf){
    const digitoJ = gerarDigitoVerificador(cpf, 10);
    const digitoK = gerarDigitoVerificador(cpf, 11);

    if(digitoJ == cpf.substring(9, 10) && digitoK == cpf.substring(10,11)) return true;
    else return false;
}

function gerarDigitoVerificador(cpf, maximo){
    let somaDigitos = 0;
    let inicio = 0;
    let fim = 1;
    for(var i = maximo; i >= 2; i--){
        somaDigitos += cpf.substring(inicio, fim) * i;
        inicio++;
        fim++;
    }
    if((11 - (somaDigitos % 11)) >= 10) return 0;
    else return (11 - (somaDigitos % 11));
}



//Limitação de inputs a somente números
$(document).ready(function() {
    $("#celular").keyup(function() {
        $("#celular").val(this.value.match(/[0-9]*/));
    });
});


$(document).ready(function() {
    $("#cep").keyup(function() {
        $("#cep").val(this.value.match(/[0-9]*/));
    });
});

$(document).ready(function() {
    $("#cpf").keyup(function() {
        $("#cpf").val(this.value.match(/[0-9]*/));
    });
});


$(document).ready(function() {
    $("#celular").keyup(function() {
        $("#celular").val(this.value.match(/[0-9]*/));
    });
});
import useMessageBox from "./useMessageBox";

const useValidacoes = () => {

  const {exibirMensagem} = useMessageBox();


  const validatEtapa1FormularioAgendamento = (agendamento) => {
    if((agendamento.nome && agendamento.diaNascimento 
      && agendamento.mesNascimento && agendamento.anoNascimento && agendamento.profissao 
      && agendamento.celular && agendamento.cpf && agendamento.rg) ? true : false){
      let erros = [];

      if(agendamento.diaNascimento == "escolha" ||
         agendamento.mesNascimento == "escolha" ||
         agendamento.anoNascimento == "escolha") erros.push("Preencha sua data de nascimento corretamente!");

      if(agendamento.cpf.length != 11)erros.push("Digite o CPF corretamente!");
      else if(!validarCPF(agendamento.cpf)) erros.push("Digite um cpf válido!");

      if(agendamento.rg.length != 9) erros.push("Digite o RG corretamente!");

      if(!agendamento.email.endsWith("@gmail.com")) erros.push("Seu email precisa conter o prefixo @gmail.com no final!");

      if(agendamento.celular.length != 11) erros.push("Digite o celular corretamente!");


      if(!erros.length) return true;
      else{
        exibirMensagem(
          '',
          erros,
          false
        )
      }
    }else{
      exibirMensagem(
        '',
        "Preencha todos os campos desta etapa",
        false
      )
    }
  }

  const validatEtapa2FormularioAgendamento = (agendamento) => {
    if((agendamento.cep && agendamento.estado && agendamento.cidade && agendamento.bairro && agendamento.rua  && agendamento.numero) ? true : false){
      let erros = [];

      if(agendamento.cep.length != 8) erros.push("Digite o CEP corretamente");
      if(agendamento.estado == "escolha") erros.push("Selecione seu estado!");

      if(!erros.length) return true;
      else{
        exibirMensagem(
          '',
          erros,
          false
        )
      }
    }
    else{
      exibirMensagem(
        '',
        "Preencha todos os campos desta etapa",
        false
      )
    }
  }

  function validarCPF(cpf){
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

  const validarEtapa1FormularioProcedimento = (objeto) => {    
    if((objeto.mapping && objeto.estilo && objeto.modeloDosFios && objeto.curvatura && objeto.espessura) ? true : false) return true;
    else{
      exibirMensagem(
        '',
        "Preencha todos os campos desta etapa",
        false
      )
    }
  }

  const validarConclusaoFormularioProcedimento = (objeto) => {  
    if((objeto.data && objeto.diaDaSemana && objeto.horario != "escolha") ? true : false) return true;
    else{
      exibirMensagem(
        '',
        "Preencha todos os campos desta etapa",
        false
      )
    }  
  }


  return {validatEtapa1FormularioAgendamento, validatEtapa2FormularioAgendamento, validarEtapa1FormularioProcedimento, validarConclusaoFormularioProcedimento}
}

export default useValidacoes;
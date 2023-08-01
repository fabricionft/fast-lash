import { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import useMessageBox from './useMessageBox';
import useValidacoes from './useValidacoes';
import useTratarErros from './useTratarErros';

const useProcedimento = () => {

  const {id} = useParams();
  const [horarios, setHorarios] = useState([]);
  const [procedimento, setProcedimento] = useState({
    fiosOlhoEsquerdo: [7, 7, 7, 7, 7, 7],
    fiosOlhoDireito: [7, 7, 7, 7, 7, 7],
    horario: "escolha"
  });
  const {validarConclusaoFormularioProcedimento} = useValidacoes();
  const {exibirMensagem} = useMessageBox();
  const {tratarErroRequisicaoHTTP} = useTratarErros();


  if(["/editarProcedimento/"+id, "/procedimento/"+id, "/editarHorario/"+id].includes(location.pathname)){
    useEffect(() => {
      api.get("/agendamento/procedimento/"+id)
      .then((resp) => {
        setProcedimento(resp.data);
        if("/editarHorario/"+id == location.pathname) buscarHorarios(resp.data.data)
      })
      .catch((error) => {
        tratarErroRequisicaoHTTP(error);
      })
    }, [id])
  }

  const preencherProcedimento = (e) => setProcedimento({...procedimento, [e.target.name] : e.target.value});

  const preencherProcedimentolhoEsquerdo = (e, index) => {
    procedimento.fiosOlhoEsquerdo[index] = parseInt(e.target.value);
    setProcedimento({...procedimento, ["render"] : null});
  }
  const preencherProcedimentolhoDireito = (e, index) => {
    procedimento.fiosOlhoDireito[index] = parseInt(e.target.value);
    setProcedimento({...procedimento, ["render"] : null});
  }

  const buscarHorarios = (data) => {
    let valorDia = data.split("-");
    let dia = new Date(valorDia[0], valorDia[1]-1, valorDia[2]).getDay();
    let diaDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][dia];

    setProcedimento({...procedimento, 
      data: data,
      diaDaSemana: diaDaSemana,
      horario: "escolha"
    });

    api.get("/agenda/"+data+"/"+diaDaSemana)
    .then((resp) => {
      setHorarios(resp.data)
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
      setHorarios([]);
    });
  }

  const agendarProcedimento = (procedimento) => {
    if(validarConclusaoFormularioProcedimento(procedimento)){
      api.post("/agenda", {
        codigoAgendamento: id,
        ...procedimento})
      .then(() => {
        exibirMensagem(
          '/agendamentos',
          'Procedimento salvo com sucesso',
          true
        )
      })
      .catch((error) => {
        tratarErroRequisicaoHTTP(error);
      });
    }
  }

  const editarProcedimento = (procedimento) => {
    api.put("/agenda", {...procedimento})
    .then(() => {
      exibirMensagem(
        '/procedimento/'+id,
        'Procedimento alterado sucesso',
        true
      )
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    });
  }

  const editarHorario = (procedimento) => {
    if(validarConclusaoFormularioProcedimento(procedimento)){
      api.put("/agenda/alterarDiaEHorario",{
        codigoAgendamento: id,
        ...procedimento
      })
      .then(() => {
        exibirMensagem(
          '/procedimento/'+id,
          "Data e horário do procedimento alterados com sucesso!",
          true
        );
      })
      .catch((error) => {
        tratarErroRequisicaoHTTP(error);
      }); 
    };
  }

  const removerDaAgenda = () => {
    api.delete("/agenda/removerAgendamento/"+id)
    .then(() => {
      exibirMensagem(
        (localStorage.getItem('rotaAnteriorDetalhesAgendamento') ? localStorage.getItem('rotaAnteriorDetalhesAgendamento') : "/agendamentos"), 
        "Procedimento cancelado com sucesso",
        true
      )
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    });
  }

  return {preencherProcedimento, preencherProcedimentolhoDireito, preencherProcedimentolhoEsquerdo, buscarHorarios,
          procedimento, horarios, agendarProcedimento, editarProcedimento, editarHorario, removerDaAgenda};
}

export default useProcedimento;
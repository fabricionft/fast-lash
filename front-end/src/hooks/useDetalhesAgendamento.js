import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../services/api';
import useMessageBox from "./useMessageBox";
import useTratarErros from './useTratarErros';

const useDetalhesAgendamento = () => {

  const {id} = useParams();
  const [agendamento, setAgendamneto] = useState({});
  const {exibirMensagem} = useMessageBox();
  const {tratarErroRequisicaoHTTP} = useTratarErros();

  
  useEffect(() => {
    api.get("/agendamento/"+id)
    .then((resp) => {
      setAgendamneto(resp.data)
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    })
  }, [id])

  const alterarStatus = (codigo, acao) => {
    api.put("/agendamento/alterarStatus/"+codigo+"/"+acao)
    .then(() => {
      exibirMensagem(
        "/agendamentos",
        "Status alterado com sucesso",
        true
      )
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    })
  }


  return{agendamento, alterarStatus};
}

export default useDetalhesAgendamento;
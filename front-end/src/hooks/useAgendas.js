import { useEffect, useState } from 'react';
import api from '../services/api';
import useTratarErros from './useTratarErros';

const useAgendas = () => {

  const [agendas, setAgendas] = useState([]);
  const [visible, setVisible] = useState(true);  
  const {tratarErroRequisicaoHTTP} = useTratarErros();     
                   

  useEffect(() => {
    api.get("/agenda")
    .then((resp) => {
      setAgendas(resp.data);
      setVisible(false);
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    });
  }, [agendas])

  
  return{agendas, visible}
}

export default useAgendas ;
import { useEffect, useState } from "react"
import api from '../services/api';
import useMessageBox from "./useMessageBox";
import { useLocation } from "react-router-dom";
import apiExterna from "../services/apiExterna";
import useTratarErros from "./useTratarErros";

const useAgendamnetos = () => {

  const location = useLocation();
  const {exibirMensagem} = useMessageBox();
  const {tratarErroRequisicaoHTTP} = useTratarErros();


  //Agendamento (salvar)
  const [agendamento, setAgendamento] = useState({
    complemento: "Sem complemento",
    estaDeRimel: "nao",
    estaGravida: "nao",
    procedimentoRecenteNosOlhos: "nao",
    procedimentoRecenteNosOlho: "nao",
    possuiAlergia: "nao",
    possuiProblemaNaTireoide: "nao",
    possuiProblemaOcular: "nao",
    estaEmTratamentoOncologico: "nao",
    dormeDeLado: "nao",
    detalhesProcedimentoAdcional: "Não será necessário procedimento adcional",
    detalhesAlergia: "Não possui alergia",
    detalhesProblemaOcular: "Não possui problema ocular",
    detalhesLado: "Não dorme de lado"
  });
  const [dias, setDias] = useState([]);
  const [anos, setAnos] = useState([]);


  const preencherAgendamento = (e) => {
    setAgendamento({...agendamento, [e.target.name] : e.target.value});
  }

  const buscarEnderecoPorCEP = () => {
    if(agendamento.cep.length == 8){
      apiExterna.get('/'+agendamento.cep+'/json/')
      .then((resp) => {
        setAgendamento({...agendamento, 
          cidade: resp.data.localidade,
          estado: resp.data.uf,
          bairro: resp.data.bairro,
          rua: resp.data.logradouro,
        });
      })
      .catch((error) => {
        tratarErroRequisicaoHTTP(error);
      })
    }
    else{
      exibirMensagem(
        '',
        "Por favor digite o cep corretamente!",
        false
      )
    }
  }

  const gerarDiasEAnos = (e) => {
    let mes = e.target.value;
    let quantidadeDeDias = (['01', '03', '05', '07', '08', '10', '10'].includes(mes)) ? 31 : mes == '02' ? 28 : 30;
    
    let dias = [];
    let anos = [];
    for(var i = 1; i <= quantidadeDeDias; i++) dias.push((i < 10) ? "0".concat(i) : i);
    for(var i = 2004; i >= 1950; i--) anos.push(i);

    setDias(dias);
    setAnos(anos);
    setAgendamento({...agendamento, 
      mesNascimento: mes,
      diaNascimento: "escolha"
    })
  }

  const salvarAgendamento = (agendamento) => {
    agendamento.dataNascimento = agendamento.diaNascimento+"/"+agendamento.mesNascimento+"/"+agendamento.anoNascimento;

    agendamento.endereco = agendamento.cep+", "+agendamento.estado+", "+agendamento.cidade+", "+agendamento.bairro+
                           ", "+agendamento.rua+", "+agendamento.numero+", "+agendamento.complemento;
                           
    agendamento.respostas = [agendamento.estaDeRimel, agendamento.estaGravida, agendamento.procedimentoRecenteNosOlhos,
                            agendamento.possuiAlergia,agendamento.possuiProblemaNaTireoide, agendamento.possuiProblemaOcular,
                            agendamento.estaEmTratamentoOncologico, agendamento.dormeDeLado];
    
    api.post("/agendamento", {...agendamento})
    .then((resp) => {
      exibirMensagem(
        '/',
        "Agendamento realizado com sucesso. O código do seu agendamnto é: "+resp.data.codigo,
        true
      )
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    });
  }

  //Agendamentos (exibir)
  const [agendamentos, setAgendamnetos] = useState([]);
  const [ordem, setOrdem] = useState(() => {
    const ordem = localStorage.getItem('ordem');
    return (ordem) ? ordem : "Pendente";
  });
  const [filtro, setFiltro] = useState('');
  const [visible, setVisible] = useState(true);
  

  if(location.pathname == "/agendamentos"){
    useEffect(() => {
      api.get("/agendamento")
      .then((resp) => {
        setAgendamnetos(resp.data);
        setVisible(false);
      })
      .catch((error) => {
        tratarErroRequisicaoHTTP(error);
      })
    }, [agendamentos]);
  }

  useEffect(() => {
    localStorage.setItem('ordem', ordem)
  }, [ordem]);


  return {agendamento, dias, anos, buscarEnderecoPorCEP, gerarDiasEAnos, preencherAgendamento, salvarAgendamento,
          ordem, setOrdem, filtro, setFiltro, agendamentos, visible};
}

export default useAgendamnetos;
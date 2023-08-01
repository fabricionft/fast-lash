import styles from './Agenda.module.css';
import Container from '../../components/Container'
import Header from '../../components/Header'
import useAgenda from '../../hooks/useAgendas';
import { useState } from 'react';
import BotaoLink from '../../components/BotaoLink';
import Loader from '../../components/Loader';

export default function Agenda(){

  const {agendas, visible} = useAgenda()
  const [data, setData] = useState('');

  return(
    <Container>
      <Header
        destino={"/menuAdmin"}
      />

      <div className={styles.conteudoPainel+" "+styles[(!agendas.length) && "centralizar"]}>
        <header className={styles.acoesAgenda}>
          <input type="date" className={styles.inputBuscaDia}
            onChange={(e) => setData(e.target.value)}
            value={data}
          />

          <button type='button' className={styles.btnApagarPesquisa} onClick={() => setData('')}>Limpar</button>
        </header>

        {agendas.length ? (
          agendas.filter((agenda) => agenda.data.includes(data))
          .map((agenda) => (
            <div  key={agenda.codigo} className={styles.dia}>
              <div className={styles.margemDia}>
                <div className={styles.textoDia}>{agenda.data.split("-")[2] +"/"+ agenda.data.split("-")[1]}<br/>{agenda.diaDaSemana}</div>
                <div className={styles.horarios}>
                  {
                    agenda.agendamentos.map((agendamento) => (
                      <BotaoLink
                        key={agendamento.codigo}
                        destino={"/detalhesAgendamento/"+agendamento.codigo}
                        personalizacao={"agenda"}
                        texto={agendamento.procedimento.horario}
                      />
                    ))
                  }
                </div>
              </div>
            </div> 
          ))) 
          : visible ? <Loader/>
          : <h1 className={styles.aviso}>Sem agendas até o momento</h1> 
        }
      </div>
    </Container>
  );
}
import Container from "../../components/Container";
import Header from '../../components/Header';
import useAgendamnetos from "../../hooks/useAgendamentos";
import styles from './Agendamentos.module.css';
import BotaoLink from '../../components/BotaoLink';
import Loader from '../../components/Loader';

export default function Agendamentos(){

  const {ordem, setOrdem, filtro, setFiltro, agendamentos, visible} = useAgendamnetos();

  return(
    <Container>
      <Header
        destino={"/menuAdmin"}
      />

      {agendamentos.length ? 
        (
          <div className={styles.containerAgendamentos}>
            <div className={styles.painelAgendamentos}>
              <div className={styles.margemPainel}>
                <header className={styles.botoesPainel}>
                  <select className={styles.selectAgendamentos} onChange={(e) => setOrdem(e.target.value)} value={ordem}>
                    <option value="Pendente">Pendentes</option>
                    <option value="Agendado">Agendados</option>
                    <option value="Concluido">Concluídos</option>
                  </select>

                  <div className={styles.linhaPesquisa}>
                    <input type="text" className={styles.inpuPesquisar} placeholder="Digite um nome"
                      onChange={(e) => setFiltro(e.target.value)}
                    />
                  </div>
                </header>

                <div className={styles.conteudoPainel}>
                  <div className={styles.linha}>
                    <div className={styles.colunaP1}>
                      <p className={styles.subtituloAgendametos}>Data</p>
                    </div>

                    <div className={styles.colunaP2}>
                      <p className={styles.subtituloAgendametos}>ID</p>
                    </div>

                    <div className={styles.colunaP3}>
                      <p className={styles.subtituloAgendametos}>Nome</p>
                    </div>

                    <div className={styles.colunaP4}>
                      <p className={styles.subtituloAgendametos}>Celular</p>
                    </div>

                    <div className={styles.colunaP5}>
                      <p className={styles.subtituloAgendametos}>Ações</p>
                    </div>
                  </div>
                </div>

                {agendamentos.filter((agendamento) => agendamento.nome.toLowerCase().includes(filtro.toLowerCase()))
                .filter((agendamento) => agendamento.status == ordem)
                .map((agendamento) => (
                  <div key={agendamento.codigo} className={styles.linha}>
                    <div className={styles.coluna1}>
                      <p className={styles.textoAgendametos}>{agendamento.data}</p>
                    </div>

                    <div className={styles.coluna2}>
                      <p className={styles.textoAgendametos}>{agendamento.codigo}</p>
                    </div>

                    <div className={styles.coluna3}>
                      <p className={styles.textoAgendametos}>{agendamento.nome.split(" ")[0]}</p>
                    </div>

                    <div className={styles.coluna4}>
                      <p className={styles.textoAgendametos}>{agendamento.celular}</p>
                    </div>

                    <div className={styles.coluna5}>
                      <BotaoLink
                        destino={"/detalhesAgendamento/"+agendamento.codigo}
                        personalizacao={"agendamentos"}
                        texto={"Detalhes"}
                      />                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : visible ? <Loader/>
        : <h1 className={styles.aviso}>Sem agendamentos até o momento</h1>
      }
    </Container>
  );
}
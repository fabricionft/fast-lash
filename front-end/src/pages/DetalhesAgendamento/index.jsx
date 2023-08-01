import Container from "../../components/Container";
import useDetalhesAgendamento from "../../hooks/useDetalhesAgendamento";
import styles from './DetalhesAgendamento.module.css'
import Header from '../../components/Header';
import BotaoLink from "../../components/BotaoLink";
import Loader from '../../components/Loader';

export default function DetalhesAgendamento(){

  const {agendamento, alterarStatus} = useDetalhesAgendamento();
   
  return(
    <Container>
      <Header
        destino={(localStorage.getItem('rotaAnteriorDetalhesAgendamento') == "/agendamentos") ? "/agendamentos" : "/agenda"}
      />

      {agendamento.nome ? 
        (
          <div className={styles.containerDetalhesAgendamento}>
            <div className={styles.margemDetalhesAgendamento}>
              <div className={styles.dadosPessoais}>
                <div className={styles.conteudo}>
                  <p className={styles.subtituloConteudo}>Data</p>
                  <p className={styles.textoConteudo} >{agendamento.data}</p>

                  <p className={styles.subtituloConteudo}>Nome</p>
                  <p className={styles.textoConteudo} >{agendamento.nome}</p>

                  <p className={styles.subtituloConteudo}>Data nascimento</p>
                  <p className={styles.textoConteudo} >{agendamento.dataNascimento}</p>

                  <p className={styles.subtituloConteudo}>Profissão</p>
                  <p className={styles.textoConteudo} >{agendamento.profissao}</p>

                  <p className={styles.subtituloConteudo}>Celular</p>
                  <p className={styles.textoConteudo} >{agendamento.celular}</p>

                  <p className={styles.subtituloConteudo}>Email</p>
                  <p className={styles.textoConteudo} >{agendamento.email}</p>

                  <p className={styles.subtituloConteudo}>CPF</p>
                  <p className={styles.textoConteudo} >{agendamento.cpf}</p>

                  <p className={styles.subtituloConteudo}>RG</p>
                  <p className={styles.textoConteudo} >{agendamento.rg}</p>

                  <p className={styles.subtituloConteudo}>Endereço</p>
                  <p className={styles.textoConteudo} >{agendamento.endereco}</p>
                </div>
              </div>

              <div className={styles.dadosAvaliativos}>
                <div className={styles.conteudo}>
                  {agendamento.respostas.map((resposta, index) => (
                    <div key={index} className={styles.linhaPergunta}>
                      <div className={styles.pergunta}>
                        <p>{[
                          'Está de rímel?',
                          'É gestante?',
                          'Fez algum procedimento recentemente nos olhos?',
                          'Possui alergia à esmaltes/cométicos/cianoacrilato?',
                          'Possui problemas na tireóide?',
                          'Possui glaucoma/blefarite/algum problema ocular?',
                          'Está em tratamento oncológico?',
                          'Dorme de lado?'
                        ][index]}</p>
                      </div>

                      <div className={styles.resposta}>
                        <span className={styles.respostaSelecionada+" "+styles[(resposta == "nao" && "vermelho")]}></span>
                      </div>
                    </div>
                  ))}
                  
                  <p className={styles.subtituloConteudo1}>Detalhes alergia</p>
                  <p className={styles.textoConteudo} >{agendamento.detalhesAlergia}</p>

                  <p className={styles.subtituloConteudo}>Detalhes problema ocular</p>
                  <p className={styles.textoConteudo} >{agendamento.detalhesProblemaOcular}</p>

                  <p className={styles.subtituloConteudo}>Lado de dormir</p>
                  <p className={styles.textoConteudo} >{agendamento.detalhesLado}</p>

                  <p className={styles.subtituloConteudo}>Procedimento adcional</p>
                  <p className={styles.textoConteudo} >{agendamento.detalhesProcedimentoAdcional}</p>
                </div>
              </div>
            
              <div className={styles.botoesDetalhesAgendamento}>
                {agendamento.status == "Pendente" ? (
                    <BotaoLink
                      destino={"/agendarProcedimento/"+agendamento.codigo}
                      texto={"Agendar horario"}
                    />
                  )
                  : agendamento.status == "Agendado" ? (
                    <>
                      <BotaoLink
                        destino={"/procedimento/"+agendamento.codigo}
                        texto={"Ver procedimento"}
                      />
                      <button className={styles.btnDetalhesAgendamento} onClick={() => alterarStatus(agendamento.codigo, "concluir")}>Marcar como concluído</button>
                    </>
                  )
                  : agendamento.status == "Concluido" && (
                    <>
                      <BotaoLink
                        destino={"/procedimento/"+agendamento.codigo}
                        texto={"Ver procedimento"}
                      />
                      <button className={styles.btnDetalhesAgendamento} onClick={() => alterarStatus(agendamento.codigo, "pendenciar")}>Marcar como pendente</button> 
                    </>
                  )
                }
              </div>
            </div>
          </div>
        )
        : <Loader/>
      }   
    </Container>
   )
}
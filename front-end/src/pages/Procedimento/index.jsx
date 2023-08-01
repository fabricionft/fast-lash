import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Header from "../../components/Header";
import styles from './Procedimento.module.css';
import useProcedimento from "../../hooks/useProcedimento";
import BotaoLink from "../../components/BotaoLink";
import Loader from '../../components/Loader';
import Imagem from '../../components/Imagem';

export default function Procedimento(){

  const {id} = useParams();
  const {procedimento, removerDaAgenda} = useProcedimento();

  return(
    <Container>
      <Header
        destino={"/detalhesAgendamento/"+id}
      />

      {procedimento.mapping ? 
        (
          <div className={styles.containerDetalhesProcedimento}>
            <div className={styles.margemDetalheProcedimento}>
              <div className={styles.dadosProcedimento}>
                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Mapping</p>
                  <p className={styles.textooDadosProcedimento} >{procedimento.mapping}</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Estilo</p>
                  <p className={styles.textooDadosProcedimento} >{procedimento.estilo}</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Modelo dos fios</p>
                  <p className={styles.textooDadosProcedimento} >{procedimento.modeloDosFios}</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Espessura</p>
                  <p className={styles.textooDadosProcedimento} >{procedimento.espessura} mm</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Curvatura</p>
                  <p className={styles.textooDadosProcedimento}>{procedimento.curvatura}</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Data</p>
                  <p className={styles.textooDadosProcedimento}>
                    {procedimento.data.split("-")[2]+"/"+procedimento.data.split("-")[1]+"/"+procedimento.data.split("-")[0]}
                  </p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Horário</p>
                  <p className={styles.textooDadosProcedimento}>{procedimento.horario}</p>
                </div>

                <div className={styles.divisorDadosProcedimento}>
                  <p className={styles.subtituloDadosProcedimento}>Valor</p>
                  <p className={styles.textooDadosProcedimento}>R$ {procedimento.valor.toFixed(2)}</p>
                </div>
              </div>

              <div className={styles.imgProcedimento+" "+styles[(!procedimento.finalizado) && "distanciar"]}>
                <div className={styles.divisorImgDetalhe}>
                  <label className={styles.labelOlho}>Olho esquerdo</label>

                  {
                    procedimento.fiosOlhoEsquerdo.map((fio, index) => (
                      <p key={index} className={styles.cilios+" "+styles[['a', 'b', 'c', 'd', 'e', 'f'][index]]}>{fio}</p>
                    ))
                  }

                  <Imagem
                    nomeImagem={"imgCilios"}
                    tamanho={"100%"}
                  />
                </div>

                <div className={styles.divisorImgDetalhe}>
                  <label className={styles.labelOlho}>Olho direito</label>

                  {
                    procedimento.fiosOlhoDireito.map((fio, index) => (
                      <p key={index} className={styles.cilios+" "+styles[['a', 'b', 'c', 'd', 'e', 'f'][index]]}>{fio}</p>
                    ))
                  }

                  <Imagem
                    nomeImagem={"imgCilios"}
                    tamanho={"100%"}
                  />
                </div>
              </div>

              <div className={styles.btnsProcedimento}>
                {!procedimento.finalizado && (
                  <>
                    <BotaoLink
                      destino={"/editarProcedimento/"+id}
                      texto={"Alterar dados"}
                    />
                    
                    <BotaoLink
                      destino={"/editarHorario/"+id}
                      texto={"Alterar data"}
                    />

                    <button className={styles.btnDesmarcarProcedimento} onClick={removerDaAgenda}>Desmarcar data</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )
        : <Loader/>
      }
    </Container>
  )
}
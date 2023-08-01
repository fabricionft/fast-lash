import Container from "../../components/Container";
import styles from './MenuAdmin.module.css';
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import Imagem from "../../components/Imagem";

export default function MenuAdmin(){

  return(
    <Container>
      <Header/>

      <div className={styles.containerFuncionalidades}>
        <Link className={styles.funcionalidade} to={"/agendamentos"}>
          <div className={styles.margemFuncionalidade}>
            <div className={styles.imgFuncionalidade}>
              <Imagem 
                nomeImagem={"imgAgenda"}
                tamanho={"90px"}
              />
            </div>

            <div className={styles.tituloFuncionalidade}>
              <p className={styles.textoTituloFuncionalidade}>Agendamentos</p>
            </div>

            <div className={styles.descricaoFuncionalidade}>
              <p>Aqui você pode ver todos os agendamentos pendentes e já concluídos</p>
            </div>
          </div>
        </Link>

        <Link to={"/agenda"} className={styles.funcionalidade}>
          <div className={styles.margemFuncionalidade}>
            <div className={styles.imgFuncionalidade}>
              <Imagem 
                nomeImagem={"imgHorario"}
                tamanho={"90px"}
              />
            </div>

            <div className={styles.tituloFuncionalidade}>
              <p className={styles.textoTituloFuncionalidade}>Agenda</p>
            </div>

            <div className={styles.descricaoFuncionalidade}>
              <p>Aqui você pode ver sua agenda, com as datas e horários de atendimentos</p>
            </div>
          </div>
        </Link>
      </div>
    </Container>
  );
}
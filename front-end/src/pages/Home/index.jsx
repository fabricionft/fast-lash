import styles from './Home.module.css';
import Container from '../../components/Container';
import SeletorTema from '../../components/SeletorTema';
import {Link} from 'react-router-dom';
import Imagem from '../../components/Imagem';

export default function Home(){

  return(
    <Container centralizar={true}>
      <div className={styles.containerHome}>
        <SeletorTema/>
        
        <div className={styles.connteudoPrincipal}>
          <h1 className={styles.sloganConteudoPrincipal}>Deseja aumentar</h1>
          <h1 className={styles.sloganConteudoPrincipal}>sua autoestima?</h1>

          <p className={styles.textoConteudoPrincipal}>Agende     no botão abaixo</p>

          <Link to={"/agendar"} className={styles.btnAgendar}>Agende aqui</Link>
        </div>

        <footer className={styles.footerContatos}>
          <a href="https://wa.me/5519981377802" className={styles.linksContatos}>
            <Imagem
                nomeImagem={"imgWpp"}
                tamanho={"30px"}
                manterCor={true}
              />
          </a>

          <a href="https://www.instagram.com/lash_isis" className={styles.linksContatos}>
            <Imagem
              nomeImagem={"imgInsta"}
              tamanho={"30px"}
              manterCor={true}
            />
          </a>
        </footer>
      </div>
    </Container>
  );
}
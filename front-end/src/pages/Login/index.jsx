import Container from "../../components/Container";
import styles from './Login.module.css';
import useUsuario from "../../hooks/useUsuario";
import Icon from "../../components/Icon";

export default function Login(){

  const {ver, setVer, preencherUsuario, enviarFormulario} = useUsuario();

  return(
    <Container centralizar={true}>
      <form onSubmit={enviarFormulario} className={styles.formLogin}>
        <div className={styles.margemFormLogin}>
          <div className={styles.linhaLogin}>
            <input type="text" className={styles.inputFormLogin} placeholder="Digite seu usuário"
              name="usuario"
              onChange={(e) => preencherUsuario(e)}
            />

            <Icon
              nomeIcon={"iconUser"}
              iconLogin={true}
              tamanho={"25px"}
            />
          </div>

          <div className={styles.linhaLogin}>
            <input type={(ver) ? "text" : "password"} className={styles.inputFormLogin} placeholder="Digite sua senha"
              name="senha" 
              onChange={(e) => preencherUsuario(e)}
            />

            <Icon
              nomeIcon={(ver) ? "iconOlhoFechado" : "iconOlho"}
              iconLogin={true}
              tamanho={"25px"}
              executarAcao={() => setVer((ver) ? false : true)}
            />
          </div>

          <button className={styles.btnFormLogin}>Login</button>
        </div>
      </form>
    </Container>
  );
}
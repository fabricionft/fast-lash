import useMessageBox from '../../hooks/useMessageBox';
import useSession from '../../hooks/useSession';
import styles from './MessageBox.module.css';

export default function MessageBox(){

  const {deslogar} = useSession();
  const {visible, dados, esconder} = useMessageBox();

  const esconderEDeslogar = () => {
    esconder();
    deslogar();
  }
  
  return(
    <>
      {visible && (
        <div className={styles.containerMessagebox}>
          <div className={styles.messageBox+" "+styles[(dados.type) ? "sucess" : "error"]}>
            <div className={styles.margemMessageBox}>
              <div className={styles.textoMessgaeBox}>{
                typeof dados.msg == "string" ? dados.msg
                : dados.msg.map((msg, index) => (
                  <div key={index}>
                    - {msg}
                    {(index + 1) != dados.msg.length && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </div>
                ))
              }</div>

              <button className={styles.btnMessageBox} 
                onClick={(dados.deslogar) ? esconderEDeslogar : esconder}>{dados.txtBotao}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
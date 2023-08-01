import styles from './BotaoForm.module.css';

export default function BotaoForm({estilizacao, executarAcao, textoBotao}){

  return(
    <button type='button' 
      className={styles.botaoFormulario+" "+styles[
        (estilizacao == "anterior") ?  "anterior" : (estilizacao == "finalizar") ? "finalizar" : ""
      ]}
      onClick={executarAcao}
    >
      {textoBotao}
    </button>
  );
}
import styles from './conteudoForm.module.css';

export default function conteudoForm({children}){

  return(
    <div className={styles.conteudoFormulario}>
      {children}
    </div>
  )

}
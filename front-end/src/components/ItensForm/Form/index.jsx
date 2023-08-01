import styles from './Form.module.css';

export default function Form({children}){

  return(
    <form className={styles.formulario}>
      <div className={styles.margemFormulario}>
        {children}
      </div>
    </form>
  )
}
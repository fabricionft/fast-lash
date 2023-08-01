import styles from './FooterForm.module.css';

export default function FooterForm({children}){

  return(
    <footer className={styles.footerFormulario}>
      {children}
    </footer>
  );
}
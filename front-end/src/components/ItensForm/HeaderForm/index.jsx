import styles from './HeaderForm.module.css';
import { Link } from 'react-router-dom';
import Icon from '../../Icon';

export default function HeaderForm({children, destino}){

  return(
    <header className={styles.headerFormulario}>
      <p className={styles.textoHeaderFormulario}>
        {children}
      </p>

      <Link to={destino}>
        <Icon
          nomeIcon={"iconFechar"}
          tamanho={"22.5px"}
        />
      </Link>
    </header>
  );
}
import styles from './Loader.module.css';
import useTema from '../../hooks/useTema';

import gifLoad from '../../assets/loading.gif';
import gifLoadDark from '../../assets/loading-dark.gif';

export default function Loader(){

  const {tema} = useTema();

  return(
    <div className={styles.containerLoader}>
      <img src={(tema == "ativo") ? gifLoad : gifLoadDark} className={styles.iconLoader} />
    </div>
  );
}
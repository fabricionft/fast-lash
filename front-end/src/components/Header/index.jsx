import styles from './Header.module.css';
import useSession from '../../hooks/useSession';
import { Link, useLocation } from 'react-router-dom';
import SeletorTema from '../SeletorTema';
import Icon from '../../components/Icon';

export default function Header({destino}){

  const {deslogar} = useSession();
  const location = useLocation();

  return(
    <header className={styles.headerPrincipal}>
      <div className={styles.conteudoHeader}>
        {location.pathname == "/menuAdmin" ? (
          <Icon
            nomeIcon={"iconCasa"}
            tamanho={"32px"}
            executarAcao={deslogar}
          />
        )
          : (
            <Link to={destino}>
              <Icon
                nomeIcon={"iconVoltar"}
                tamanho={"32px"}
              />
            </Link>
          )
        }
        
        {location.pathname == "/menuAdmin" && <SeletorTema/>}
      </div>

      <div className={styles.linhaHeader}></div>
    </header>
  );
}
import { Link } from "react-router-dom"
import styles from './BotaoLink.module.css';
import useRotas from '../../hooks/useRotas';

export default function BotaoLink({destino, personalizacao, texto}){

  const {marcarRotaAtual} = useRotas();

  return(
    <Link to={destino} className={styles.btnLink+" "+styles[
        (personalizacao == "agenda") ? "agenda" : (personalizacao == "agendamentos") && "agendamentos"
      ]}
      onClick={marcarRotaAtual}
    >
      {texto}
    </Link>
  ); 
}
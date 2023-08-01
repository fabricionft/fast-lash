import useTema from '../../hooks/useTema';
import styles from './icon.module.css';

import iconFechar from '../../assets/fechar.png';
import iconUser from '../../assets/user.png';
import iconOlho from '../../assets/olho.png';
import iconOlhoFechado from '../../assets/olhoF.png';
import iconCasa from '../../assets/casa.png';
import iconVoltar from '../../assets/voltar.png';

export default function Icon({nomeIcon, iconLogin, tamanho, executarAcao}){

  const {tema} = useTema();

  const icons = [
    {
      nome: "iconFechar",
      url: iconFechar
    },
    {
      nome: "iconUser",
      url: iconUser
    },
    {
      nome: "iconOlho",
      url: iconOlho
    },
    {
      nome: "iconOlhoFechado",
      url: iconOlhoFechado
    },
    {
      nome: "iconCasa",
      url: iconCasa
    },
    {
      nome: "iconVoltar",
      url: iconVoltar
    },
  ]

  let icon = icons.find((icon) => icon.nome == nomeIcon);

  return(
    <img 
      src={(icon) && icon.url}
      width={tamanho}
      className={styles.icon+" "+styles[(tema == "ativo") ? "desativo" : "ativo"]+" "+styles[(iconLogin) && "iconLogin"]}
      onClick={executarAcao}
    />
  )
}
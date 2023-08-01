import styles from './SeletorTema.module.css';
import useTema from '../../hooks/useTema';
import Imagem from '../Imagem';

export default function SeletorTema(){

  const {tema, trocarTema} = useTema();

  return(
    <label className={styles.trocarTema} onClick={trocarTema}>
      <Imagem
        nomeImagem={"imgLua"}
        tamanho={"30px"}
        manterCor={true}
      />

      <Imagem
        nomeImagem={"imgSol"}
        tamanho={"30px"}
        manterCor={true}
      />

      <div className={styles.circulo+" "+styles[(tema == "ativo") ? "ativo" : "desativo"]} id="circulo"></div>
    </label>
  );
}
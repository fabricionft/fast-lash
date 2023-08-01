import useTema from '../../hooks/useTema';
import styles from './Imagem.module.css';

import imgInsta from '../../assets/insta.png';
import imgWpp from '../../assets/wpp.png';
import imgAgenda from '../../assets/agenda.png';
import imgHorario from '../../assets/horario.png';
import imgCilios from '../../assets/cilios.png';
import imgLua from '../../assets/lua.png';
import imgSol from '../../assets/sol.png';


export default function Imagem({nomeImagem, tamanho, manterCor}){

  const {tema} = useTema();

  const imagens = [
    {
      nome: "imgInsta",
      url: imgInsta
    },
    {
      nome: "imgWpp",
      url: imgWpp
    },
    {
      nome: "imgAgenda",
      url: imgAgenda
    },
    {
      nome: "imgHorario",
      url: imgHorario
    },
    {
      nome: "imgCilios",
      url: imgCilios
    },
    {
      nome: "imgLua",
      url: imgLua
    },
    {
      nome: "imgSol",
      url: imgSol
    },
  ]

  let imagem = imagens.find(imagem => imagem.nome == nomeImagem);

  return(
    <img 
      src={(imagem) && imagem.url} 
      width={tamanho}
      className={styles[(tema == "ativo" && !manterCor) ? "desativo" : "ativo"]}
    />
  );
}
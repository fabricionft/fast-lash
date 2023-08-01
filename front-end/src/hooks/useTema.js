import { useContext } from "react";
import { TemaContext } from "../contexts/TemaContext,";

const useTema = () => {

  const {tema, trocarTema} = useContext(TemaContext);


  const carregarTema = () => {
    const html = document.querySelector('html');
    if(tema == "ativo"){
      html.classList.remove('temaEscuro');
      html.classList.add('temaClaro');
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(255, 255, 255)");
    }else{
      html.classList.remove('temaClaro');
      html.classList.add('temaEscuro');
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(20, 20, 20)");
    }
  }

  
  return{tema, trocarTema, carregarTema};
}

export default useTema;
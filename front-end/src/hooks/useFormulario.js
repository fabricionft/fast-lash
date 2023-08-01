import { useState } from "react";
import { useLocation } from "react-router-dom";
import useValidacoes from "./useValidacoes";

const useFormulario = () => {
  
  const location = useLocation();
  const [indice, setIndice] = useState(1);
  const {validatEtapa1FormularioAgendamento, validatEtapa2FormularioAgendamento, validarEtapa1FormularioProcedimento} = useValidacoes();

  
  const proximo = () => setIndice(indice + 1);
  const anterior = () => setIndice(indice - 1);

  let pagina = location.pathname.split("/")[1];

  const validar = (objeto) => {
    switch(indice){
      case 1:{
        switch(pagina){
          case "agendarProcedimento" : 
            if(validarEtapa1FormularioProcedimento(objeto)) proximo();
            break;
          
          case "editarProcedimento" : 
            if(validarEtapa1FormularioProcedimento(objeto)) proximo();
            break;
          
          case "agendar" : 
            if(validatEtapa1FormularioAgendamento(objeto)) proximo();
            break;

          default: 
          break;
        }
        break;
      }

      case 2:{
        switch(pagina){
          case "agendar" : 
            if(validatEtapa2FormularioAgendamento(objeto)) proximo();
            break;

          case "agendarProcedimento" : 
            proximo();
            break;

          default: 
            break;
        }
        break;
      }

      case 3:
        proximo();
        break;
      
      default: 
        break;
    }
  }


  return{indice, validar, proximo, anterior}
}

export default useFormulario;
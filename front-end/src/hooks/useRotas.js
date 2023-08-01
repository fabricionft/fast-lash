import { useLocation, useNavigate } from "react-router-dom"
import PublicRoutes from '../constants/PublicRoutes';
import useSession from "./useSession";
import { useEffect } from "react";

const useRotas = () => {

  const {sessao} = useSession();
  const location = useLocation();
  const navigate = useNavigate();


  const verificarSeARotaEPublica = () =>{
    return PublicRoutes.includes(location.pathname);
  }

  const bloquearRotaPrivada = () => {
    useEffect(() => {
      if(!sessao) navigate("/");
    }), [sessao]
  }

  const marcarRotaAtual = () => {
    if(["/agendamentos", "/agenda"].includes(location.pathname)) localStorage.setItem('rotaAnteriorDetalhesAgendamento', location.pathname);
    localStorage.setItem('rotaAnteriorFormularioProcedimento', location.pathname);
  }

  
  return{verificarSeARotaEPublica, bloquearRotaPrivada, marcarRotaAtual};
}

export default useRotas;
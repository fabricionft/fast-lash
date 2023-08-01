import { useContext } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { MessageBoxContext } from "../contexts/MessageBoxContext.";

const useMessageBox = () => {

  const {visible, exibir, esconder} = useContext(MessageBoxContext);
  const location = useLocation();
  const navigate = useNavigate();

  const exibirMensagem = (destino, mensagem, type, deslogar) => {
    navigate((destino) ? destino : location.pathname, {
      state: {
        msg : mensagem,
        type : type,
        txtBotao : (deslogar) ? "Entendido" : (type) ? "Prosseguir" : "Tentar novamente",
        deslogar: deslogar
      }
    })
    exibir();
  }

  const state = location.state;
  const dados = (state) && {
    type: state.type,
    msg: state.msg,
    txtBotao: state.txtBotao,
    deslogar: state.deslogar
  }


  return{visible, dados, exibirMensagem, esconder};
}

export default useMessageBox;
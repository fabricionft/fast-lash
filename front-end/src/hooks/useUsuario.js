import api from '../services/api';
import useMessageBox from './useMessageBox';
import useSession from './useSession';
import { useState } from 'react';
import useTratarErros from './useTratarErros';

const useUsuario = () => {

  const [usuario, setUsuario] = useState({});
  const [ver, setVer] = useState(false);
  const {logar} = useSession();
  const {exibirMensagem} = useMessageBox();
  const {tratarErroRequisicaoHTTP} = useTratarErros();

  
  const preencherUsuario = (e) => {
    setUsuario({...usuario, [e.target.name] : e.target.value})
  }

  const enviarFormulario = (e) => {
    e.preventDefault();
    fazerLogin(usuario);
  }

  const fazerLogin = (usuario) => {
    api.post("/admin/login", {...usuario})
    .then((resp) => {
      logar(resp.data);
      exibirMensagem(
        '/menuAdmin',
        "Logado com sucesso",
        true
      );
    })
    .catch((error) => {
      tratarErroRequisicaoHTTP(error);
    });
  }


  return {usuario, ver, setVer, preencherUsuario, enviarFormulario, fazerLogin};
}

export default useUsuario;


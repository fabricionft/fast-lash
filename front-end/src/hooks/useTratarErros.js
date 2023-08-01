import useMessageBox from "./useMessageBox";

const useTratarErros = () => {

  const {exibirMensagem} = useMessageBox();


  const tratarErroRequisicaoHTTP = (error) => {
    let statusHTTP = error.response.status; 

    exibirMensagem(
      '',
      (statusHTTP == 403) ? "Seu token de autenticação expirou ou não existe! Para sua segurança, você será deslogado."
                          : error.response.data.message,
      false,
      (statusHTTP == 403) && true
    )
  }

  
  return {tratarErroRequisicaoHTTP}
}

export default useTratarErros;
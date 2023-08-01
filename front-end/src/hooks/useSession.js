import { useContext } from "react"
import { SessionContext } from "../contexts/SessionContext";

const useSession = () => {

  const {sessao, logar, deslogar, role, token} = useContext(SessionContext);
  return {sessao, logar, deslogar, role, token};
}

export default useSession;
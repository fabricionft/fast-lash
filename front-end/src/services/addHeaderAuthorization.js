import useSession from "../hooks/useSession";
import api from "./api";

const addHeaderAuthorization = () => {

  const {token} = useSession();

  if(token){
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export default addHeaderAuthorization;
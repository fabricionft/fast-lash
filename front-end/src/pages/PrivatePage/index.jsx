import useRotas from "../../hooks/useRotas";
import useSession from "../../hooks/useSession";
import addHeaderAuthorization from "../../services/addHeaderAuthorization";

export default function PrivatePage({children}){

  const {sessao} = useSession();
  const {bloquearRotaPrivada} = useRotas();

  bloquearRotaPrivada();
  addHeaderAuthorization();

  return(
    <>
      {!sessao && null}
      {sessao && children}
    </>
  );
}
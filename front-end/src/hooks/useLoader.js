import { useContext } from "react";
import { LoaderContext } from '../contexts/LoaderContext';

const useLoader = () => {

  const {visible, exibir, esconder} = useContext(LoaderContext);
  return{visible, exibir, esconder};
}

export default useLoader;
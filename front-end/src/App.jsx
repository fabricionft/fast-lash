import {Outlet} from 'react-router-dom';
import useRotas from './hooks/useRotas';
import PrivatePage from './pages/PrivatePage';
import useTema from './hooks/useTema';

function App() {

  const {verificarSeARotaEPublica} = useRotas();
  const {carregarTema} = useTema();

  carregarTema();

  return(
    <>
      {
        verificarSeARotaEPublica() ? <Outlet/>
        : (
          <PrivatePage>
            <Outlet/>
          </PrivatePage>
        )
      }
    </>
  );
}

export default App;

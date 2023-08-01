import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {

  const [visible, setVisible] = useState(false);

  const exibir = () => setVisible(true);
  const esconder = () => setVisible(false);

  return(
    <LoaderContext.Provider value={{visible, exibir, esconder}}>
      {children}
    </LoaderContext.Provider>
  );
}
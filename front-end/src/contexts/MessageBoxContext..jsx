import { createContext, useState } from "react";

export const MessageBoxContext = createContext();

export const MessageBoxProvider = ({children}) => {

  const [visible, setVisible] = useState();

  const exibir = () => setVisible(true);
  const esconder = () => setVisible(false);

  return(
    <MessageBoxContext.Provider value={{visible, exibir, esconder}}>
      {children}
    </MessageBoxContext.Provider>
  )
}
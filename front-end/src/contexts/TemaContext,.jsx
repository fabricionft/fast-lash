import { createContext, useState, useEffect } from "react";

export const TemaContext = createContext();

export const TemaProvider = ({children}) => {

  const [tema, setTema] = useState(() => {
    const tema = localStorage.getItem('tema');
    return (tema) ? tema : "desativo";
  });

  useEffect(() =>{
    localStorage.setItem('tema', tema)
  }, [tema])

  const trocarTema = () => {
    setTema((tema == "desativo") ? "ativo" : "desativo");
  }

  return(
    <TemaContext.Provider value={{tema, trocarTema}}>
      {children}
    </TemaContext.Provider>
  );
}
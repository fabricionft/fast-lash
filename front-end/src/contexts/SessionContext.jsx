import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({children}) => {

  const [sessao, setSessao] = useState(() => {
    const sessao = localStorage.getItem('sessao');
    return (sessao) ? JSON.parse(sessao) : false;
  });

  useEffect(() =>{
    localStorage.setItem('sessao', JSON.stringify(sessao))
  }, [sessao])

  const role = sessao.role;
  const token = sessao.token;

  const logar = (user) => setSessao(user);
  const deslogar = () => setSessao(false);

  return(
    <SessionContext.Provider value={{sessao, logar, deslogar, role, token}}>
      {children}
    </SessionContext.Provider>
  );
}
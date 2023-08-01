import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Paginas
import Home from './pages/Home';
import PageError from './pages/PageError';
import AgendarAgendamento from './pages/AgendarAgendamento';
import Login from './pages/Login/index.jsx';
import MenuAdmin from './pages/MenuAdmin/index.jsx';
import Agendamentos from './pages/Agendamentos/index.jsx';
import DetalhesAgendamento from './pages/DetalhesAgendamento/index.jsx';
import Agenda from './pages/Agenda/index.jsx';
import AgendarProcedimento from './pages/AgendarProcedimento/index.jsx';
import Procedimento from './pages/Procedimento/index.jsx';
import EditarProcedimento from './pages/EditarProcedimento/index.jsx';
import EditarHorario from './pages/EditarHorario/index.jsx';

//Contextos
import { SessionProvider } from './contexts/SessionContext.jsx';
import { TemaProvider } from './contexts/TemaContext,.jsx';
import { MessageBoxProvider } from './contexts/MessageBoxContext..jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageError/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/agendar",
        element: <AgendarAgendamento/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/menuAdmin",
        element: <MenuAdmin/>
      },
      {
        path: "/agendamentos",
        element: <Agendamentos/>
      },
      {
        path: "/agenda",
        element: <Agenda/>
      },
      {
        path: "/detalhesAgendamento/:id",
        element: <DetalhesAgendamento/>
      },
      {
        path: "/agendarProcedimento/:id",
        element: <AgendarProcedimento/>
      },
      {
        path: "/editarProcedimento/:id",
        element: <EditarProcedimento/>
      },
      {
        path: "/procedimento/:id",
        element: <Procedimento/>
      },
      {
        path: "/editarHorario/:id",
        element: <EditarHorario/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessionProvider>
    <TemaProvider>
      <MessageBoxProvider>
        <RouterProvider router={router}/>
      </MessageBoxProvider>
    </TemaProvider>
  </SessionProvider>
)

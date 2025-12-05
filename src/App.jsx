import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";
import Clientes from "./componentes/telas/clientes/Clientes";
import Pedidos from "./componentes/telas/pedidos/Pedidos";
import Servicos from "./componentes/telas/servicos/Servicos";
import Usuarios from "./componentes/telas/usuarios/Usuarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      }
    ]
  },
  {
    path: "/admin",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "clientes",
        element: <Clientes />,
      },
      {
        path: "servicos",
        element: <Servicos/>,
      },
      {
        path: "pedidos",
        element: <Pedidos/>,
      },
      {
        path: "usuarios",
        element: <Usuarios/>,
      }
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
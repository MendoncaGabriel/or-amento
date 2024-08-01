import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import LayoutPrincipal from "./layouts/LayoutPrincipal"
import TabelaClientes from "./pages/MeusClientes"
import Comissao from "./pages/Comissao"
import MeusOrcamentos from "./pages/MeusOrcamentos"
const router = createBrowserRouter([
  {
    path: "/",
    element:  <LayoutPrincipal><Home /></LayoutPrincipal>
  },
  {
    path: "/login",
    element: <LayoutPrincipal menu={false} ><Login /></LayoutPrincipal>
  },
  {
    path: "/clientes",
    element: <LayoutPrincipal ><TabelaClientes /></LayoutPrincipal>
  },
  {
    path: "/orcamentos",
    element: <LayoutPrincipal ><MeusOrcamentos /></LayoutPrincipal>
  },
  {
    path: "/comissao",
    element: <LayoutPrincipal ><Comissao /></LayoutPrincipal>
  }
])

function App() {
  return ( <RouterProvider router={router} />)
}

export default App

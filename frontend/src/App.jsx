import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import LayoutPrincipal from "./layouts/LayoutPrincipal"
const router = createBrowserRouter([
  {
    path: "/",
    element:  <LayoutPrincipal><Home /></LayoutPrincipal>
  },
  {
    path: "/login",
    element: <LayoutPrincipal menu={false} ><Login /></LayoutPrincipal>
  }
])

function App() {
  return ( <RouterProvider router={router} />)
}

export default App

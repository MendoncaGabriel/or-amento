import { useNavigate } from "react-router-dom"
import Button from "./Button"
import Logo from "../../public/images/logo.png"
export default function Menu(){
    const navigate = useNavigate()

    return(
        <div className="text-white font-semibold text-lg h-full flex flex-col">
            <img src={Logo} alt="" className="w-40 m-auto" />
            <h1 className="text-center mb-2">SISTEMA DE ORÇAMENTO</h1>
            <hr />
            <div className="flex flex-col justify-between flex-grow  p-2 bg-">
                <div className="space-y-1 flex flex-col ">
                    <Button onClick={()=>navigate("/")} bg={"blue"}>Novo Orçamento</Button>
                    <Button onClick={()=>navigate("/clientes")} bg={"blue"}>Clientes</Button>
                    <Button  onClick={()=>navigate("/orcamentos")} bg={"blue"}>Orçamentos</Button>
                    <Button  onClick={()=>navigate("/comissao")} bg={"blue"}>Comissão</Button>
                </div>
                <Button bg={"red"} onClick={() => navigate("/login")}>Sair</Button>
           
            </div>
        </div>

    )
}
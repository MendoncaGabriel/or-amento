import { useNavigate } from "react-router-dom"
import Button from "./Button"

export default function Menu(){
    const navigate = useNavigate()

    return(
        <div className="text-white font-semibold text-lg h-full flex flex-col">
            <h1 className="text-center mb-2">SISTEMA DE ORÇAMENTO</h1>
            <hr />
            <div className="flex flex-col justify-between flex-grow  p-2">
                <div className="space-y-1 flex flex-col ">
                    <Button bg={"blue"}>Clientes</Button>
                    <Button bg={"blue"}>Orçamentos</Button>
                </div>
                <Button bg={"red"} onClick={() => navigate("/login")}>Sair</Button>
           
            </div>
        </div>

    )
}
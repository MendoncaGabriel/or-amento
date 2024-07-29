import Button from "../components/Button";
import Table from "../components/Table";
import { useContext } from "react";
import {UserContext} from "../providers/User"

export default function Home(){
    const {user} = useContext(UserContext) 
    return(
        <section className="  h-full flex flex-col justify-between">
            <div className=" flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold  drop-shadow-sm text-indigo-800">Busca Preço</h1>
                    <h2 className="text-2xl font-bold  drop-shadow-sm text-indigo-800">{user?.nome}</h2>
                </div>
                
                <Table />
            </div>

            <div className="flex space-x-4">
                <input 
                    type="text"
                    placeholder="Código de barras"
                    className="px-4 py-2 w-full outline-none drop-shadow-md"
                />
                <Button>Buscar</Button>
            </div>
        </section>
    )
}
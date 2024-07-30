import { useContext } from "react";
import Button from "./Button";
import {ComponentContext} from "../providers/Component"
import { MdCleaningServices } from "react-icons/md";
import { IoClose } from "react-icons/io5";


export default function Notes() {
    const {obs, toggleObs, changeValuesObs, cleanValuesObs} = useContext(ComponentContext)


    return (
        <div className={`${obs.open ? 'fixed' : 'hidden'} inset-0 z-40 flex items-center justify-center`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            {/* Componente Notes */}
            <section className="border aspect-video min-h-[50%] z-50 p-10 rounded-xl bg-gray-100 flex flex-col space-y-2">
           
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-semibold text-gray-500">Observações</h1>
                    <div className="flex items-center space-x-2">
                        <Button bg={"red"} onClick={cleanValuesObs}><MdCleaningServices className="text-white font-bold text-lg"/></Button>
                        <Button bg={"orange"} onClick={toggleObs}><IoClose  className="text-white font-bold text-lg"/></Button>
                    </div>
                </div>
               <textarea
                    className="drop-shadow-lg rounded-lg p-10 outline-none w-full flex-1 resize-none max-h-full"
                    placeholder="Digite aqui..."
                    onChange={changeValuesObs}
                    value={obs.value}
                ></textarea>
            </section>
        </div>
    );
}

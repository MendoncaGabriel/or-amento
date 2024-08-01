import { useContext, useEffect, useState } from "react";
import InputForm from "./InputForm";
import { ComponentContext } from '../providers/Component'
import Button from "./Button";
import { IoClose } from "react-icons/io5";

export default function FormClient() {
    const { formClient, setFormClient, toggleFormClient } = useContext(ComponentContext)
    const [cep, setCep] = useState("")

    const handleGetAddressByCep = (e) => {
        const { value } = e.target;
        setFormClient(prev => ({ ...prev, cep: value }));

        const cleanedCep = value.replace(/\D/g, '');

        if (cleanedCep.length === 8) {
            const formattedCep = `${cleanedCep.slice(0, 5)}-${cleanedCep.slice(5)}`;
            setCep(formattedCep);
        }
    };

    useEffect(() => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(res => {
            setFormClient(prev => ({
                ...prev,
                rua: res?.logradouro,
                complemento: res?.complemento,
                bairro: res?.bairro,
                cidade: res?.localidade,
            }))
        })
    }, [cep])

   

    return (

        <div className={`${formClient.open ? 'fixed' : 'hidden'} inset-0 z-40 flex items-center justify-center`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Componente Notes */}
            <section className="border aspect-video min-h-[60%]  z-50 p-10 rounded-xl bg-gray-100 flex flex-col space-y-2">

                <div className="flex items-center justify-between w-full">
                    <div className="col-span-2 w-full">
                        <h1 className="font-semibold text-gray-500">Cliente</h1>
                        <hr />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button bg={"red"} onClick={toggleFormClient}><IoClose className="text-white font-bold text-lg" /></Button>

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 items-center">
                    <InputForm label={"Nome"} onChange={(e) => setFormClient(prev => ({ ...prev, nome: e.target.value }))} />
                    <InputForm label={"Telefone"} mask="(99) 99999-9999" onChange={(e) => setFormClient(prev => ({ ...prev, telefone: e.target.value }))} />
                    <InputForm label={"CPF"} mask="999.999.999-99" onChange={(e) => setFormClient(prev => ({ ...prev, cpf: e.target.value }))} />
                    <InputForm label={"CNPJ"} mask="99.999.999/9999-99" onChange={(e) => setFormClient(prev => ({ ...prev, cnpj: e.target.value }))} />
                    <div className="col-span-2">
                        <h1 className="font-semibold text-gray-500">Endereço</h1>
                        <hr />
                    </div>
                    <InputForm label={"CEP"} mask="99999-999" onChange={handleGetAddressByCep} />
                    <InputForm label={"Rua"} value={formClient?.rua} onChange={(e) => setFormClient(prev => ({ ...prev, rua: e.target.value }))} />
                    <InputForm label={"Bairro"} value={formClient?.bairro} onChange={(e) => setFormClient(prev => ({ ...prev, Bairro: e.target.value }))} />
                    <InputForm label={"Numero da casa"} onChange={(e) => setFormClient(prev => ({ ...prev, numeroCasa: e.target.value }))} />
                    <InputForm label={"Cidade"} value={formClient?.cidade} onChange={(e) => setFormClient(prev => ({ ...prev, cidade: e.target.value }))} />
                    <InputForm label={"Complemento"} value={formClient?.complemento} onChange={(e) => setFormClient(prev => ({ ...prev, complemento: e.target.value }))} />
                </div>

            </section>
        </div>

    )
}
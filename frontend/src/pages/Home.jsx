import Button from "../components/Button";
import Table from "../components/Table";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../providers/User";
import { ProdutoListContext } from "../providers/ProdutoList";


export default function Home() {
    const { user } = useContext(UserContext);
    const { addProduto } = useContext(ProdutoListContext);


    const [load, setLoad] = useState(false);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleGetProduto = async () => {
        setLoad(true);
    
        try {
            const response = await fetch(`http://localhost:3000/api/produto/${input}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            const data = await response.json();
    
            console.log("Produto recebido:", data.produto); // Adicione isto para depuração
    
            addProduto(data.produto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        } finally {
            setLoad(false);
            setInput("");
        }
    };
    

    useEffect(() => {
        if (inputRef.current) {
            if (load) {
                inputRef.current.disabled = true;
            } else {
                inputRef.current.disabled = false;
                inputRef.current.focus();
            }
        }
    }, [load]);

    const handleChangeInput = (event) => {
        setInput(event.target.value);
    };

    const handleSubmitInput = (event) => {
        if (event.key === 'Enter') {
            handleGetProduto();
        }
    };



    return (
        <section className="h-full flex flex-col justify-between">
  
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold drop-shadow-sm text-indigo-800">Busca Preço</h1>
                    <h2 className="text-2xl font-bold drop-shadow-sm text-indigo-800">{user?.nome}</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Button bg="blue">Observações</Button>
                        <Button bg="blue">Cliente</Button>
                        <Button bg="green">Gerar Nota</Button>
                    </div>
                    <Button bg="orange">Cancelar</Button>
                </div>

                <Table />
            </div>

            <div className="flex space-x-4">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Código de barras"
                    className="px-4 py-2 w-full outline-none drop-shadow-md"
                    onChange={handleChangeInput}
                    onKeyUp={handleSubmitInput}
                    value={input}
                    disabled={load}
                />
                
                <Button onClick={handleGetProduto}>
                    {load ? (
                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        "Buscar"
                    )}
                </Button>
            </div>
        </section>
    );
}

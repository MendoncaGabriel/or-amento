import Button from "../components/Button";
import Table from "../components/Table";
import { useContext, useState, useEffect, useRef} from "react";
import { UserContext } from "../providers/User";
import { ProdutoListContext } from "../providers/ProdutoList";
import Notes from "../components/Notes";
import {ComponentContext} from "../providers/Component"
import FormClient from "../components/FormClient";
import { useNavigate } from "react-router-dom"


export default function Home() {
    const {obs, toggleObs, toggleFormClient, formClient} = useContext(ComponentContext)
    const { user } = useContext(UserContext);
    const { addProduto, produtos , subtotal, setMetodoPagamento, metodoPagamento, clean} = useContext(ProdutoListContext);
    const navigate = useNavigate()

    const [load, setLoad] = useState(false);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleGetProduto = async () => {
        setLoad(true);
    
        try {
            const response = await fetch(`/api/produto/${input}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            const data = await response.json();
    
            if(data.produto){
                addProduto(data.produto);

            }else{
                
                alert("Produto não encontrado!")
            }

        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            alert("Produto não encontrado!")
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

    const SubmitOrcamento = async () => {
        // Dados a serem enviados
        const data = {
            user: {
                ...user,
                open: undefined,
                password: undefined
            },
            obs: {
                ...obs,
                open: undefined
            },
            produtos: produtos.map(e => ({
                ...e,
                price: e?.price[metodoPagamento.toLowerCase()],
                total: e.quantidade * (e?.price[metodoPagamento.toLowerCase()] || 0)
            })),
            cliente: {
                ...formClient,
                open: undefined
            },
            subtotal: subtotal,
            metodoPagamento: metodoPagamento
        };
    
        try {
            // Enviar dados para o backend
            const response = await fetch(`/api/orcamento`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
    
            // Verificar se a solicitação foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
    
            // Processar a resposta
            const result = await response.json();
            console.log(result);
    
            // Exibir mensagem de sucesso ou fazer algo com o resultado
            alert(result.msg || 'Orçamento criado com sucesso!');

            clean()
            navigate("/orcamentos")

        } catch (error) {
            console.error('Erro ao criar orçamento:', error);
            alert('Ocorreu um erro ao criar o orçamento. Por favor, tente novamente.');
        }
    };
    

    return (
        <section className="h-full flex flex-col justify-between relative">
            <Notes  />
            <FormClient />
  
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold drop-shadow-sm text-indigo-800">Busca Preço</h1>
                    <h2 className="text-2xl font-bold drop-shadow-sm text-indigo-800">{user?.nome}</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Button onClick={toggleObs} bg="blue">Observações</Button>
                        <Button onClick={toggleFormClient} bg="blue">Cliente</Button>
                        <Button onClick={SubmitOrcamento}  bg="green">Gerar Nota</Button>
                        <select
                            value={metodoPagamento}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                            className="rounded-md px-2 drop-shadow-md"
                        >
                            <option value="">Selecione um método</option>
                            <option value="varejo">Varejo</option>
                            <option value="atacado">Atacado</option>
                            <option value="boleto">Boleto</option>
                        </select>
                    </div>
                    <Button bg="orange">Cancelar</Button>
                </div>

                <Table  />
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

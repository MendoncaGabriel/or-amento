import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/User";
import Logo from "../../public/images/logo.png"


export default function Login(){
    const navigate = useNavigate()
    const {setUser, user} = useContext(UserContext)
    const [access, setAccess] = useState({id: "", password: "", nome:""})
    const [vendedores, setVendedores] = useState([])

    const handleChangeUser = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = event.target.value;
        const nome = selectedOption.text;
        setAccess(prev => ({...prev, id: id, nome: nome}))
    }
    const handleChangePassword = (event) => {
        setAccess(prev => ({...prev, password: event.target.value}))
    }

    const handleLoginButton = () => {
        fetch('/api/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(access)
        })
        .then(res => {
            if (!res.ok) { 
                return res.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return res.json();
        })
        .then(res => {
            localStorage.setItem("token", res.token);
            console.log(access)
            setUser(access)
            navigate("/");

        })
        .catch(error => {
            alert(error.message); 
        });
    };
        
    
    useEffect(() => {
        fetch('/api/vendedor', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setVendedores(data); // Atualize o estado com a lista de vendedores
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, []);
    

    return (
        <section className="  h-full flex flex-col justify-center items-center">
           
            <div className="p-10 max-w-50 space-y-2 flex flex-col">
                <h1 className="text-gray-500 text-center">Bem Vindo (a)</h1>
                <img src={Logo} alt=""  className="h-28"/>

                <select onChange={handleChangeUser} className="px-4 py-3 rounded-md w-full drop-shadow-md">
                    <option value="" selected  disabled>Selecione um vendedor</option>
                    {vendedores.map((item, index)=> <option key={index + item?.id} value={item?.id}>{item?.nome}</option>)}
                   
                </select>
               
                <input onChange={handleChangePassword} type="password" className="px-4 py-3 drop-shadow-md rounded-md focus:outline-none w-full" />

                <Button onClick={handleLoginButton} py={3}>Entrar</Button>
               
            </div>
        </section>
    )
}
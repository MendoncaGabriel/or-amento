import { createContext, useEffect, useState } from "react";

// Cria o contexto com valores padrão
export const UserContext = createContext({
    user: {}, // Usando objeto vazio por padrão
    setUser: () => {}
});

// Provider do contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({}); 

    useEffect(()=>{
        if(user.nome,length != 0 && user.id.length != 0){
            localStorage.setItem("user", JSON.stringify(user))
        }
    }, [user])

    useEffect(()=>{
        const user = localStorage.getItem("user")
        console.log(user)
        if(user){
            setUser(JSON.parse(user))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

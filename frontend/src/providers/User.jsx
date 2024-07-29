import { createContext, useState } from "react";

// Cria o contexto com valores padrão
export const UserContext = createContext({
    user: {}, // Usando objeto vazio por padrão
    setUser: () => {}
});

// Provider do contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({}); // Inicialmente um objeto vazio

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

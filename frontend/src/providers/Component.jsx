import { createContext, useState } from "react";

export const ComponentContext = createContext({
    obs: {}, 
    formClient: {},   
    toggleObs: () => {},
    changeValuesObs: () => {},
    cleanValuesObs: () => {},
    toggleFormClient: () => {},
    setFormClient: () => {}
})

export const ComponentProvider = ({children}) => {
    const [obs, setObs] = useState({open: false})
    const [formClient, setFormClient] = useState({open: false, cidade: "Manaus"})

    const toggleObs = () => {
        setObs(prev => ({...prev, open: !prev.open}))
    }
    const toggleFormClient = () => {
        setFormClient(prev => ({...prev, open: !prev.open}))
    }

    const changeValuesObs = (event) => {
        setObs(prev => ({...prev, value: event.target.value}))
    }

    const cleanValuesObs = () => {
        setObs(prev => ({...prev, value: ""}))
    }

    return (
        <ComponentContext.Provider value={{obs, formClient, toggleObs, changeValuesObs, cleanValuesObs, setFormClient, toggleFormClient}}>
            {children}
        </ComponentContext.Provider>
    )
}
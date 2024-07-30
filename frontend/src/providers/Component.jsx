import { createContext, useState } from "react";

export const ComponentContext = createContext({
    obs: {
        open: false
    }, 
    toggleObs: () => {},
    changeValuesObs: () => {},
    cleanValuesObs: () => {},
})

export const ComponentProvider = ({children}) => {
    const [obs, setObs] = useState({})

    const toggleObs = () => {
        setObs(prev => ({...prev, open: !prev.open}))
    }

    const changeValuesObs = (event) => {
        setObs(prev => ({...prev, value: event.target.value}))
    }

    const cleanValuesObs = () => {
        setObs(prev => ({...prev, value: ""}))
    }


    return (
        <ComponentContext.Provider value={{obs, toggleObs, changeValuesObs, cleanValuesObs}}>
            {children}
        </ComponentContext.Provider>
    )
}
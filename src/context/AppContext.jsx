import { createContext, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppContainer({children}) { 
    return <AppContext.Provider>
        {children}
    </AppContext.Provider>
}
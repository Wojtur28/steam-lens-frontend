import {createContext, useContext, useState} from "react";
import ErrorModal from "@/components/ErrorModal.jsx";

const ErrorContext = createContext(null);

export function ErrorProvider({children}) {
    const [error, setError] = useState(null);

    const showError = (errorMessage) => {
        setError(errorMessage);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{showError, clearError}}>
            {children}
            <ErrorModal error={error} onClose={clearError}/>
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within ErrorProvider");
    }
    return context;
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserData } from "../utils/API_Calls";


export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const findUser = async () => {
            const response = await getUserData();
            if(response.error) setUser(null);
            else setUser(response);
        }
        findUser();
    }, []);

    const _signInUser = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
    }

    const _signOutUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const memoedValue = useMemo(() => ({
        user,
        _signInUser,
        _signOutUser
    }), [user]);

    return <AuthContext.Provider value={memoedValue}>{ children }</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
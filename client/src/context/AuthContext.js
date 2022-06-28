import { createContext, useContext, useState } from "react";
import { getUserData } from "../utils/API_Calls";

const findUser = async () => {
    const response = await getUserData();
    if(response.error) return null;
    else return response;
}

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => findUser());

    const _signInUser = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
    }

    const _signOutUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const value = { user, _signInUser, _signOutUser };

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
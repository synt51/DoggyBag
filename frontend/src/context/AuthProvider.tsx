import {createContext, ReactElement, useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';

export interface AuthContextType {
    token?: string,
    jwtDecoded?: {sub?: string}
    setJwt: (jwt: string) => void
}

export const AuthContext = createContext<AuthContextType>({
    setJwt: () => {throw Error("default function has not been initialized")}
})

export default function AuthProvider({children} : {children: ReactElement<any, any>}) {
    const STORAGE_KEY = "Token"
    const [token, setToken] = useState<string | undefined>(localStorage.getItem(STORAGE_KEY) || undefined)
    const [jwtDecoded, setJwtDecoded] = useState()

   useEffect(() => {
        if (token !== undefined) {
            localStorage.setItem(STORAGE_KEY, token)}
    }, [token]);

    const setJwt = (jwt: string) => {
        if (jwt === "") {
            setToken(undefined);
            setJwtDecoded(undefined);
            localStorage.removeItem(STORAGE_KEY)
        } else {
            setToken(jwt)
            setJwtDecoded(jwt_decode(jwt));
        }
    }

    return (
        <AuthContext.Provider value={{token, jwtDecoded, setJwt}}>
            {children}
        </AuthContext.Provider>
    )
}
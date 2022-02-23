import React, {ReactElement, useContext} from "react";
import {AuthContext} from "./AuthProvider";
import LoginPage from "../pages/LoginPage";

export default function RequireAuth({children}: {children: ReactElement<any, any>}) {

    const {jwtDecoded} = useContext(AuthContext)

    function isExpirationValid(): boolean {
        if (!jwtDecoded?.exp) return false

        const Now = new Date();
        const ExpirationTimeToken = new Date(jwtDecoded?.exp * 1000);
        const TimeLeft: number = ExpirationTimeToken.getTime() - Now.getTime()
        return (TimeLeft > 0)
    }


    if (isExpirationValid()) {
        return children;
    } else {
        return <LoginPage/>
    }
}
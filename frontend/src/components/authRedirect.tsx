import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { getAccessToken, logout } from "../api/authApi";

interface AuthRedirectPros{
    children: JSX.Element
}

const isAuthenticaticated = (): boolean => {
    const token = getAccessToken();
    return !!token;
}
type ExpProps={
    exp: number
}
const isTokenExpired = (token: any) => {
    try {
        const { exp } = jwtDecode<ExpProps>(token); // Decode the token to get the `exp` claim
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        return exp < currentTime; // Compare expiration time with the current time
    } catch (error) {
        console.error("Invalid token:", error);
        return true; 
    }
};

const AuthRedirect: React.FC<AuthRedirectPros> = ({children})=>{
    if(!isAuthenticaticated()){
        return <Navigate to="/login" replace />
    }
    if (getAccessToken() && isTokenExpired(getAccessToken())) {
        console.log("Access token is expired");
        // Optionally, trigger a token refresh or logout
        logout()
        return <Navigate to="/login" replace />
    }
    return children
}

export const AuthRedirectRoot: React.FC<AuthRedirectPros> = ({children})=>{
    if(isAuthenticaticated()){
        return <Navigate to="/home" replace/>
    }
    return children
}

export default AuthRedirect


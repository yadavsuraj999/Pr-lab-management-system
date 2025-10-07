import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedRout = ({ children }) => {
    const neviget = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user === null) {
                neviget("/login")
            }else{
                neviget("/")
                return
            }
        })
        return () => unsubscribe()
    }, [neviget])
    return children 
}

export default ProtectedRout
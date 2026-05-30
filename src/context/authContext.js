'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

let Auth = createContext()

export let AuthProvider = ({ children }) => {
     let router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    let hydrateUser = async () => {
        try {
            let res = await api.get("/api/auth/me")
            console.log(res)
            setUser(res.data.user)
             router.push("/layout/home")
        } catch (err) {
            setUser(null)
           
            console.log("error in hydrating user", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        hydrateUser()

    }, [])

    return <Auth.Provider value={{user, setUser, loading}}>{children}</Auth.Provider>

}


export let useAuth = () => useContext(Auth)
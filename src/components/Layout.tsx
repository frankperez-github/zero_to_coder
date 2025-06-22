'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import SignInModal from "./SignInModal";
import API from "@/api";
import { toast } from "react-toastify";

export const Layout = ({ children }:{children: React.ReactNode}) => {

    const [token, setToken] = useState("")

    const [showLogInModal, setShowLoginModal] = useState<"login"|"register"|"">("")
    useEffect(()=>{
        API.get("/users/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).catch((err)=>{
            if(err.status == 403)
            {
                setToken("")
                toast.info("Debe iniciar sesión")
                if(location.pathname !== "/")
                    location.href = "/"
            }
        })
        setToken(localStorage.getItem("token")+"")
    },[])   

    return (
        <div className="min-h-screen w-full">
            {
                showLogInModal === "login" && <SignInModal showModal={showLogInModal} setShowModal={setShowLoginModal} />
            }
            
            <div className="">
                <nav className="bg-blue-500 p-4 py-10 text-white">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link href="/" className="text-3xl font-bold">Zero to Coder</Link>
                        <div className="text-lg flex flex-row gap-5">
                            {
                                token === null || token === ""
                                ?
                                    <Link href="" onClick={()=>setShowLoginModal("login")}  className="mr-4">Iniciar sesión</Link>
                                :
                                    <Link href="/profile" className="mr-4">Perfil</Link>
                            }
                            <Link href="/train" className="mr-4">Entrenamiento</Link>
                            <Link href="/learn" className="mr-4">Seguir mi camino</Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="px-20 py-20 bg-neutral-50 h-[85vh] dark:bg-neutral-100 text-neutral-800 dark:text-neutral-200">
                {children}
            </div>
            <div className="">

            </div>
        </div>
    );
}
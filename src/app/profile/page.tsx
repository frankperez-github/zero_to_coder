'use client'
import API from "@/api";
import User from "@/types/User";
import { useEffect, useState } from "react";

export default function Profile()
{
    const [passedTopics, setPassedTopics] = useState<string[]>([]);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/";
            return
        }
        API.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
            }
            else
            {
                localStorage.setItem("token", "")
            }
        })
        API.get("/users/me/passed-topics", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setPassedTopics(res.data.topics);
            }
        }).catch((err) => {
            console.error("Error fetching passed topics:", err);
        });
    },[])

    const [user, setUser] = useState<User>();

    return (
        <div className="w-full">
            {user ? (
                <div className="flex flex-col text-gray-600">
                        <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col gap-2 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">Tu información</h2>
                            <p><strong>Nombre:</strong> {user.name}</p>
                            <p><strong>Correo electrónico:</strong> {user.email}</p>
                        </div>
                        <div className="passedTopics">
                            <h2 className="text-xl font-bold">Temas superados:</h2>
                            <div 
                                className="w-full flex gap-5 my-5"
                            >
                                {
                                    passedTopics.map((x, key)=>(
                                        <p className="bg-blue-400 text-xl rounded-3xl text-center w-auto p-2 px-5 text-white font-bold" key={key}>{x}</p>
                                    ))
                                }
                            </div>
                        </div>
                </div>
            ) : 
                <p>Cargando...</p>
            }   
        </div>
    )
}
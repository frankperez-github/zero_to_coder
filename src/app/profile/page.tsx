'use client'
import API from "@/api";
import User from "@/types/User";
import { useEffect, useState } from "react";

export default function Profile()
{
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
        })
    },[])

    const [user, setUser] = useState<User>();

    return (
        <div className="min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>
            <p className="text-xl mb-16 text-center">
                In this section, you can view your profile information.
            </p>
            <div className="flex flex-col items-center">
                {user ? (
                    <div className="bg-white shadow-md rounded-lg p-6 w-full text-gray-600 max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : 
                    <p>Loading...</p>
                }
            </div>
            <div className="flex justify-evenly mt-10">
                <button
                    onClick={() => window.location.href = '/init-test'}
                    className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
                >
                    Start the Test
                </button>
                <button
                    onClick={() => window.location.href = '/train'}
                    className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
                >
                    Follow my own path
                </button>
                <button
                    onClick={() => window.location.href = '/learn'}
                    className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
                >
                    Continue learning
                </button>
            </div>
        </div>
    )
}
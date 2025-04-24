"use client";

import { AuthCard } from "@/components/ui/auth";
import { ChangeEvent, useState } from "react";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        console.log(user)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800">
            <AuthCard
                type="Login"
                inputOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { id, value } = e.target
                    setUser({
                        ...user,
                        [id]: value
                    })
                }}

                onClick={onLogin}
            />
        </div>
    )
}
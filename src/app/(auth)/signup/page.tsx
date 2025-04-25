"use client";

import { AuthCard } from "@/components/ui/auth";
import { ChangeEvent, useState } from "react";

export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {
        console.log(user)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800">
            <AuthCard
                type="Signup"
                inputOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { id, value } = e.target
                    setUser({
                        ...user,
                        [id]: value
                    })
                }}
                onClick={onSignup}
                formData={user}
            />
        </div>
    )
}
"use client";

import { AuthCard } from "@/components/ui/auth";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onLogin = async () => {
        console.log("Login clicked", user);
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user)
            console.log("Login success", response.data);
            toast.success("Login successful")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
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
                formData={user}
                loading={loading}
            />
        </div>
    )
}
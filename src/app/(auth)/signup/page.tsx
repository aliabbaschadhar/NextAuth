"use client";

import { AuthCard } from "@/components/ui/auth";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`api/signup`, user)
            console.log("Signup success", response.data);
            router.push("/login")

        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
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
                loading={loading}
            />
        </div>
    )
}
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Profile() {
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get("/api/logout");
            if (response.status === 200) {
                toast.success(response.data.message);
                router.push("/login");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Logout failed");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#131c4a] to-[#000814]">
            <div className="absolute top-4 left-4">
                <Button
                    variant="outline"
                    onClick={logout}
                >Logout</Button>
            </div>
            <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
                {/* Subtle animated spotlight in the background */}
                <div className="absolute inset-0 pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative group">
                {/* Hover halo effect behind the card */}
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#2a5ad3] to-[#6ec1e4]
                    opacity-0 group-hover:opacity-60 transition-all duration-500 filter blur-xl" />

                <div className="relative p-10 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl shadow-lg
                    transition-transform duration-500 group-hover:scale-105 group-hover:bg-opacity-60">
                    <h1 className="text-white text-6xl font-serif tracking-wide drop-shadow-lg">
                        Welcome Shaka G
                    </h1>
                </div>
            </div>
        </div>
    );
}
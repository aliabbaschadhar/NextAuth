"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    username: string;
    password?: string; // This should not be displayed
    email: string;
    emailVerified: boolean;
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Move data fetching to useEffect
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/me");
                setUser(response.data.user);
            } catch (error) {
                toast.error("Failed to fetch user data");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#131c4a] to-[#000814]">
            <div className="absolute top-4 left-4">
                <Button
                    variant="outline"
                    onClick={logout}
                >Logout</Button>
            </div>
            {user && (
                <div className="relative group">
                    {/* Hover halo effect behind the card */}
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#2a5ad3] to-[#6ec1e4]
                opacity-0 group-hover:opacity-60 transition-all duration-500 filter blur-xl" />

                    <div className="relative p-10 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl shadow-lg
                transition-transform duration-500 group-hover:scale-105 group-hover:bg-opacity-60">
                        <h1 className="text-white text-3xl font-serif tracking-wide drop-shadow-lg">
                            Welcome {user.username}
                        </h1>
                        <p className="text-gray-300 mt-2">
                            Email: {user.email}
                        </p>
                        <p className="text-gray-300 mt-2">
                            Verified: {user.emailVerified ? 'Yes' : 'No'}
                        </p>
                        <p className="text-gray-300 mt-2">
                            ID: {user._id}
                        </p>
                        {/* Display other user properties here, excluding password */}
                    </div>
                </div>
            )}
        </div>
    );
}
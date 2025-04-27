"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmail() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/verifyemail", { token });
            setVerified(true);
            setIsLoading(false);
        } catch (error: any) {
            console.error("Error verifying email:", error);
            setError(error.response?.data?.message || "An error occurred while verifying your email.");
            console.log(error.response?.data);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token?.length > 0) {
            verifyEmail();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:p-8 text-white">
            <div className="p-[2px] rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 max-w-md w-full">
                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <div className="text-center space-y-6 mb-8">
                        {/* Email Icon */}
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Verify Your Email
                    </h1>
                </div>

                {token ? (
                    <div className="mb-6 p-3 bg-gray-700/50 border border-gray-700 rounded-lg text-center">
                        <p className="text-gray-400 text-sm mb-2">Verification token</p>
                        <code className="bg-gray-900 px-3 py-1 rounded text-xs text-indigo-300 break-all">
                            {token}
                        </code>
                    </div>
                ) : (
                    <div className="mb-6 p-3 bg-gray-700/50 border border-gray-700 rounded-lg text-center">
                        <p className="text-red-400">No token found in URL</p>
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center my-8">
                        <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-400/20 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-xs text-indigo-300">Verifying</span>
                            </div>
                        </div>
                    </div>
                )}

                {verified && !isLoading && (
                    <div className="mb-8 p-4 bg-emerald-900/20 border border-emerald-700/30 rounded-lg flex items-center">
                        <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-emerald-300">
                            Email verified successfully!
                        </span>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="mb-8 p-4 bg-red-900/20 border border-red-700/30 rounded-lg flex items-center">
                        <div className="bg-red-500/20 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <span className="text-red-300">{error}</span>
                    </div>
                )}

                {verified && !isLoading && (
                    <div className="pt-4 text-center">
                        <Link href="/login">
                            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:outline-none">
                                Proceed to Login
                            </button>
                        </Link>
                    </div>
                )}

                {!verified && !isLoading && token && (
                    <div className="text-center text-sm text-gray-400 mt-6">
                        If verification is taking too long, you can try
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                verifyEmail();
                            }}
                            className="ml-1 text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                        >
                            verifying again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

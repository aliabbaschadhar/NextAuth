"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPassword() {
    const [emailVal, setEmailVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    async function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!emailVal) return;

        try {
            setIsLoading(true);
            setError(undefined);
            await axios.post("/api/forgetpassword", { email: emailVal });
            setSuccess(true);
            setTimeout(() => router.push("/editpassword"), 2000);
        } catch (error: any) {
            console.error("Error verifying email", error);
            setError(error?.response?.data.message || "An error occurred while verifying user");
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                    <p className="text-gray-600 mb-6">Enter your email to receive a password reset link</p>
                </div>

                {error && (
                    <div className="p-4 flex items-center text-sm text-red-800 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 flex items-center text-sm text-green-800 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Reset link sent! Redirecting you...
                    </div>
                )}

                <form className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={emailVal}
                            onChange={(e) => setEmailVal(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleOnClick}
                        className="w-full py-3 text-white text-sm font-medium transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isLoading || !emailVal || success}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : "Reset Password"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Remember your password? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
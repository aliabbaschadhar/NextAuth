import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";

export function AuthCard({
    type = 'Login',
    inputOnChange,
    onClick,
    formData,
    loading
}: {
    type?: 'Login' | "Signup";
    inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    formData?: {
        email: string,
        password: string,
        username?: string
    };
    loading?: boolean;
}) {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (!formData) return;

        const { email, password, username } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = password.length >= 6;

        if (type === "Signup") {
            const isUsernameValid = (username as string).length >= 3;
            setButtonDisabled(!(isEmailValid && isPasswordValid && isUsernameValid));
        } else {
            setButtonDisabled(!(isEmailValid && isPasswordValid));
        }
    }, [formData, type]);

    return (
        <Card
            className="w-full max-w-md mx-auto p-6 shadow-xl text-white bg-zinc-900 border-zinc-700 rounded-lg"
        >
            <CardHeader className="text-center">
                {loading ? <h1>Processing....</h1> : (
                    <div>
                        <CardTitle className="text-2xl font-bold">
                            {type === "Login" ? "Welcome Back" : "Create an Account"}
                        </CardTitle>
                        <CardDescription className="text-zinc-400 pt-2">
                            {type === "Login" ? "Sign in to continue." : "Enter your details to sign up."}
                        </CardDescription>
                    </div>
                )}
            </CardHeader>

            <CardContent className="space-y-6">
                {type === "Signup" && (
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input onChange={inputOnChange} id="username" placeholder="Your name" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={inputOnChange} id="email" type="email" placeholder="your@example.com" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        onChange={inputOnChange}
                        id="password"
                        type="password"
                        placeholder="********"
                        className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <Button
                    onClick={onClick}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
                >
                    {buttonDisabled ? "Please fill all fields" : type === "Login" ? "Login" : "Sign Up"}
                </Button>

                <div className="mt-4 text-center text-sm">
                    {type === "Login" ? (
                        <span className="text-zinc-400">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="font-medium text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </span>
                    ) : (
                        <span className="text-zinc-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-blue-500 hover:underline">
                                Login
                            </Link>
                        </span>
                    )}
                </div>
            </CardContent>
        </Card >
    );
}
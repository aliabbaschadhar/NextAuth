import React from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";

export function AuthCard({ type = 'Login', inputOnChange, onClick }: {
    type?: 'Login' | "Signup";
    inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void
}) {
    return (
        <Card
            className="w-full max-w-md mx-auto p-6 shadow-xl text-white bg-zinc-900 border-zinc-700 rounded-lg"
        >
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    {type === "Login" ? "Welcome Back" : "Create an Account"}
                </CardTitle>
                <CardDescription className="text-zinc-400 pt-2">
                    {type === "Login" ? "Sign in to continue." : "Enter your details to sign up."}
                </CardDescription>
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
                    <Input onChange={inputOnChange} id="password" type="password" placeholder="********" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <Button
                    onClick={onClick}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer">
                    {type}
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
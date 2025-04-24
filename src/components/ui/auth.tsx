import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export function AuthCard({ type = 'Login' }: {
    type?: 'Login' | "Signup"
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
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@example.com" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="********" className="bg-zinc-800 border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 curor-pointer">
                    {type}
                </Button>
            </CardContent>
        </Card >
    );
}
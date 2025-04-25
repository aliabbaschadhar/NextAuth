"use client";
import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                className: "bg-zinc-800 text-white",
                duration: 3000,
                style: {
                    background: "#1e293b",
                    color: "#fff",
                    fontSize: "16px",
                    padding: "16px",
                    borderRadius: "8px",
                },
            }}
        />
    );
}
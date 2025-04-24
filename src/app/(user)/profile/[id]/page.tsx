export default async function UserProfile({ params }: { params: { id: string } }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800">
            <h1 className="text-white text-6xl font-sans">User Profile</h1>
            <p className="text-black text-9xl font-mono bg-amber-400 p-5 m-4 rounded-e-full tracking-tighter ">{(await params).id}</p>
        </div>
    )

}
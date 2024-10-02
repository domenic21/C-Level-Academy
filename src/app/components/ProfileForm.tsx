'use client';
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function ProfileForm({ existingUsername = '' }: 
    { existingUsername?: string }) {
    const [userName, setUsername] = useState(existingUsername);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();
        setIsSaved(false);
        setIsError(false);
        
        const response = await axios.put('/api/profile', { userName });
        if (response.data) {
            setIsSaved(true);
            if (!existingUsername && userName) {
                router.push('/dashboard/class-type');
                router.refresh();
            }
        } else {
            setIsError(true);
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xs mx-auto mt-8">
            {isSaved && (
                <p>Settings saved!</p>
            )}
            {isError && (
                <p>There was an error</p>
            )}
            <label>
                <span className="block text-sm font-medium text-gray-700">
                    Username</span>
                <input
                    type="text" value={userName}
                    onChange={ev => setUsername(ev.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"

                />
                <div className="text-center mt-4">
                    <button type="submit"
                        className="inline-block shrink-0 rounded-md border
                         border-blue-600 bg-blue-600 px-12 py-3 text-sm
                          font-medium text-white transition hover:bg-transparent
                           hover:text-blue-600 focus:outline-none focus:ring
                            active:text-blue-500">
                        Save
                    </button>
                </div>
            </label>
        </form>
    );
}




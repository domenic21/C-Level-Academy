"use client";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteBtn({id}:{id:string}) {
    const [showConfirmation, setConfirmation] = useState(false);
    const router = useRouter();
    async function handleDelete(){
            await axios.delete('/api/event-types?id='+id);
            router.push('/dashboard/class-type'); 
            router.refresh();
            
        
    }

    return (
        <div>
            {!showConfirmation &&( 
            <button
                className="bg-red-700  inline-flex text-white p-2 rounded-lg  w-28 "
                onClick={() => setConfirmation(true)}
                type="button"
            >
                <Trash className="h-5 " /> Delete
            </button>
            )}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {/*to make a pop-out inset-0*/ }
                    <div className="rounded-lg bg-white p-8 shadow-2xl">
                        <h1 className="mt-2 text-sm font-semibold text-gray-500">
                            Are you sure you want to <span className="text-red-600">Delete</span> classroom?
                        </h1>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={()=> handleDelete()}
                                type="button"
                                className="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                            >
                                Yes, I'm sure
                            </button>

                            <button
                                type="button"
                                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                                onClick={() => setConfirmation(false)}
                            >
                                No, go back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
    const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  
  useEffect(() => {
    if (!query) {
        // If no query, redirect to the default reports page
        router.push("/dashboard/reports");
      } else {
        // Update the query string in the URL with the debounced query
        router.push(`/dashboard/reports?query=${encodeURIComponent(searchTerm)}`);
      }
    }, [query]);  // Triggered when debounced query updates

  return (
    <div className="flex border border-gray-300 rounded-lg overflow-hidden w-[40%]">
     
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none rounded-full"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          
        </div>
  );
}

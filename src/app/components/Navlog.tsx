"use client"; //  the code will be executed in the client

export default function NavLog({ email }: { email: string }) {
    const loggedOut =
        typeof window !== "undefined" &&
        window.location.href.includes("logged-out");
    // Check if the user is logged out

    if (email && !loggedOut) {
        // If the user is logged in
        return (
            <div className="flex items-center gap-3 ">
                <a
                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm 
                    font-medium
                    sm:w-28
                    md:w-28
                    
                    text-white shadow  "
                    href={'/dashboard'} // Redirect to the dashboard
                >
                    Dashboard 
                </a>

                <div className="sm:flex">
                    <a
                        className="rounded-md bg-gray-100 px-5 
                        py-2.5 text-sm 
                        md:w-24
                        sm:w-28
                        font-medium text-blue-800"
                        href={'/api/logout'} // Logout the user
                    >
                        Logout
                    </a>
                </div>
            </div>
        );
    } else {
        return (
           <div >
                <a
                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href={'/api/auth'} // Redirect to the login page
                >
                    Login Instructors
                </a>
            </div>
        );


    }
}

'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({userName}: {userName?: string}) {
    const pathname = usePathname();

    // Check exact match for dashboard path
    const isDashboard = pathname === '/dashboard';
    const isClassType = pathname === '/dashboard/class-type';
    const isReports = pathname === '/dashboard/reports';

    return (
        <div className="flex justify-center gap-4 ">
            <Link
                href={'/dashboard'}
                className={clsx("rounded-full p-2", isDashboard ? 'bg-blue-600 text-white' : 'bg-gray-200')}
            >
                Profile
            </Link>
            {userName && (
            <Link
            href={'/dashboard/class-type'}
            className={clsx("rounded-full p-2", isClassType ? 'bg-blue-600 text-white' : 'bg-gray-200')}
        >
            Classroom Generator
        </Link>

            )}
                
              <Link
              href={'/dashboard/reports'}
              className={clsx("rounded-full p-2", isReports ? 'bg-blue-600 text-white' : 'bg-gray-200')}
          >
              Class Booking Reports
          </Link>
            
            
            
        </div>
    );
}

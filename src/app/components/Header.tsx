'use server'; //  the code will be executed in the server .note** needs to be at the top of the file and async functions
import logo from '@/app/icon-mastery.png';
import Image from 'next/image';
import { session } from '@/app/libs/session';
import NavLog from '@/app/components/Navlog';



export default async function Header() {
  const email = await session().get('email');
return (
<header className="bg-white">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-32 items-center justify-between">
    <div className="flex md:flex md:items-center md:gap-12 ">
    
      
      <Image src={logo} alt="logo" className='w-fit  pt-2' />
    </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav  className="hidden md:block">
        <ul className="flex items-center gap-6 sm:text-sm">
            <li>
            
              <a className="text-gray-500 text-lg transition font-bold hover:text-gray-500/75" href="#"> About </a>
            </li>
    
            <li>
              <a className="text-gray-500 transition text-lg font-bold hover:text-gray-500/75" href="#"> Careers </a>
            </li>

            <li>
              <a className="text-gray-500 transition text-lg font-bold hover:text-gray-500/75" href="#"> Services </a>
            </li>
            <li>
              <a className="text-gray-500 transition text-lg  font-bold hover:text-gray-500/75" href="#"> Blog </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
        <div className="sm:flex sm:gap-3 ">
         <NavLog email={email} />
        
        </div>
         
         <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
          
        </div>
      </div>
    </div>
 
</header>






);


}
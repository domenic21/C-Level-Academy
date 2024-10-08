'use server'; //  the code will be executed in the server .note** needs to be at the top of the file and async functions
import logo from '@/app/icon-mastery.png';
import Image from 'next/image';
import { session } from '@/libs/session';
import NavLog from '@/app/components/Navlog';



export default async function Header() {
  const email = await session().get('email');
return (
<header className="bg-white">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-32 items-center justify-between">
    <div className="flex md:flex md:items-center md:gap-12 ">
    
      <a href="/">
      <Image src={logo} alt="logo" className='pt-2 w-full' width={150} height={150}   />
      </a>
    </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav  className="hidden md:block">
        <ul className="flex items-center gap-6 sm:text-sm">
            <li>
            
              <a className="text-gray-500 text-lg transition font-bold hover:text-gray-500/75" href="#">  </a>
            </li>
    
            <li>
              <a className="text-gray-500 transition text-lg font-bold hover:text-gray-500/75" href="#"></a>
            </li>

            <li>
              <a className="text-gray-500 transition text-lg font-bold hover:text-gray-500/75" href="#"> </a>
            </li>
            <li>
              <a className="text-gray-500 transition text-lg  font-bold hover:text-gray-500/75" href="#"> </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
        <div className="sm:flex sm:gap-3 ">
         <NavLog email={email} />
        
        </div>
         
         
        </div>
          
        </div>
      </div>
    </div>
 
</header>






);


}
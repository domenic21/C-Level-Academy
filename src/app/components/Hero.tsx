'use client';
import { use, useEffect, useState } from "react";


export default function Hero() {
    const [showLine ,setShowLine] = useState(false);
    useEffect(() => {
        setShowLine(true);
    }, []);

  return (
    <section className="bg-gray-50 max-w-full  ">
      <div className="mx-auto max-w-full px-4 py-32 lg:flex lg:h-500 lg:items-center">
        <div className="mx-auto max-w-xl text-center ">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Mejora tu Ingles YA!
            
           
            Consigue el {""}
            <span className={"  text-yellow-400 cool-underline"+(showLine?'show-underline':'')}>
                nivel C1/C2  </span>
             
          </h1>

          <p className="mt-4 sm:text-xl/relaxed ">
            Mejora tu Ingles con nosotros, con tutores experimentados profesionales. 

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-blue-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-yellow-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { BookCheck, Earth, Laptop, Mail } from "lucide-react";
import logo from "@/app/icon-mastery.png"; 
import Image from 'next/image';
import { useEffect, useState } from "react";
import { courses } from "@/libs/constants";

export default function Hero() {
  const [showLine, setShowLine] = useState(false);
  useEffect(() => {
    setShowLine(true);
  }, []);

  return (
    <div>
      <section className="bg-gray-100 max-w-full  ">
        <div className="mx-auto max-w-full px-4 py-32 lg:flex lg:h-500 lg:items-center">
          <div className="mx-auto max-w-xl text-center ">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Mejora tu Ingles YA! Consigue el {""}
              <span
                className={
                  "  text-yellow-400 cool-underline" +
                  (showLine ? "show-underline" : "")
                }
              >
                nivel C1/C2{" "}
              </span>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed ">
              Mejora tu Ingles con nosotros, tutores experimentados
              profesionales.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-blue-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="https://c-level-academy.vercel.app/Dom21/quick-meeting"
              >
                {/* add quick meeting link for boooking*/}
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-yellow-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="#LearnMore"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-700 w-full h-4 "></div>
      <section className="bg-white text-blue-950" id="LearnMore ">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What makes us special
            </h2>

            <p className="mt-4 text-gray-800 font-semibold">
              At our English academy, we are dedicated to elevating your current
              level of English to a professional standard. Our curriculum is
              designed to enhance your communication skills through real-life
              scenarios and practical applications. We focus on developing not
              only your language proficiency but also the essential skills
              needed to excel in the workplace, ensuring you are equipped for
              success in any professional environment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-2 ">
            <a
              className="block rounded-xl border border-gray-100 p-4 shadow-xl hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="#"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Laptop className="size-16 " />
              </span>

              <h2 className="mt-2 font-bold">Online Classes</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Online classes are a convenient way to learn English from the
                comfort of your own home.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-100 p-4 shadow-xl hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="#"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Earth className="size-16" />
              </span>

              <h2 className="mt-2 font-bold">Worldwide</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                We adapt to your schedule and time zone.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-100 p-4 shadow-xl hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="#"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <BookCheck className="size-16" />
              </span>

              <h2 className="mt-2 font-bold">Curriculum</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Our curriculum is designed to enhance your communication skills
                through real-life scenarios and practical applications.
              </p>
            </a>
          </div>
        </div>
      </section>
      <div className="bg-blue-900 h-[8rem] text-white flex justify-center gap-10 py-4 ">
        <p className="lg:text-5xl sm:text-2xl font-semibold">
          Book your first session free!{" "}
        </p>
        <button className="rounded bg-yellow-300 text-black h-10 w-36   font-bold">
          {" "}
          Start here
        </button>
      </div>
      <section className="bg-slate-200 h-[100%] pb-10">
        <h2 className="flex text-4xl  font-bold justify-start mx-7 mt-10 mb-8">
          Feature Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-7 ">
          {courses.map((course) => (
            <article
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
              key={course.id}
            >
              <Image
                alt={course.title}
                src={course.imageUrl}
                className="h-56 w-full object-cover"
                width={300}
                height={200}
              />

              <div className="p-4 sm:p-6">
               
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.title}
                  </h3>
                

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {course.description}
                </p>

               
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-blue-900 mt-24 text-white">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-lg font-semibold">About Us</h2>
              <Image src={logo} alt="logo" width={100} height={100}className="w-fit" />

              <p className="mt-2 text-sm text-gray-300">
                We are a team of dedicated professionals who are passionate
                about helping you achieve your English language goals.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Contact</h2>

              <p className="mt-2 text-sm text-gray-300">
                <Mail className="size-6" />
                Email: class.mastery@email.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

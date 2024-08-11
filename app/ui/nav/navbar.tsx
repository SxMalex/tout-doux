"use client";
import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Fragment } from 'react';
import { ButtonLogOut } from '@/app/ui/button';
import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const links = [
    {
      id: 1,
      link: "/home",
      display: <button className="p-3 hover:text-gray-600"><HomeIcon className="w-6" /></button>,
      private: true,
    },
    {
      id: 2,
      link: "/public",
      display: <button className="p-3 hover:text-gray-600"><UserGroupIcon className="w-6" /></button>,
      private: false,
    },
];

function MobileNav({open, setOpen}: {open: boolean, setOpen: Function}) {

    let mobileLinks: JSX.Element[] = [];

    links.forEach((link) => {
        mobileLinks.push(
            <Fragment key={link.id}>
                <Link 
                    className="text-xl font-medium my-4" 
                    href={link.link}
                    onClick={() => setTimeout(() => {setOpen(!open)}, 100)}
                >
                    {link.display}
                </Link>
            </Fragment>
        )
    })

    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <Link className="text-xl font-semibold" href="/home">TOUT DOUX</Link>
            </div>
            <div className="flex flex-col ml-4">
                {mobileLinks}
                <ButtonLogOut />
            </div>  
        </div>
    )
}

export default function Navbar() {

    const [open, setOpen] = useState(false)

    let desktopLinks: JSX.Element[] = [];
    links.forEach((link) => {
        desktopLinks.push(
            <Fragment key={link.id}>
                <Link href={link.link} className={`mx-4`}>
                    {link.display}
                </Link>
            </Fragment>
        )
    })

    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link href="/home" className="text-xl font-semibold">
                    TOUT DOUX
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    {desktopLinks}
                    <ButtonLogOut />
                </div>
            </div>
        </nav>
    )
}
'use client'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RiMenuLine } from 'react-icons/ri'
import NavItems from './NavItems'
import Image from 'next/image'


const Nav = () => {

  const [mobileNavClosed, setMobileNavClosed] = useState<boolean>(true)

  const toggleMobileNav = (bool: boolean) => {
    setMobileNavClosed(bool)
  }


  return (
    <div>
        <div className="w-full h-20 shadow px-8 md:px-16 py-4 fixed top-0 bg-white z-10">
          <div className="w-full h-full flex flex-row justify-between">
            <div className={`md:hidden ${mobileNavClosed ? "flex" : "hidden"} justify-center items-center`} onClick={() => {
              setMobileNavClosed(false)
            }}>
              <RiMenuLine size={32} />
            </div>
            <div className={`flex w-[15rem] h-[200vw] shadow-2xl px-3 py-4 md:hidden absolute ${mobileNavClosed ? "left-[-15rem] top-0" : "left-0 top-0"} z-40 bg-white transition-all duration-200 ease-in-out delay-150`}>
              <div className="w-full h-auto flex flex-col gap-8 items-start">
                <div onClick={() => {
                  setMobileNavClosed(true)
                }}>
                  <IoMdClose size={25} />
                </div>
                <div className="flex items-center">
                  <NavItems toggleFunc={toggleMobileNav} />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <NavItems toggleFunc={toggleMobileNav} />
              </div>
            </div>
            <div className="relative">
              <Image 
                className="object-cover"
                src={`/images/achare-logo.svg`}
                alt="achare_logo"
                width={80}
                height={50}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Nav
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NavItems = (
  {
    toggleFunc
  } : {
    toggleFunc: (bool: boolean) => void
  }
) => {

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('')

  const path = usePathname()

  useEffect(() => {
    toggleFunc(true)
    const pathName = path.split('/')[path.split(('/')).length - 1];
    if (pathName == 'NewItemForm' || 'CordinationSubmition') {
      setSelectedMenuItem('ثبت آدرس')
    } 
    if ((pathName == 'items')) {
      setSelectedMenuItem('مشاهده آدرس ها')
    }
  },[])

  return (
    <div>
        <div className={`w-full h-auto flex flex-col md:flex-row items-start gap-3`}>
          <Link href={`/items`}>
            <p className={`text-lg ${selectedMenuItem == 'مشاهده آدرس ها' ? "font-bold text-[#00BFA5]" : "font-medium text-black"} transition-colors duration-200 ease-out`} onClick={(e) => {
              setSelectedMenuItem(e.currentTarget.innerHTML)
            }}>مشاهده آدرس ها</p>
          </Link>
          <Link href={`/NewItemForm`}>
            <p className={`text-lg ${selectedMenuItem == 'ثبت آدرس' ? "font-bold text-[#00BFA5]" : "font-medium text-black"} transition-colors duration-200 ease-out`} onClick={(e) => {
              setSelectedMenuItem(e.currentTarget.innerHTML)
            }}>ثبت آدرس</p>
          </Link>
        </div>
    </div>
  )
}

export default NavItems
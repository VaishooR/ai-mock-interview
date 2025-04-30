"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path = usePathname()
    console.log(path)
  return (
    <div className='flex justify-between p-4 items-center bg-green-300 shadow-sm'>
        <Image src={"/logo.svg"} width={160} height={100}/>
        <ul className='flex gap-6'>
            <li className={`hover:text-white hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-white font-bold '}`}>Dashboard</li>
            <Link href={'/'}><li className='hover:text-white hover:font-bold transition-all cursor-pointer'>Home</li></Link>
            
            {/* <li className='hover:text-white hover:font-bold transition-all cursor-pointer'>Questions</li>
            <li disabled className='hover:text-white hover:font-bold transition-all cursor-pointer'>Upgrade</li>
            <li className='hover:text-white hover:font-bold transition-all cursor-pointer'>How it Works?</li> */}
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
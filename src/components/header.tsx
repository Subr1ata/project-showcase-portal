import Image from 'next/image'
import React from 'react'
import logo from '../../public/images/logo.png'
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle } from "react-icons/hi2";

export default function Header() {
    const USER_IMAGE = "https://res.cloudinary.com/dknvsbuyy/image/upload/v1686314044/1617826370281_30f9a2a96a.jpg";
    return (
        <div className='flex justify-between p-4 border-b-[2px] border-blue-500'>
            <Image src={logo} alt={''} className='w-[115px]' priority />
            <div className='flex gap-5'>
                <button className='px-3 p-2 bg-black text-white rounded-full'> <span className='hidden sm:block'>CREATE POST</span> <HiOutlinePencilSquare className="sm:hidden" /></button>
                <button className='px-3 p-2 bg-gray-200 text-gray-700 rounded-full'><span className='hidden sm:block'>SIGN IN</span> <HiArrowLeftOnRectangle className="sm:hidden" /></button>

                <Image src={USER_IMAGE} width={40} height={40} alt={''} className='rounded-full' />
            </div>
        </div>
    )
}

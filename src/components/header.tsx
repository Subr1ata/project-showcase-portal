'use client';
import Image from 'next/image';
import React from 'react';
import logo from '../../public/images/logo.png';
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle, HiArrowRightOnRectangle, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between p-4 border-b-[2px] border-blue-500">
      <Image src={logo} alt={''} className="w-[115px]" priority />
      <div className="flex gap-5">
        <button
          className="px-3 p-2 bg-blue-500 text-white rounded-full flex items-center gap-2"
          onClick={() => router.push('/create-project')}
        >
          <HiOutlinePencilSquare />
          <span className="hidden sm:block">ADD PROJECT</span>
          <HiOutlinePencilSquare className="sm:hidden" />
        </button>
        <button className="px-3 p-2 bg-gray-200 text-gray-700 rounded-full flex items-center gap-2">
          <HiOutlineArrowLeftOnRectangle className="" />
          {!session ? (
            <span className="hidden sm:block" onClick={() => signIn()}>
              SIGN IN
            </span>
          ) : (
            <span className="hidden sm:block" onClick={() => signOut()}>
              SIGN OUT
            </span>
          )}
          <HiArrowLeftOnRectangle className="sm:hidden" />
        </button>

        {session ? (
          <Image
            src={String(session.user?.image)}
            width={40}
            height={40}
            alt={'user_image'}
            className="rounded-full cursor-pointer"
            onClick={() => router.push('/profile')}
          />
        ) : null}
      </div>
    </div>
  );
}

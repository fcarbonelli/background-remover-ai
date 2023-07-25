"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      //setProviders(res);
    })();
  }, []);

  const scrollToTarget = () => {
    if (window.location.pathname === '/thankyou') {
      window.location.href = '/';
    } else {
      const targetElement = document.getElementById('create-video');
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className='flex-between w-full lg:mb-16 pt-3 md:mb-10'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Remove Backgrounds AI</p>
      </Link>
      <div>
        <div className='flex gap-3 md:gap-5 '>
          <button onClick={scrollToTarget} className='black_btn '>
            Create Video
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

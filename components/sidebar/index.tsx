import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import STYLES from './index.module.css';

interface SidebarProps {
  wrapperClass?: string;
}

const navbarLinks = [
  { link: '/', title: 'a' },
  { link: '/tag', title: 'b' },
  { link: '/gossip', title: 'c' },
];

function Index(props: SidebarProps) {
  const { wrapperClass } = props;
  const router = useRouter();

  return (
    <div className={wrapperClass}>
      <div className="p-5 text-2xl bg-black text-white text-center">laffey note</div>
      <div className="bg-white py-2 text-sm">
        {navbarLinks.map((item, index) => {
          return (
            <div key={index} className={`px-5 py-1.5 ${router.pathname === item.link && STYLES['active']}`}>
              <Link href={item.link} className="block">
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;

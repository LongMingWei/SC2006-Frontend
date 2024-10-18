'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

const TabbedMenu = () => {
  const pathname = usePathname();
  const tabs = [
    { href: '/', icon: faHome, label: 'Home' },
    { href: '/search', icon: faSearch, label: 'Search' },
    { href: '/chat', icon: faComment, label: 'Chat' },
    { href: '/profile', icon: faUser, label: 'Profile' },
  ];

  return (
    <>
    <div className="fixed top-0 left-0 right-0 flex justify-between bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700">
        <span className="jua text-xl font-bold text-orange-500">PetBuddy</span>
        <span className="poppinsbold text-xl text-orange-500">Hello, User</span>
    </div>
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white dark:bg-black p-4 border-t border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={tab.icon}
            className={`jua text-2xl ${pathname === tab.href ? 'text-orange-500' : 'text-gray-500'}`}
            style={{ opacity: pathname === tab.href ? 1 : 0.5 }}
          />
          <span className={`jua text-xs ${pathname === tab.href ? 'text-orange-500' : 'text-gray-500'}`}>
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
    </>
  );
};

export default TabbedMenu;
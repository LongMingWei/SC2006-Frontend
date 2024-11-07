'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faComment, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TabbedMenu = () => {
  const pathname = usePathname();
  const tabs = [
    { href: '/', icon: faHome, label: 'Home' },
    { href: '/search', icon: faSearch, label: 'Search' },
    { href: '/messages', icon: faComment, label: 'Messages' },
    { href: '/profile', icon: faUser, label: 'Profile' },
  ];

  return (
    <>
    <div className="fixed top-0 left-0 right-0 flex justify-between bg-white dark:bg-black p-4">
        <span className="text-xl font-bold text-orange-500">PetBuddy</span>
        {pathname === '/profile' ? (
          <Link 
            href="/logout"
            className="text-orange-400 flex items-center text-sm"
          >
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
          </Link>
        ) : (
        <span className="text-xl text-gray-500">Hello, User</span>
        )}
    </div>
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white dark:bg-black p-4 border-t border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={tab.icon}
            className={`text-2xl ${pathname === tab.href ? 'text-orange-500' : 'text-gray-500'}`}
            style={{ opacity: pathname === tab.href ? 1 : 0.5 }}
          />
          <span className={`text-xs ${pathname === tab.href ? 'text-orange-500' : 'text-gray-500'}`}>
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
    </>
  );
};

export default TabbedMenu;
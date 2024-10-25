import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';

const messages = [
    {
      id: 1,
      name: 'John Smith',
      lastMessage: 'Hi, can I confirm whether you’re avai...',
      timeStamp: '9:27',
      imgUrl: '/johndoe.png'
    },
    {
        id: 2,
        name: 'Jane Doe',
        lastMessage: 'Yes, I’m waiting here!',
        timeStamp: 'Mon, 16:57',
        imgUrl: '/janedoe.png'
    },
  ];

export default function Messages() {
  return (
    <div>
      <div className="jua flex items-center justify-center w-full bg-white py-3">
        <h1 className="text-3xl font-bold text-center">My Chats</h1>
      </div>
    <div className="poppins space-y-8">
        {messages.map(message => (
        <Link key={message.id} href={`messages/${message.id}`}>
            <div className="w-full cursor-pointer">
            <div className="border-t-4 border-gray-50"></div>
            <div className="flex items-center justify-center p-4">
                <Image
                src={message.imgUrl}
                alt={message.name}
                width={50}
                height={50}
                className="rounded-full"
                />
                <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg">{message.name}</h2>
                    <p className="text-gray-600 text-sm">{message.timeStamp}</p>
                </div>
                <p className="text-gray-600 text-sm">{message.lastMessage}</p>
                </div>
            </div>
            <div className="border-t-4 border-orange-500"></div>
            </div>
        </Link>
        ))}
    </div>
    </div>
  );
}
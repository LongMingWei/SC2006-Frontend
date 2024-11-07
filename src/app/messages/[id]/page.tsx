import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const chatMessages = [
  { id: 1, text: "Hi, can I confirm whether you're available on Monday afternoon at 5pm?", sender: "user", timestamp: "Fri, 19:18" },
  { id: 2, text: "Hello! Yes, I am available. Where exactly should I meet you?", sender: "other", timestamp: "Fri, 19:31" },
  { id: 3, text: "We can meet at the dog park near the MRT. See you!", sender: "user", timestamp: "Fri, 20:11" },
  { id: 4, text: "Hi, I'm on my way there.", sender: "user", timestamp: "Mon, 16:56" },
  { id: 5, text: "Yes, I am waiting here!", sender: "other", timestamp: "Mon, 16:57" },
];

const ChatRoom: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/messages">
            <span className="text-orange-500 mr-4">←</span>
          </Link>
          <Image src="/johndoe.png" alt="John Smith" width={40} height={40} className="rounded-full mr-2" />
          <span className="font-bold">John Smith</span>
        </div>
      </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chatMessages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[70%] p-3 rounded-lg ${
            message.sender === 'user' 
              ? 'bg-orange-100 self-end' 
              : 'bg-white self-start'
          }`}>
            <p className="text-sm">{message.text}</p>
            <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
          </div>
        </div>
    ))}
</div>

      <div className="bg-white p-4 flex items-center">
        <span className="text-gray-500 mr-4">📎</span>
        <input
          type="text"
          placeholder="Write your message here..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="ml-4">
          <span className="text-orange-500">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
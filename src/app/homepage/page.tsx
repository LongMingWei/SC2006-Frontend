"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventCard: React.FC<{
  title: string;
  imageUrl: string;
}> = ({ title, imageUrl }) => (
  <div className="relative w-full h-48">
    <Image
      src={imageUrl}
      alt={title}
      width={120}
      height={120}
      className="rounded-lg w-full h-full object-contain"
      style={{ objectPosition: 'center' }} 
    />
    <div className="poppins absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
      {title}
    </div>
  </div>
);
const ServiceCard: React.FC<{
  title: string;
  imageUrl: string;
  href: string;
}> = ({ title, imageUrl, href }) => (
  <Link href={href}>
    <div className="w-40 h-40 bg-white text-black flex flex-col items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <Image
        src={imageUrl}
        alt={title}
        width={100}
        height={100}
        objectFit="cover"
        className="rounded-lg"
      />
      <span className="jua mt-2">{title}</span>
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const events = [
    { id: 1, title: 'Event 1', imageUrl: '/dog.png' },
    { id: 2, title: 'Event 2', imageUrl: '/dog.png' },
    { id: 3, title: 'Event 3', imageUrl: '/dog.png' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <main className="p-4">
        <section className="mb-8">
          <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2 mb-4">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map(event => (
              <EventCard 
                key={event.id}
                title={event.title}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2 mb-4">
            Services
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <ServiceCard
              title="Upcoming Bookings"
              imageUrl="/bookings.png"
              href="/upcoming-bookings"
            />
            <ServiceCard
              title="View events"
              imageUrl="/events.png"
              href="/view-events"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
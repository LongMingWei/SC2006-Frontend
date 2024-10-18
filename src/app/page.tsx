import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import './globals.css';

export default function Home() {
  const events = [
    { id: 1, title: 'Event 1', imageUrl: '/dog.png' },
    { id: 2, title: 'Event 2', imageUrl: '/dog.png' },
    { id: 3, title: 'Event 3', imageUrl: '/dog.png' },
  ];

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="w-full text-left">
            <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2">Upcoming Events</h2>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className="relative w-full h-64">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={180}
                  height={180}
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="poppins absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                  {event.title}
                </div>
              </div>
            ))}
          </div>
          <section className="w-full text-left">
            <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2">Services</h2>
          </section>
          <div className="flex gap-4 items-center justify-center w-full">
          <Link href="/upcoming-bookings">
            <div className="w-64 h-64 bg-white text-black flex flex-col items-center justify-center rounded-lg shadow-lg">
              <Image
                src='/bookings.png'
                alt='doge'
                width={180}
                height={180}
                objectFit="cover"
                className="rounded-lg"
              />
              <span className="jua mt-2">Upcoming Bookings</span>
            </div>
          </Link>
          <Link href="/view-events">
            <div className="w-64 h-64 bg-white text-black flex flex-col items-center justify-center rounded-lg shadow-lg">
              <Image
                src='/events.png'
                alt='doge'
                width={180}
                height={180}
                objectFit="cover"
                className="rounded-lg"
              />
              <span className="jua mt-2">View events</span>
            </div>
          </Link>
          </div>
        </main>
      </div>
    </>
  );
}
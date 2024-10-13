import Link from 'next/link';
import Image from 'next/image';

const events = [
  {
    id: 1,
    name: 'Event 1',
    date: '2023-10-01',
    location: 'Location 1',
    time: '10:00 AM',
    avatarUrl: '/dog.png',
  },
  {
    id: 2,
    name: 'Event 2',
    date: '2023-10-02',
    location: 'Location 2',
    time: '11:00 AM',
    avatarUrl: '/dog.png',
  },
  {
    id: 3,
    name: 'Event 3',
    date: '2023-10-03',
    location: 'Location 3',
    time: '12:00 PM',
    avatarUrl: '/dog.png',
  },
];

export default function UpcomingEvents() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-center mb-8">
        <Link href="/">
          <div className="text-orange-500 text-3xl mr-4 inline-block">←</div>
        </Link>
        <h1 className="text-3xl font-bold text-center">Upcoming Events</h1>
      </div>
      <div className="space-y-8">
        {events.map(event => (
          <Link key={event.id} href={`upcoming-bookings/event/${event.id}`}>
            <div className="w-full cursor-pointer">
              <div className="border-t-4 border-orange-500"></div>
              <div className="flex items-center justify-center p-4">
                <Image
                  src={event.avatarUrl}
                  alt={event.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <p className="text-gray-600">{event.date}</p>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-gray-600">{event.time}</p>
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
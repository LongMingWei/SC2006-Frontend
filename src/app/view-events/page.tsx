import Link from 'next/link';
import Image from 'next/image';

const events = [
  {
    id: 1,
    name: 'Event 1',
    date: '2023-10-01',
    location: 'Location 1',
    time: '10:00 AM',
    imageUrl: '/dog.png',
  },
  {
    id: 2,
    name: 'Event 2',
    date: '2023-10-02',
    location: 'Location 2',
    time: '11:00 AM',
    imageUrl: '/dog.png',
  },
  {
    id: 3,
    name: 'Event 3',
    date: '2023-10-03',
    location: 'Location 3',
    time: '12:00 PM',
    imageUrl: '/dog.png',
  },
];

export default function ViewEvents() {
  return (
    <div className="p-8">
      <Link href="/homepage">
        <div className="text-orange-500 text-5xl mb-4 ml-16 inline-block">←</div>
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">View Events</h1>
      <div className="space-y-8">
        {events.map(event => (
          <div key={event.id} className="w-full flex justify-center items-center">
            <div className="flex items-center justify-center p-4 w-full border-l-4 border-orange-500">
              <Image
                src={event.imageUrl}
                alt={event.name}
                width={128}
                height={128}
                className="rounded-lg"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-gray-600">{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
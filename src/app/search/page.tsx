import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';

const caretakers = [
    {
      id: 1,
      name: 'Caretaker 1',
      experience: '5 years',
      servicesOffered: ['Walking', 'Grooming'],
      availability: 'Weekdays',
      imageUrl: '/dog.png',
    },
    {
      id: 2,
      name: 'Caretaker 2',
      experience: '3 years',
      servicesOffered: ['Walking', 'Training'],
      availability: 'Weekends',
      imageUrl: '/dog.png',
    },
    {
      id: 3,
      name: 'Caretaker 3',
      experience: '7 years',
      servicesOffered: ['Walking', 'Sitting'],
      availability: 'Weekdays and Weekends',
      imageUrl: '/dog.png',
    },
  ];

export default function UpcomingEvents() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-center mb-8">
        <Link href="/">
          <div className="text-orange-500 text-3xl mr-4 inline-block">←</div>
        </Link>
        <h1 className="text-3xl font-bold text-center">Caretakers</h1>
      </div>
    <div className="space-y-8">
        {caretakers.map(caretaker => (
        <Link key={caretaker.id} href={`search/caretaker/${caretaker.id}`}>
            <div className="w-full cursor-pointer">
            <div className="border-t-4 border-orange-500"></div>
            <div className="flex items-center justify-center p-4">
                <Image
                src={caretaker.imageUrl}
                alt={caretaker.name}
                width={64}
                height={64}
                className="rounded-full"
                />
                <div className="ml-4">
                <h2 className="text-xl font-semibold">{caretaker.name}</h2>
                <p className="text-gray-600">{`Experience: ${caretaker.experience}`}</p>
                <p className="text-gray-600">{`Services offered: ${caretaker.servicesOffered}`}</p>
                <p className="text-gray-600">{`Availability: ${caretaker.availability}`}</p>
                </div>
            </div>
            <div className="border-t-4 border-orange-500"></div>
            </div>
        </Link>
        ))}
    </div>
    <Link href="search/map">
        <button className="fixed bottom-8 right-8 bg-orange-500 text-white p-4 rounded-full mb-16 shadow-lg">
        <FontAwesomeIcon
            icon={faMap}
        />
        </button>
    </Link>
    </div>
  );
}
'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const caretakers = [
  {
    id: 1,
    name: 'Caretaker 1',
    experience: '5 years',
    servicesOffered: [
      {
        name: 'Walking',
        availability: 'Weekdays',
        rates: '$20/hour',
        reviews: [
          { reviewer: 'John Doe', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Jane Smith', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Grooming',
        availability: 'Weekends',
        rates: '$25/hour',
        reviews: [
          { reviewer: 'Alice Brown', comment: 'Excellent grooming!', rating: 5 },
          { reviewer: 'Bob Johnson', comment: 'Very professional.', rating: 4 },
        ],
      },
    ],
    location: 'Location 1',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 1, with 5 years of experience in pet care.',
  },
  {
    id: 2,
    name: 'Caretaker 2',
    experience: '3 years',
    servicesOffered: [
      {
        name: 'Walking',
        availability: 'Weekends',
        rates: '$30/hour',
        reviews: [
          { reviewer: 'Alice Brown', comment: 'Excellent walking service!', rating: 5 },
          { reviewer: 'Bob Johnson', comment: 'Good with pets.', rating: 4 },
        ],
      },
      {
        name: 'Training',
        availability: 'Weekdays',
        rates: '$35/hour',
        reviews: [
          { reviewer: 'Charlie Davis', comment: 'Great trainer!', rating: 5 },
          { reviewer: 'Dana Evans', comment: 'Very effective training.', rating: 4 },
        ],
      },
    ],
    location: 'Location 2',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 2, specializing in pet training.',
  },
  {
    id: 3,
    name: 'Caretaker 3',
    experience: '7 years',
    servicesOffered: [
      {
        name: 'Walking',
        availability: 'Weekdays and Weekends',
        rates: '$25/hour',
        reviews: [
          { reviewer: 'Eve Foster', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Frank Green', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Sitting',
        availability: 'Weekdays',
        rates: '$40/hour',
        reviews: [
          { reviewer: 'Grace Hill', comment: 'Excellent sitting service!', rating: 5 },
          { reviewer: 'Hank Ives', comment: 'Very professional sitter.', rating: 4 },
        ],
      },
    ],
    location: 'Location 3',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 3, with 7 years of experience in pet care.',
  },
];

export default function CaretakerPage() {
  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/').pop() || '0', 10);
  const caretaker = caretakers.find(c => c.id === caretakerId);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const averageRating = caretaker.servicesOffered.reduce((acc, service) => {
    const totalRating = service.reviews.reduce((sum, review) => sum + review.rating, 0);
    return acc + totalRating / service.reviews.length;
  }, 0) / caretaker.servicesOffered.length;
  
  return (
    <div className="p-8 justify-center items-center min-h-screen">
      <div className="flex items-center">
        <Link href="/search">
          <div className="text-orange-500 text-3xl mr-8 inline-block">←</div>
        </Link>
        <Image src={caretaker.imageUrl} alt={caretaker.name} width={180} height={180} className="rounded-full" />
        <div className="ml-4">
          <h1 className="jua text-3xl font-bold">{caretaker.name}</h1>
          <p className="poppins text-lg">{'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})</p>
        </div>
      </div>
      <div className="mt-4 poppins">
        <p className="bg-orange-100 p-4 rounded-lg">{caretaker.introduction}</p>
        <p className="mt-2">Experience: {caretaker.experience}</p>
        <p className="mt-2">Location: {caretaker.location}</p>
        <section className="w-full text-left">
            <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2 mt-8">Services Offered:</h2>
        </section>
        <div className="mt-2 flex gap-4 items-center justify-center w-full">
          {caretaker.servicesOffered.map((service, index) => (
            <div key={index} className="w-64 h-64 bg-white text-black flex flex-col items-center justify-center rounded-lg shadow-lg">
              <Image src={caretaker.imageUrl} alt={service.name} width={100} height={100} className="rounded-lg" />
              <div>
                <p className="jua">{service.name}</p>
                <p className="poppins">Availability: {service.availability}</p>
                <p className="poppins">Rates: {service.rates}</p>
                <Link href={`/search/caretaker/${caretaker.id}/${service.name.toLowerCase()}`}>
                  <button className="poppins bg-orange-500 text-white px-4 py-2 rounded mt-2">Book Service</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



          
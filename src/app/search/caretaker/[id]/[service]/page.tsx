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

export default function EventDetails() {
  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/')[3] || '0', 10);
  const caretaker = caretakers.find(c => c.id === caretakerId);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const serviceName = pathname.split('/')[4];
  const service = caretaker.servicesOffered.find(s => s.name.toLowerCase() === serviceName.toLowerCase());

  if (!service) {
    return <div>Service not found</div>;
  }

  const averageRating = service.reviews.reduce((acc, review) => acc + review.rating, 0) / service.reviews.length;

return (
  <div className="p-8 justify-center items-center min-h-screen">
    <div className="flex items-center">
        <Link href={`/search/caretaker/${caretaker.id}`}>
          <div className="text-orange-500 text-3xl mr-8 inline-block">←</div>
        </Link>
      <Image src={caretaker.imageUrl} alt={caretaker.name} width={180} height={180} className="rounded-full" />
      <div className="ml-4">
        <h1 className="jua text-3xl font-bold">{caretaker.name}</h1>
        <p className="poppins text-lg">{'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})</p>
      </div>
    </div>
    <div className="mt-4 poppins">
      <p className="jua bg-orange-100 p-4 rounded-lg">{serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}</p>
      <p className="mt-2">Availability: {service.availability}</p>
      <p className="mt-2">Rates: {service.rates}</p>
      <p className="mt-2">Location: {caretaker.location}</p>
    </div>
    <div className="mt-8 poppins">
      <h2 className="text-xl font-bold">Reviews</h2>
      {service.reviews.map((review, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold">{review.reviewer}</p>
          <p>{review.comment}</p>
          <p>{'⭐'.repeat(review.rating)}</p>
        </div>
      ))}
    </div>
    <Link href={`/search/caretaker/${caretaker.id}/${serviceName}/booking`}>
        <button className="poppins bg-orange-500 text-white px-4 py-2 rounded mt-2">Book Now</button>
    </Link>
  </div>
);
}
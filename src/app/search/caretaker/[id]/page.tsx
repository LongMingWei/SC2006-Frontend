'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const caretakers = [
  {
    id: 1,
    name: 'Caretaker 1',
    experience: '5 years',
    servicesOffered: ['Walking', 'Grooming'],
    availability: 'Weekdays',
    rates: '$20/hour',
    location: 'Location 1',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 1, with 5 years of experience in pet care.',
    reviews: [
      { reviewer: 'John Doe', comment: 'Great service!', rating: 5 },
      { reviewer: 'Jane Smith', comment: 'Very reliable.', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'Caretaker 2',
    experience: '3 years',
    servicesOffered: ['Walking', 'Training'],
    availability: 'Weekends',
    rates: '$30/hour',
    location: 'Location 2',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 2, specializing in pet training.',
    reviews: [
      { reviewer: 'Alice Brown', comment: 'Excellent trainer!', rating: 5 },
      { reviewer: 'Bob Johnson', comment: 'Good with pets.', rating: 4 },
    ],
  },
  {
    id: 3,
    name: 'Caretaker 3',
    experience: '7 years',
    servicesOffered: ['Walking', 'Sitting'],
    availability: 'Weekdays and Weekends',
    rates: '$50/hour',
    location: 'Location 3',
    imageUrl: '/dog.png',
    introduction: 'I am Caretaker 3, with extensive experience in pet sitting.',
    reviews: [
      { reviewer: 'Charlie Davis', comment: 'Highly recommended!', rating: 5 },
      { reviewer: 'Dana Lee', comment: 'Very professional.', rating: 5 },
    ],
  },
];

export default function EventDetails() {
  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/').pop() || '0', 10);
  const caretaker = caretakers.find(c => c.id === caretakerId);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const averageRating = caretaker.reviews.reduce((acc, review) => acc + review.rating, 0) / caretaker.reviews.length;

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
        <Link href={`/search/caretaker/${caretaker.id}/booking`}>
          <button className="poppins bg-orange-500 text-white px-4 py-2 rounded mt-2">Book Now</button>
        </Link>
      </div>
    </div>
    <div className="mt-4 poppins">
      <p className="bg-orange-100 p-4 rounded-lg">{caretaker.introduction}</p>
      <p className="mt-2">Experience: {caretaker.experience}</p>
      <p className="mt-2">Services Offered: {caretaker.servicesOffered.join(', ')}</p>
      <p className="mt-2">Availability: {caretaker.availability}</p>
      <p className="mt-2">Rates: {caretaker.rates}</p>
      <p className="mt-2">Location: {caretaker.location}</p>
    </div>
    <div className="mt-8 poppins">
      <h2 className="text-xl font-bold">Reviews</h2>
      {caretaker.reviews.map((review, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold">{review.reviewer}</p>
          <p>{review.comment}</p>
          <p>{'⭐'.repeat(review.rating)}</p>
        </div>
      ))}
    </div>
  </div>
);
}
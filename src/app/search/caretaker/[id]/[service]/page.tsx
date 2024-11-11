'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios, { all } from 'axios';
import router from 'next/router';

interface Caretaker {
  name: string;
}

// Type for days of the week
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Type for service details
interface Service {
  service_id: number;
  service: string;
  service_rate: number;
  service_availability: DayOfWeek[];
  location: string[];
  review: Review[];
}

interface Review {
  service_id: number;
  rating: number;
  review_description: string;
  user_id: number;
  anonymous: boolean;
}

export default function EventDetails() {
  const [caretaker, setCaretaker] = useState<Caretaker | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/')[3] || '0', 10);
  const serviceId = pathname.split('/')[4];

  const token = sessionStorage.getItem('access_token');

  if (!token) {
    router.push('/signout/login');
    return;
  }

  useEffect(() => {
    const fetchService = async () => {

      try {
        const responseCare = await axios.get<Caretaker>(`http://localhost:8000/caretaker/${caretakerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const response = await axios.get<Service>(`http://localhost:8000/service/${caretakerId}/${serviceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCaretaker(responseCare.data);
        setService(response.data);
        setReviews(response.data.review || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service:', err);
        setCaretaker(null);
        setService(null);
        setReviews([]);
        setError('Failed to load service');
        setLoading(false);
      }
    };

    fetchService();
  }, []);

  if (caretaker === null || service === null) {
    return <div className="text-red-500 text-center p-4">Service not found</div>;
  }

  const allReviews = service.review || [];
  const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B3D]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }


return (
  <div className="p-8 justify-center items-center min-h-screen">
    <div className="flex items-center">
        <Link href={`/search/caretaker/${caretakerId}`}>
          <div className="text-orange-500 text-3xl mr-8 inline-block">←</div>
        </Link>
      <Image src='/janedoe.png' alt={service.service} width={90} height={90} className="rounded-full" />
      <div className="ml-4">
        <h1 className="jua text-3xl font-bold">{caretaker.name}</h1>
      </div>
    </div>
    <div className="mt-4 poppins">
      <p className="jua bg-orange-100 p-4 rounded-lg text-xl">{service.service.charAt(0).toUpperCase() + service.service.slice(1)} <p className="poppins text-lg">{'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})</p> </p>
      <p className="mt-2">Availability: {service.service_availability.join(', ')}</p>
      <p className="mt-2">Rates: {service.service_rate}</p>
      <p className="mt-2">Location: {service.location.join(', ')}</p>
    </div>
    <div className="mt-8 poppins">
      <h2 className="text-xl font-bold">Reviews</h2>
      {allReviews.map((review, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold">{review.anonymous ? 'Anonymous' : review.user_id}</p>
          <p>{review.review_description}</p>
          <p>{'⭐'.repeat(review.rating)}</p>
        </div>
      ))}
      {allReviews.length === 0 && <p>No reviews yet</p>}
    </div>
    <Link href={`/search/caretaker/${caretakerId}/${serviceId}/booking`}>
        <button className="poppins bg-orange-500 text-white px-4 py-2 rounded mt-2 mt-8">Book Now</button>
    </Link>
  </div>
);
}


/* const caretakers = [
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
]; */
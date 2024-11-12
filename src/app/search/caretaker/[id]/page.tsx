'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'; 
import { set } from 'react-datepicker/dist/date_utils';

interface Caretaker {
  name: string;
  dob: string;      
  gender: 'male' | 'female' | 'other';
  work_exp: number;
  service: Service[]; 
  user_id: number;
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

interface ServiceWithAverageRating {
  service: Service;
  averageRating: number;
}

interface Review {
  service_id: number;
  rating: number;
}

export default function CaretakerPage() {
  const [caretaker, setCaretaker] = useState<Caretaker | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/').pop() || '0', 10);

  const token = sessionStorage.getItem('access_token');
  const router = useRouter();

  if (!token) {
    router.push('/signout/login');
    return;
  }

  useEffect(() => {
    const fetchCaretaker = async () => {

      try {
        const response = await axios.get<Caretaker>(`http://localhost:8000/caretaker/${caretakerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCaretaker(response.data);
        setServices(response.data.service || []);
        const allReviews = response.data.service.flatMap(service => service.review || []);
        setReviews(allReviews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching caretakers:', err);
        setCaretaker(null);
        setServices([]);
        setError('Failed to load caretakers');
        setLoading(false);
      }
    };

    fetchCaretaker();
  }, []);

  if (caretaker === null) {
    return <div className="text-red-500 text-center p-4">Caretaker not found</div>;
  }

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

  const servicesWithAverageRating: ServiceWithAverageRating[] = services.map(service => {
    const reviews = service.review || []; // Ensure reviews is an array
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    return {
      service,
      averageRating
    };
  });

  return (
    <div className="p-8 justify-center items-center min-h-screen">
      <div className="flex items-center">
        <Link href="/search">
          <div className="text-orange-500 text-3xl mr-8 inline-block">←</div>
        </Link>
        <Image src='/janedoe.png' alt={caretaker.name} width={90} height={90} className="rounded-full" />
        <div className="ml-4 flex items-center justify-between w-full">
          <h1 className="jua text-3xl font-bold">{caretaker.name}</h1>
          
          {/* Chat Button */}
          <button 
            onClick={() => router.push(`/messages/${caretakerId}`)}
            className="ml-auto flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faComment} className="mr-2"/> Chat
          </button>

          {/* <p className="poppins text-lg">{'⭐'.repeat(Math.round(servicesWithAverageRating.averageRating))} ({averageRating.toFixed(1)})</p> */}
        </div>
      </div>
      <div className="mt-4 poppins">
        {/* <p className="bg-orange-100 p-4 rounded-lg">{caretaker.introduction}</p> */}
        <p className="mt-2">Gender: {caretaker.gender}</p>
        <p className="mt-2">DOB: {caretaker.dob}</p>
        <p className="mt-2">Experience: {caretaker.work_exp}</p>
        <section className="w-full text-left">
            <h2 className="jua text-xl font-bold border-l-4 border-orange-500 pl-2 mt-8">Services Offered:</h2>
        </section>
        <div className="mt-2 flex gap-4 items-center justify-center w-full">
          {caretaker.service.map((service, index) => (
            <div key={index} className="bg-white text-black flex flex-col items-center justify-center rounded-lg shadow-lg p-4">
              <Image src='/dog.png' alt={service.service} width={50} height={50} className="rounded-lg" />
              <div className="text-center mt-2">
              <p className="jua">{service.service}</p>
              <p className="poppins text-lg">{'⭐'.repeat(Math.round(servicesWithAverageRating.find(s => s.service.service_id === service.service_id)?.averageRating || 0))} ({(servicesWithAverageRating.find(s => s.service.service_id === service.service_id)?.averageRating || 0).toFixed(1)})</p>
              <p className="poppins">Availability: {service.service_availability.join(', ')}</p>
              <p className="poppins">Rates (per hour unless otherwise stated): {service.service_rate}</p>
              <p className="poppins">Location: {service.location.join(', ')}</p>
              <Link href={`/search/caretaker/${caretakerId}/${service.service_id}`}>
                <button className="poppins bg-orange-500 text-white px-4 py-2 rounded mt-2">View Service</button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
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
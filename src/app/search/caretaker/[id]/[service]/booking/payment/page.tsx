'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PaymentPage = () => {
  interface BookingData {
    caretakerName: string;
    serviceType: string;
    location: string;
    petName: string;
    timeslots: string[];
  }

  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const { caretakerName, serviceType, location, petName, timeslots } = bookingData;
  const caretaker = caretakers.find(c => c.name === caretakerName);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const service = caretaker.servicesOffered.find(s => s.name.toLowerCase() === (serviceType as string).toLowerCase());

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8">
      <div className="flex mb-8">
        <Link href={`/search/caretaker/${caretaker.id}/${serviceType}/booking`}>
          <div className="text-orange-500 text-xl mr-4">←</div>
        </Link>
        <h1 className="jua text-3xl font-bold">Payment</h1>
      </div>
      <div className="text-left mb-8 poppins">
        <p><strong>Caretaker:</strong> {caretakerName}</p>
        <p><strong>Service:</strong> {serviceType}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Pet’s name:</strong> {petName}</p>
        <p><strong>Timeslots chosen:</strong> {timeslots.join(', ')}</p>
      </div>
      <div className="text-left mb-8 poppins">
        <p><strong>Service Fee: </strong>{`$${service.rates*timeslots.length}`}</p>
        <p>Please make your payment via the QR code</p>
      </div>
      <div className="mb-8">
        <Image src="/qr-code.png" alt="QR Code" width={200} height={200} />
      </div>
      <button className="poppins bg-orange-500 text-white px-4 py-2 rounded">Pay</button>
    </div>
  );
};

export default PaymentPage;


/* const caretakers = [
  {
    id: 1,
    name: 'Caretaker 1',
    experience: '5 years',
    servicesOffered: [
      {
        name: 'Walking',
        availableTimeslots: ['14:00', '15:00', '16:00', '17:00'],
        rates: 20,
        reviews: [
          { reviewer: 'John Doe', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Jane Smith', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Grooming',
        availableTimeslots: ['13:00', '14:00', '15:00', '16:00', '17:00'],
        rates: 25,
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
        availableTimeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        rates: 30,
        reviews: [
          { reviewer: 'Alice Brown', comment: 'Excellent walking service!', rating: 5 },
          { reviewer: 'Bob Johnson', comment: 'Good with pets.', rating: 4 },
        ],
      },
      {
        name: 'Training',
        availableTimeslots: ['11:00', '12:00', '13:00', '14:00', '15:00'],
        rates: 35,
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
        availableTimeslots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        rates: 25,
        reviews: [
          { reviewer: 'Eve Foster', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Frank Green', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Sitting',
        availableTimeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        rates: 40,
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
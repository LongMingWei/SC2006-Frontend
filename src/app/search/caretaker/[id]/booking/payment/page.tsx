'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Payment = () => {
    
  const caretaker = {
    id: 1, 
    name: 'John Smith',
    service: 'Dog walking',
    location: 'Jurong East',
    petName: 'Kimmy',
    timeChosen: '09/09/2024, 16:00-17:00',
    serviceFee: '$30',
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8">
      <div className="flex mb-8">
        <Link href={`/search/caretaker/${caretaker.id}/booking`}>
            <div className="text-orange-500 text-xl mr-4">←</div>
        </Link>
        <h1 className="jua text-3xl font-bold">Payment</h1>
      </div>
      <div className="text-left mb-8 poppins">
        <p><strong>Caretaker:</strong> {caretaker.name}</p>
        <p><strong>Service:</strong> {caretaker.service}</p>
        <p><strong>Location:</strong> {caretaker.location}</p>
        <p><strong>Pet’s name:</strong> {caretaker.petName}</p>
        <p><strong>Time chosen:</strong> {caretaker.timeChosen}</p>
      </div>
      <div className="text-left mb-8 poppins">
        <p><strong>Service Fee:</strong> {caretaker.serviceFee}</p>
        <p>Please make your payment via the QR code</p>
      </div>
      <div className="mb-8">
        <Image src="/qr-code.png" alt="QR Code" width={200} height={200} />
      </div>
      <button className="poppins bg-orange-500 text-white px-4 py-2 rounded">Pay</button>
    </div>
  );
};

export default Payment;
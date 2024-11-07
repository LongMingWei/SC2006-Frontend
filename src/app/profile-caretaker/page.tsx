import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';
  
  const ProfileCard: React.FC<{
    name:string;
    email: string;
    username: string;
    imgUrl:string;
  }> = ({ name, email, username, imgUrl }) => (
    <div className="bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold mb-1">Welcome, {name}!</h2>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">{username}</p>
        <Link href="/edit-profile" className="text-orange-400 text-sm">Edit profile &gt;</Link>
      </div>
      <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-full" />
    </div>
  );
  

  const BookingCard: React.FC<{
    name:string;
    age: string;
    date: string;
    location: string;
    imgUrl:string;
  }> = ({ name, age, date, location, imgUrl }) => (
    <div className="bg-orange-50 rounded-2xl p-4 mb-4 shadow-md w-48">
      <div className= "flex items-center mb-2">
        <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-lg mr-4" />
        <div>
          <h3 className="font-bold text-xl">{name} <span className="font-normal text-sm">{age}</span></h3>
          <p className="text-sm text-gray-600">{date}</p>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
    </div>
  );

  const ServiceCard: React.FC<{
    serviceName:string;
    rate: string;
    availability: string;
    imgUrl:string;
  }> = ({ serviceName, rate, availability, imgUrl }) => (
    <div className="bg-orange-50 rounded-2xl p-4 mb-4 shadow-md w-48">
      <div className= "flex items-center mb-2">
        <Image src={imgUrl} alt={serviceName} width={60} height={60} className="rounded-lg mr-4" />
        <div>
          <h3 className="font-bold text-xl">{serviceName}</h3>
          <p className="text-sm text-gray-600">{rate}</p>
          <p className="text-sm text-gray-600">{availability}</p>
        </div>
      </div>
    </div>
  );

  const AddServiceButton: React.FC = () => (
    <button className="bg-orange-300 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl ml-4">+</button>
  )
  
  const GeneralItem: React.FC<{
    text:string;
    link: string;
    isDelete?: boolean;
  }> = ({ text, link, isDelete = false }) => (
    <Link href={link} className={`py-4 flex justify-between items-center border-b ${isDelete ? 'text-red-500' : ''}`}>
      {text}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
  
  const ProfilePage: React.FC = () => {
    return (
      <div className="bg-white min-h-screen">
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <ProfileCard 
            name="John" 
            email="johnsmith@gmail.com" 
            username="@johnsmith" 
            imgUrl="/johndoe.png" 
          />
          
          <h2 className="text-3xl font-bold mb-4">My Bookings</h2>
            <BookingCard 
              name="Kimmy" 
              age="2Y 1M" 
              date="31/10/2024 14:00"
              location="Buona Vista"
              imgUrl="/kimmydog.png" 
            />

          <h2 className="text-3xl font-bold mb-4">My Services</h2>
          <div className="flex items-center mb-6">  
            <ServiceCard 
              serviceName="Pet Grooming" 
              rate="$50/hr" 
              availability="Mon, Tue"
              imgUrl="/kimmydog.png" 
            />
            <AddServiceButton/>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">General</h2>
          <div className="bg-white">
            <GeneralItem text="Booking History" link="/booking-history" />
            <GeneralItem text="Payment History" link="/payment-history" />
            <GeneralItem text="Payment Settings" link="/payment-settings" />
            <GeneralItem text="Change Password" link="/change-password" />
            <GeneralItem text="Emergency Contact Update" link="/emergency-contact" />
            <GeneralItem text="Delete Account" link="/delete-account" isDelete={true} />
          </div>
        </main>
      </div>
    );
  };
  
  export default ProfilePage;
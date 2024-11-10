"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Types for user data
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string; 
}

// Types for the main response
interface Profile {
  name: string;
  dob: string;      
  gender: 'male' | 'female' | 'other';
  work_exp: number;
  service: Service[]; 
  user: User;
}

// Type for days of the week
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Type for service details
interface Service {
  service: string;
  service_rate: number;
  service_availability: DayOfWeek[];
  location: string[];
}
  
const ProfileCard: React.FC<{
  name: string;
  email: string;
  username: string;
  imgUrl: string;
}> = ({ name, email, username, imgUrl }) => (
  <div className="bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
    <div>
      <h2 className="text-xl font-bold mb-1">Welcome, {name}!</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{username}</p>
      <Link href="/editprofile-caretaker" className="text-orange-400 text-sm">Edit profile &gt;</Link>
    </div>
    <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-full" />
  </div>
);

const BookingCard: React.FC<{
  name: string;
  age: string;
  date: string;
  location: string;
  imgUrl: string;
}> = ({ name, age, date, location, imgUrl }) => (
  <div className="bg-orange-50 rounded-2xl p-4 mb-4 shadow-md w-48">
    <div className="flex items-center mb-2">
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
  serviceName: string;
  rate: string;
  availability: string;
  imgUrl: string;
}> = ({ serviceName, rate, availability, imgUrl }) => (
  <div className="flex-shrink-0 bg-orange-50 rounded-3xl p-6 shadow-md w-[280px] h-[160px]">
    <div className="flex items-start">
      <Image src={imgUrl} alt={serviceName} width={60} height={60} className="rounded-lg mr-4" />
      <div>
        <h3 className="font-bold text-xl mb-2">{serviceName}</h3>
        <p className="text-gray-600 mb-1">{rate}</p>
        <p className="text-gray-600 text-sm">{availability}</p>
      </div>
    </div>
  </div>
);

const AddServiceButton: React.FC = () => (
  <div className="flex-shrink-0 flex items-center h-[160px]">
    <Link href="/signout/signup/createProfile/caretakerProfile/addService">
      <button className="bg-[#F4B183] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-[#eb9e67] transition-colors">
        +
      </button>
    </Link>
  </div>
);

const GeneralItem: React.FC<{
  text: string;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Get token and userId from sessionStorage
      const token = sessionStorage.getItem('access_token');
      const userId = sessionStorage.getItem('user_id');

      // If no token or userId, redirect to login
      if (!token || !userId) {
        router.push('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      try {
        setLoading(true);
        const response = await axios.get<Profile>(`http://localhost:8000/caretaker/${userId}`, config);
        setProfile(response.data);
        setError(null);
      } catch (err: any) {
        setProfile(null);
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          sessionStorage.clear();
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return "Loading..."
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <ProfileCard 
          name={profile?.name || "Loading..."} 
          email={profile?.user.email || "Loading..."} 
          username={`@${profile?.user.username}`} 
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
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
            {profile?.service.map((service) => (
              <ServiceCard 
                key={service.service}
                serviceName={service.service}
                rate={`$${service.service_rate}/hr`} 
                availability={service.service_availability.join(', ')}
                imgUrl="/kimmydog.png" 
              />
            ))}
            <div className="flex-shrink-0"></div>
            <AddServiceButton/>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">General</h2>
        <div className="bg-white">
          <GeneralItem text="Booking History" link="/booking-history" />
          <GeneralItem text="Payment History" link="/payment-history" />
          <GeneralItem text="Change Password" link="/change-password" />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
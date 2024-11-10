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
  created_at: string;  // ISO date string
}

interface Pet {
  pet_name: string;
  pet_species: string;
  pet_breed: string;
  pet_age: number;
  pet_health: string;
  pet_preferences: string;
}

interface Profile {
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  location: string;
  user: User;
  pet: Pet[];
}

const ProfileCard: React.FC<{
  name: string;
  email: string;
  username: string;
  imgUrl: string;
}> = ({ name, email, username, imgUrl }) => (
  <div className="bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
    <div>
      <h2 className="jua text-xl font-bold mb-1">Welcome, {name}!</h2>
      <p className="poppins text-sm text-gray-600">{email}</p>
      <p className="poppins text-sm text-gray-600">{username}</p>
      <Link href="/editprofile-petOwner" className="poppins text-orange-400 text-sm">Edit profile &gt;</Link>
    </div>
    <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-full" />
  </div>
);

const PetCard: React.FC<{
  name: string;
  age: string;
  imgUrl: string;
}> = ({ name, age, imgUrl }) => (
  <div className="poppins bg-orange-50 rounded-lg p-4 w-[280px] flex items-center">
    <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-lg mr-4" />
    <div>
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{age}</p>
      <Link href="/edit-pet" className="text-orange-400 text-sm">Edit pet profile &gt;</Link>
    </div>
  </div>
);

const AddPetButton = () => (
  <button className="bg-orange-300 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">+</button>
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
  const [pets, setPets] = useState<Pet[]>([]);
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
        const response = await axios.get<Profile>(`http://localhost:8000/petowner/${userId}`, config);
        setProfile(response.data);
        setPets(response.data.pet || []);
        setError(null);
      } catch (err: any) {
        setProfile(null);
        setPets([]);
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
    <div className="poppins bg-white h-full pb-20">
      <main className="p-4">
        <h2 className="jua text-2xl font-bold mb-4">Profile</h2>
        <ProfileCard 
          name={profile?.name || "Loading..."} 
          email={profile?.user.email || "Loading..."} 
          username={`@${profile?.user.username}`} 
          imgUrl="/johndoe.png" 
        />
        
        <h2 className="text-2xl font-bold mb-4">My Pets</h2>
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
            {pets.map((pet) => (
              <div key={pet.pet_name} className="flex-shrink-0">
                <PetCard 
                  name={pet.pet_name}
                  age={`${pet.pet_age} Years`}
                  imgUrl="/kimmydog.png" 
                />
              </div>
            ))}
            <div className="flex-shrink-0 flex items-center">
              <AddPetButton />
            </div>
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
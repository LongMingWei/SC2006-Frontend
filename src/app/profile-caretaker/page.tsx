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
 
interface BookingEvent {
  start: string;
  end: string;
  location: string;
  service: string;
  status: string;
  other_user_name: string;
  pet_name: string;
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
    <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-full object-cover w-[60px] h-[60px]" />
  </div>
);

const BookingCard: React.FC<{
  name: string;
  petName: string;
  date: string;
  location: string;
  imgUrl: string;
}> = ({ name, petName, date, location, imgUrl }) => (
  <div className="bg-orange-50 rounded-2xl p-4 mb-4 shadow-md w-48">
    <div className="flex items-center mb-2">
      <Image src={imgUrl} alt={name} width={60} height={60} className="rounded-lg mr-4" />
      <div>
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-sm text-gray-600">for {petName}</p>
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
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>('/johndoe.png');
  const router = useRouter();

  const fetchProfilePicture = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${userId}/profile-picture`,
        {
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` },
          responseType: 'blob'
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfilePicture(imageUrl);
    } catch (err) {
      console.log('Using default profile picture');
      setProfilePicture('/johndoe.png');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('access_token');
      const userId = sessionStorage.getItem('user_id');

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
        // Fetch profile data
        const profileResponse = await axios.get<Profile>(
          `http://localhost:8000/caretaker/${userId}`, 
          config
        );

        if (profileResponse.data) {
          console.log('Profile data received:', profileResponse.data);
          setProfile(profileResponse.data);
        } else {
          throw new Error('No profile data received');
        }

        // Fetch profile picture
        await fetchProfilePicture(userId);

        // Fetch bookings using the history endpoint
        const bookingsResponse = await axios.get<{ events: BookingEvent[] }>(
          `http://localhost:8000/calendar/history/${userId}`,
          config
        );
        
        if (bookingsResponse.data) {
          // Filter for upcoming bookings
          const upcomingBookings = bookingsResponse.data.events.filter(event => 
            event.status === 'confirmed'
          ).sort((a, b) => 
            new Date(a.start).getTime() - new Date(b.start).getTime()
          );

          setBookings(upcomingBookings);
        }

        setError(null);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.detail || 'Failed to load profile');
        if (err.response?.status === 401) {
          sessionStorage.clear();
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Cleanup useEffect for profile picture
  useEffect(() => {
    return () => {
      if (profilePicture && profilePicture !== '/johndoe.png') {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [profilePicture]);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B3D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {profile && profile.user ? (
          <ProfileCard 
            name={profile.name} 
            email={profile.user.email} 
            username={`@${profile.user.username}`} 
            imgUrl={profilePicture} 
          />
        ) : (
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p>Loading profile information...</p>
          </div>
        )}
        
        <h2 className="text-3xl font-bold mb-4">My Bookings</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <BookingCard 
                key={index}
                name={booking.service}
                petName={booking.pet_name}
                date={formatDateTime(booking.start)}
                location={booking.location}
                imgUrl="/kimmydog.png"
              />
            ))
          ) : (
            <p className="text-gray-500">No upcoming bookings</p>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-4">My Services</h2>
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
            {profile?.service?.map((service) => (
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
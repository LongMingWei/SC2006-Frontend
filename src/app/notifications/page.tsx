"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Notification {
  id: number;
  header: string;
  detail: string;
  created_at: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = sessionStorage.getItem('access_token');
      const userId = sessionStorage.getItem('user_id');
      
      if (!token || !userId) {
        router.push('/signout/login');
        return;
      }

      try {
        const response = await axios.get<Notification[]>(`http://localhost:8000/notification/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          sessionStorage.clear();
          router.push('/signout/login');
        }
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [router]);

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
    <div>
      <div className="jua flex items-center justify-center w-full bg-white py-3">
        <h1 className="text-3xl font-bold text-center">Notifications</h1>
      </div>
      <div className="poppins space-y-8">
        {notifications.map(notification => (
          <div key={notification.id} className="w-full cursor-pointer">
            <div className="border-t-4 border-gray-50"></div>
            <div className="flex items-center justify-center p-4">
              <Image
                src="/bell-icon.png"  // Replace with your bell icon image path
                alt="Notification Bell Icon"
                width={50}
                height={50}
                className="object-cover w-[60px] h-[60px]"
              />
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{notification.header}</h2>
                  <p className="text-gray-600 text-sm">{new Date(notification.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-600 text-sm">{notification.detail}</p>
              </div>
            </div>
            <div className="border-t-4 border-orange-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

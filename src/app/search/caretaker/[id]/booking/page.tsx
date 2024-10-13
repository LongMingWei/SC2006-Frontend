'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePathname } from 'next/navigation';

const caretakers = [
  {
    id: 1,
    name: 'Caretaker 1',
    experience: '1 year',
    servicesOffered: 'dog walking',
    availability: 'Monday, 14:00 - 18:00',
    rates: '$30/hr',
    location: 'Jurong East',
    imageUrl: '/dog.png',
    availableTimeslots: ['14:00', '15:00', '16:00', '17:00'],
  },
  {
    id: 2,
    name: 'Caretaker 2',
    experience: '3 years',
    servicesOffered: ['Walking', 'Training'],
    availability: 'Weekdays and Weekends',
    rates: '$20/hour',
    location: 'Location 2',
    imageUrl: '/dog.png',
    availableTimeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
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
    availableTimeslots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  },
];

export default function BookingPage() {
  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/')[3] || '0', 10);
  const caretaker = caretakers.find(c => c.id === caretakerId);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const [selectedPet, setSelectedPet] = useState('');
  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const [hours, minutes] = caretaker.availableTimeslots[0].split(':').map(Number);
    initialDate.setHours(hours, minutes, 0, 0);
    return initialDate;
  });
  const [selectedTimeslots, setSelectedTimeslots] = useState<Date[]>([]);

  const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPet(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedTimeslots(prev => [...prev, date]);
    }
  };

  const handleTimeslotCancel = (index: number) => {
    setSelectedTimeslots(prev => prev.filter((_, i) => i !== index));
  };

  const filterTimes = (time: Date) => {
    const timeString = time.toTimeString().slice(0, 5);
    return caretaker.availableTimeslots.includes(timeString);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 w-full max-w-lg">
        <div className="flex items-center mb-8">
          <Image src={caretaker.imageUrl} alt={caretaker.name} width={180} height={180} className="rounded-full mr-4" />
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{caretaker.name}</h1>
            <Link href={`/search/caretaker/${caretaker.id}`}>
              <div className="text-orange-500 text-xl mb-4">← Back to profile</div>
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <p><strong>Experience:</strong> {caretaker.experience}</p>
          <p><strong>Services offered:</strong> {caretaker.servicesOffered}</p>
          <p><strong>Availability:</strong> {caretaker.availability}</p>
          <p><strong>Rates:</strong> {caretaker.rates}</p>
          <p><strong>Location:</strong> {caretaker.location}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="pet" className="block text-lg font-medium text-gray-700">Choose Pet</label>
          <select
            id="pet"
            name="pet"
            value={selectedPet}
            onChange={handlePetChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a pet</option>
            <option value="pet1">Pet 1</option>
            <option value="pet2">Pet 2</option>
            <option value="pet3">Pet 3</option>
          </select>
        </div>
        <div className="mb-8">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700">Choose Date and Time</label>
          <div className="flex items-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              filterTime={filterTimes}
              dateFormat="Pp"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <button
              onClick={() => handleDateChange(selectedDate)}
              className="ml-16 bg-orange-500 text-white px-4 py-2 rounded"
            >
              Add Timeslot
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700">Selected Timeslots:</h3>
          {selectedTimeslots.map((timeslot, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{timeslot.toLocaleString()}</p>
              <button
                onClick={() => handleTimeslotCancel(index)}
                className="text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={`/search/caretaker/${caretaker.id}/booking/payment`}>
            <div className="bg-orange-500 text-white px-4 py-2 rounded">Book</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
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
    experience: '5 years',
    servicesOffered: [
      {
        name: 'Walking',
        availableTimeslots: ['14:00', '15:00', '16:00', '17:00'],
        rates: '$20/hour',
        reviews: [
          { reviewer: 'John Doe', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Jane Smith', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Grooming',
        availableTimeslots: ['13:00', '14:00', '15:00', '16:00', '17:00'],
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
        availableTimeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        rates: '$30/hour',
        reviews: [
          { reviewer: 'Alice Brown', comment: 'Excellent walking service!', rating: 5 },
          { reviewer: 'Bob Johnson', comment: 'Good with pets.', rating: 4 },
        ],
      },
      {
        name: 'Training',
        availableTimeslots: ['11:00', '12:00', '13:00', '14:00', '15:00'],
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
        availableTimeslots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        rates: '$25/hour',
        reviews: [
          { reviewer: 'Eve Foster', comment: 'Great walking service!', rating: 5 },
          { reviewer: 'Frank Green', comment: 'Very reliable walker.', rating: 4 },
        ],
      },
      {
        name: 'Sitting',
        availableTimeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
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
];

export default function BookingPage() {
  const pathname = usePathname();
  const caretakerId = parseInt(pathname.split('/')[3] || '0', 10);
  const caretaker = caretakers.find(c => c.id === caretakerId);

  if (!caretaker) {
    return <div>Caretaker not found</div>;
  }

  const serviceName = pathname.split('/')[4];
  const service = caretaker.servicesOffered.find(s => s.name.toLowerCase() === serviceName.toLowerCase());

  if (!service) {
    return <div>Service not found</div>;
  }

  const [selectedPet, setSelectedPet] = useState('');
  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const [hours, minutes] = service.availableTimeslots[0].split(':').map(Number);
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
    return service.availableTimeslots.includes(timeString);
  };

  const handleSaveAndProceedToPayment = () => {
    const dataToSave = {
      caretakerName: caretaker.name,
      serviceType: serviceName.charAt(0).toUpperCase() + serviceName.slice(1),
      location: caretaker.location, // Assuming location is a property of caretaker
      petName: selectedPet, // Assuming selectedPet is a state variable
      timeslots: selectedTimeslots,
    };
  
    localStorage.setItem('bookingData', JSON.stringify(dataToSave));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 w-full max-w-lg">
        <div className="flex items-center mb-8">
          <Image src={caretaker.imageUrl} alt={caretaker.name} width={180} height={180} className="rounded-full mr-4" />
          <div className="ml-4">
            <h1 className="jua text-3xl font-bold">{caretaker.name}</h1>
            <Link href={`/search/caretaker/${caretaker.id}/${serviceName}`}>
              <div className="poppins text-orange-500 text-xl mb-4">← Back</div>
            </Link>
          </div>
        </div>
        <div className="mb-4 poppins">
          <p><strong>Experience:</strong> {caretaker.experience}</p>
          <p><strong>Service:</strong> {serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}</p>
          <p><strong>Rates:</strong> {service.rates}</p>
          <p><strong>Location:</strong> {caretaker.location}</p>
        </div>
        <div className="mb-4 poppins">
          <label htmlFor="pet" className="block text-lg font-medium text-gray-700">Choose Pet</label>
          <select
            id="pet"
            name="pet"
            value={selectedPet}
            onChange={handlePetChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a pet</option>
            <option value="Pet 1">Pet 1</option>
            <option value="Pet 2">Pet 2</option>
            <option value="Pet 3">Pet 3</option>
          </select>
        </div>
        <div className="mb-8 poppins">
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
        <div className="mb-8 poppins">
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
          <Link href={`/search/caretaker/${caretaker.id}/${serviceName}/booking/payment`} onClick={handleSaveAndProceedToPayment}>
            <div className="poppins bg-orange-500 text-white px-4 py-2 rounded">Book Now</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

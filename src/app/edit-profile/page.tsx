import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const role = "caretaker"
// const role = "petowner"

const EditProfile: React.FC = () => {
  return (

      <main className="p-6">
        <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-2">
            <Image
              src="/johndoe.png"
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-2 border-orange-500"
            />
          </div>
          <Link href="/edit-profile-picture" className="text-blue-500">
            Edit profile picture
          </Link>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue="John Smith"
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 mb-2">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="dob"
              name="dob"
              defaultValue="02/12/99"
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 mb-2">
              Gender<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              defaultValue="Male"
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>

          {role === "caretaker" ? <div className="mb-4">
            <label htmlFor="workExp" className="block text-gray-700 mb-2">
              Work Experience<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="workExp"
              name="workExp"
              defaultValue="2 years pet grooming"
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div> : null}
          <div className="flex justify-center w-full mt-3">
            <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded mt-4">
              Save Changes
            </button>
          </div>
        </form>
      </main>
  );
};

export default EditProfile;
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Gender = {
    female: "female",
    male: "male",
    prefer_not_to_say: "prefer not to say"
}

const CaretakerProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        experience: '',
    });
    const router = useRouter();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const requiredFieldsFilled =
            formData.name.trim() !== '' &&
            formData.dob.trim() !== '' &&
            formData.gender.trim() !== '' &&
            formData.experience.trim() !== '';
        setIsFormValid(requiredFieldsFilled);
    }, [formData]);

    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        if (isFormValid) {
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const userId = sessionStorage.getItem('user_id');

                const response = await fetch('http://localhost:8000/caretaker', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        dob: formData.dob,
                        gender: formData.gender,
                        work_exp: parseFloat(formData.experience),
                        user_id: userId,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create caretaker profile');
                }

                alert('Profile saved successfully!');
            } catch (error) {
                alert((error as Error).message);
            }
        } else {
            alert('Please fill out all required fields.');
        }
    };

    return (
        <div className="flex flex-col items-center p-5 bg-white min-h-screen">
            {/* Back Arrow */}
            <div className="absolute top-4 left-4">
                <Link href="/homepage">
                    <Image src="/back_arrow.png" alt="Back to homepage" width={24} height={24} />
                </Link>
            </div>
            <h2 className="jua text-4xl font-bold text-black text-center my-4">Create Profile</h2>
            <h3 className="jua text-2xl font-bold text-orange-500 text-center mb-5">Caretaker</h3>

            <div className="poppins w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Name*</label>
                    <input
                        className="w-full p-2 border border-orange-500 rounded"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Date of Birth*</label>
                    <input
                        type="date"
                        className="w-full p-2 border border-orange-500 rounded"
                        placeholder="YYYY-MM-DD"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Gender</label>
                        <select
                            className="w-full p-2 border border-orange-500 rounded"
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            {Object.entries(Gender).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Work Experience*</label>
                    <input
                        type="number"
                        min = "0"
                        step = "1"
                        className="w-full p-2 border border-orange-500 rounded"
                        placeholder="Years of experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                </div>
            </div>

            <button
                className="poppins bg-orange-500 text-white py-2 px-4 rounded mt-4"
                onClick={handleSubmit}
            >
                Save
            </button>

            <Image src="/line1.png" alt="White Puppy" width={160} height={180} className="my-5" />

            <div className="flex flex-col items-center mt-10">
                <Link href="/signout/signup/createProfile/caretakerProfile/addService" className="flex items-center justify-center w-16 h-16 rounded-full">
                    <Image src="/addIcon.png" alt="White Puppy" width={160} height={160} className="my-5" />
                </Link>
                <p className="poppins text-lg text-gray-500 mt-2">Start adding your services!</p>
            </div>
        </div>
    );
};

export default CaretakerProfile;
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const CaretakerProfileNew = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         dob: '',
//         gender: '',
//         experience: '',
//     });
//     const router = useRouter();

//     const [isFormValid, setIsFormValid] = useState(false);
//     useEffect(() => {
//         const requiredFieldsFilled =
//             formData.name.trim() !== '' &&
//             formData.dob.trim() !== '' &&
//             formData.gender.trim() !== '' &&
//             formData.experience.trim() !== '';
//         setIsFormValid(requiredFieldsFilled);
//     }, [formData]);

//     const handleInputChange = (key: string, value: string) => {
//         setFormData({ ...formData, [key]: value });
//     };

//     const handleSubmit = () => {
//         if (isFormValid) {
//             // Perform form submission logic here
//             console.log(formData);
//             alert('Profile saved successfully!');
//             router.push('/homepage');

//         } else {
//             alert('Please fill out all required fields.');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-5 bg-white min-h-screen">
//             {/* Title */}
//             <h2 className="jua text-4xl font-bold text-black text-center my-4">Create Profile</h2>
//             <h3 className="jua text-2xl font-bold text-orange-500 text-center mb-5">Caretaker</h3>

//             {/* Form fields */}
//             <div className="poppins w-full max-w-md">
//                 {/* Name */}
//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Name*</label>
//                     <input
//                         className="w-full p-2 border border-orange-500 rounded"
//                         placeholder="Your name"
//                         value={formData.name}
//                         onChange={(e) => handleInputChange('name', e.target.value)}
//                     />
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Date of Birth*</label>
//                     <input
//                         className="w-full p-2 border border-orange-500 rounded"
//                         placeholder="DD/MM/YY"
//                         value={formData.dob}
//                         onChange={(e) => handleInputChange('dob', e.target.value)}
//                     />
//                 </div>

//                 {/* Gender */}
//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Gender*</label>
//                     <input
//                         className="w-full p-2 border border-orange-500 rounded"
//                         placeholder="Your gender"
//                         value={formData.gender}
//                         onChange={(e) => handleInputChange('gender', e.target.value)}
//                     />
//                 </div>

//                 {/* Work Experience */}
//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Work Experience*</label>
//                     <input
//                         className="w-full p-2 border border-orange-500 rounded"
//                         placeholder="6 months, 1 year, etc."
//                         value={formData.experience}
//                         onChange={(e) => handleInputChange('experience', e.target.value)}
//                     />
//                 </div>
//             </div>

//             {/* Save Button */}
//                 <button
//                     className="poppins bg-orange-500 text-white py-2 px-4 rounded mt-4"
//                     onClick={handleSubmit}
//                 >
//                     Save
//                 </button>

//             <Image src="/line1.png" alt="White Puppy" width={160} height={180} className="my-5" />

//             {/* Add Service Section */}
//             <div className="flex flex-col items-center mt-10">
//                 <Link href="/signout/signup/createProfile/caretakerProfile/addService" className="flex items-center justify-center w-16 h-16 rounded-full">                    
//                 <Image src="/addIcon.png" alt="White Puppy" width={160} height={160} className="my-5" />
//                 </Link>
//                 <p className="poppins text-lg text-gray-500 mt-2">Start adding your services!</p>
//             </div>
//         </div>
//     );
// };

// export default CaretakerProfileNew;

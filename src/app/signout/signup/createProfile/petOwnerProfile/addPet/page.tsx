'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AddServiceProfile = () => {
    const [formData, setFormData] = useState({
        petName: '',
        species: '',
        breed: '',
        age: '',
        healthConditions: '',
        preferences: '',
    });

    const [image, setImage] = useState<string | null>(null); // State to store the selected image
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    useEffect(() => {
        const requiredFieldsFilled =
            formData.petName !== '' &&
            formData.species !== '' &&
            formData.breed !== '' &&
            formData.age !== '' &&
            formData.healthConditions !== '';
        setIsFormValid(requiredFieldsFilled);
    }, [formData]);

    // Handle form submission
    const handleSubmit = () => {
        if (isFormValid) {
            // Perform form submission logic here
            console.log(formData);
            alert("Success: Services saved successfully!");
        } else {
            alert("Error: Please fill out all required fields.");
        }
    };

    const pickImage = async () => {
        // Image picking logic for web
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event: any) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <div className="flex flex-col items-center p-5 bg-white min-h-screen">
            <div className="w-full max-w-md">
                {/* Title and pet image */}
                <h2 className="jua text-3xl font-bold text-center mt-4">Create Pet Profile</h2>
                <h3 className="jua text-2xl font-bold text-center text-orange-500 mt-2">Pet</h3>

                {/* Image Upload */}
                <div className="flex flex-col items-center mt-4">
                    {image ? (
                        <Image src={image} alt="Pet" width={100} height={100} className="w-36 h-36 object-cover rounded-full border border-orange-500 mt-2" />
                    ) : (
                        <Image src="/brownpuppy.png" alt="Pet" width={100} height={100} className="w-36 h-36 object-cover rounded-full border border-orange-500 mt-2" />
                    )}
                    <button onClick={pickImage} className="poppins text-blue-500 underline mt-4">Add profile picture</button>
                </div>

                {/* Form fields */}
                <div className="poppins mt-6">
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Pet Name*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Your pet's name"
                            value={formData.petName}
                            onChange={(e) => handleInputChange('petName', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Species*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Dog, cat, etc."
                            value={formData.species}
                            onChange={(e) => handleInputChange('species', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Breed*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Chihuahua, gold retriever, etc."
                            value={formData.breed}
                            onChange={(e) => handleInputChange('breed', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Age*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="6 months, 1 year, etc."
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Health Conditions*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Healthy, breathing difficulty, etc."
                            value={formData.healthConditions}
                            onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Preferences</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="If any"
                            value={formData.preferences}
                            onChange={(e) => handleInputChange('preferences', e.target.value)}
                        />
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSubmit}
                    className="poppins w-full bg-orange-500 text-white p-3 rounded mt-4"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddServiceProfile;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AddServiceProfile = () => {
    const [formData, setFormData] = useState({
        services: '',
        rates: '',
        availability: '',
        location: '',
    });

    const [image, setImage] = useState<string | null>(null); // State to store the selected image
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    useEffect(() => {
        const requiredFieldsFilled =
            formData.services !== '' &&
            formData.rates !== '' &&
            formData.availability !== '' &&
            formData.location !== '';

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
                <h2 className="jua text-3xl font-bold text-center mt-4">Create a Service</h2>
                <h3 className="jua text-2xl font-bold text-center text-orange-500 mt-2">Services</h3>

                {/* Image Upload */}
                <div className="flex flex-col items-center mt-4">
                    {image ? (
                        <img src={image} alt="Service" className="w-72 h-36 rounded-lg border border-orange-500 mt-2" />
                    ) : (
                        <Image src="/doggrooming.png" alt="Service" width={300} height={150} className="rounded-lg border border-orange-500 mt-2" />
                    )}
                    <button onClick={pickImage} className="poppins text-blue-500 underline mt-4">Add service picture</button>
                </div>

                {/* Form fields */}
                <div className="poppins mt-6">
                    {/* Services */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Type of Service*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Pet walking, Grooming, etc."
                            value={formData.services}
                            onChange={(e) => handleInputChange('services', e.target.value)}
                        />
                    </div>

                    {/* Rates */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Service Rates*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="$50/hr, etc."
                            value={formData.rates}
                            onChange={(e) => handleInputChange('rates', e.target.value)}
                        />
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Availability*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Saturday afternoons, etc."
                            value={formData.availability}
                            onChange={(e) => handleInputChange('availability', e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Location*</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-orange-500 rounded"
                            placeholder="Your location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
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

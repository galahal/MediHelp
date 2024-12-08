import React, { useState, useEffect } from 'react';

const RequestMedicine = () => {
    const [formData, setFormData] = useState({
        medicineName: '',
        genericName: '',
        strength: '',
        quantity: '',
        manufacturer: '',
        area: '', // New field for area selection
    });

    const [areas, setAreas] = useState([]); // To store fetched areas + default options
    const [showPrompt, setShowPrompt] = useState(false);

    // Default area options
    const defaultAreas = [
        "Mohammadpur",
        "Matuail",
        "Saydabad",
        "Shyampur",
        "Mirpur (Gram)",
        "Uttara (Gram)",
        "Badda",
        "Mohakhali",
        "Shonir Akhra"
    ];

    // Fetch areas on component mount
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pharmacies/areas');
                if (response.ok) {
                    const data = await response.json();
                    setAreas([...defaultAreas, ...data]); // Merge default and fetched areas
                } else {
                    console.error('Failed to fetch areas.');
                    setAreas(defaultAreas); // Fallback to default areas if API fails
                }
            } catch (error) {
                console.error('Error fetching areas:', error);
                setAreas(defaultAreas); // Fallback to default areas if an error occurs
            }
        };

        fetchAreas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // Show success prompt
        setShowPrompt(true);

        // Hide the prompt after 3 seconds
        setTimeout(() => setShowPrompt(false), 3000);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-100 p-4 flex justify-between items-center">
                <div className="text-xl font-bold">MediHelp</div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="text-gray-800 font-semibold hover:text-blue-600">Home</a></li>
                        <li><a href="/medicine" className="text-gray-800 font-semibold hover:text-blue-600">Medicine</a></li>
                        <li><a href="/dashboard" className="text-gray-800 font-semibold hover:text-blue-600">Dashboard</a></li>
                        <li><a href="/profile" className="text-gray-800 font-semibold hover:text-blue-600">User</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center mt-8">
                <h1 className="text-3xl font-bold mb-6">Request Medicine</h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-6 shadow-md rounded-md"
                >
                    <input
                        type="text"
                        name="medicineName"
                        placeholder="Medicine Name"
                        value={formData.medicineName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        name="genericName"
                        placeholder="Generic Name"
                        value={formData.genericName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        name="strength"
                        placeholder="Strength/Concentration"
                        value={formData.strength}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity Required"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        name="manufacturer"
                        placeholder="Preferred Manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    {/* Area Dropdown */}
                    <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select Area</option>
                        {areas.map((area, index) => (
                            <option key={index} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>

                {/* Success Prompt */}
                {showPrompt && (
                    <div className="mt-6 bg-black text-white px-4 py-2 rounded-md">
                        Your request has been sent successfully
                    </div>
                )}
            </main>
        </div>
    );
};

export default RequestMedicine;

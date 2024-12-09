// import React, { useState, useEffect } from "react";

// const ManagePharmacy = () => {
//   const [pharmacy, setPharmacy] = useState([]);
//   const [selectedPharmacy, setSelectedPharmacy] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showPrompt, setShowPrompt] = useState(false);

//   useEffect(() => {
//     // Fetch pharmacies from the database
//     const fetchPharmacy = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/pharmacy");
//         const data = await response.json();
//         setPharmacy(data); // Assuming `data` is an array of pharmacy objects
//       } catch (error) {
//         console.error("Error fetching pharmacies:", error);
//       }
//     };

//     fetchPharmacy();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCheckboxChange = (id) => {
//     if (selectedPharmacy.includes(id)) {
//       setSelectedPharmacy(selectedPharmacy.filter((pharmacyId) => pharmacyId !== id));
//     } else {
//       setSelectedPharmacy([...selectedPharmacy, id]);
//     }
//   };

//   const handleDeleteAll = () => {
//     setShowPrompt(true); // Show the confirmation prompt
//   };

//   const confirmDelete = async () => {
//     try {
//       await fetch("http://localhost:5000/api/pharmacy", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: selectedPharmacy }),
//       });
//       setPharmacy(pharmacy.filter((pharmacy) => !selectedPharmacy.includes(pharmacy._id)));
//       setSelectedPharmacy([]);
//       setShowPrompt(false);
//     } catch (error) {
//       console.error("Error deleting pharmacies:", error);
//     }
//   };

//   const cancelDelete = () => {
//     setShowPrompt(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Search Bar */}
//       <div className="flex justify-between items-center mb-8">
//         <input
//           type="text"
//           placeholder="Search for a pharmacy..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border border-gray-300 rounded-md px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
//         />
//       </div>

//       {/* Pharmacies Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {pharmacy
//           .filter((pharmacy) =>
//             pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((pharmacy) => (
//             <div
//               key={pharmacy._id}
//               className="relative bg-white border border-gray-200 shadow-md rounded-lg p-4"
//             >
//               {/* Pharmacy Info */}
//               <h2 className="text-lg font-semibold mb-1 text-gray-800">{pharmacy.name}</h2>
//               <p className="text-sm text-gray-600">{pharmacy.address}</p>
              
//               {/* Checkbox */}
//               <div className="absolute bottom-4 right-4">
//                 <input
//                   type="checkbox"
//                   checked={selectedPharmacy.includes(pharmacy._id)}
//                   onChange={() => handleCheckboxChange(pharmacy._id)}
//                   className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
//                 />
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* Delete All Button */}
//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={handleDeleteAll}
//           className="bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
//         >
//           Delete All
//         </button>
//       </div>

//       {/* Confirmation Prompt */}
//       {showPrompt && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
//             <p className="mb-4 text-lg font-semibold">Are you sure?</p>
//             <div className="flex justify-around gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagePharmacy;
import React, { useState, useEffect } from "react";

const ManagePharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]); // All pharmacies fetched from the API
  const [filteredPharmacies, setFilteredPharmacies] = useState([]); // Pharmacies filtered by the search query
  const [searchQuery, setSearchQuery] = useState(""); // User's search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch pharmacies from the backend
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pharmacy"); // Corrected API endpoint
        const data = await response.json();

        if (data.status === "SUCCESS") {
          setPharmacies(data.allPharmacies);
          setFilteredPharmacies(data.allPharmacies);
        } else {
          setError("Failed to fetch pharmacies. Please try again.");
        }
      } catch (error) {
        setError("Error fetching pharmacies: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = pharmacies.filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(query)
    );
    setFilteredPharmacies(filtered);
  };

  if (loading) {
    return <div>Loading pharmacies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Pharmacies</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a pharmacy..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Pharmacies List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPharmacies.length > 0 ? (
          filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold text-gray-800">{pharmacy.name}</h2>
              <p className="text-sm text-gray-600">Address: {pharmacy.address}</p>
              <p className="text-sm text-gray-600">Contact: {pharmacy.contact}</p>
              <p className="text-sm text-gray-600">
                Emergency: {pharmacy.isEmergency ? "Yes" : "No"}
              </p>
              {pharmacy.pharmacist && (
                <p className="text-sm text-gray-600">
                  Pharmacist: {pharmacy.pharmacist.name} ({pharmacy.pharmacist.email})
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No pharmacies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManagePharmacy;

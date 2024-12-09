// // import React, { useState, useEffect } from "react";

// // const ManagePharmacy = () => {
// //   const [pharmacies, setPharmacies] = useState([]);
// //   const [selectedPharmacies, setSelectedPharmacies] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showPrompt, setShowPrompt] = useState(false);

// //   useEffect(() => {
// //     // Fetch pharmacies from the database
// //     const fetchPharmacies = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5000/api/pharmacies");
// //         const data = await response.json();
// //         setPharmacies(data); // Assuming `data` is an array of pharmacy objects
// //       } catch (error) {
// //         console.error("Error fetching pharmacies:", error);
// //       }
// //     };

// //     fetchPharmacies();
// //   }, []);

// //   const handleSearch = (e) => {
// //     setSearchQuery(e.target.value);
// //   };

// //   const handleCheckboxChange = (id) => {
// //     if (selectedPharmacies.includes(id)) {
// //       setSelectedPharmacies(selectedPharmacies.filter((pharmacyId) => pharmacyId !== id));
// //     } else {
// //       setSelectedPharmacies([...selectedPharmacies, id]);
// //     }
// //   };

// //   const handleDeleteAll = () => {
// //     setShowPrompt(true); // Show the confirmation prompt
// //   };

// //   const confirmDelete = async () => {
// //     try {
// //       await fetch("http://localhost:5000/api/pharmacies", {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ ids: selectedPharmacies }),
// //       });
// //       setPharmacies(pharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
// //       setSelectedPharmacies([]);
// //       setShowPrompt(false);
// //     } catch (error) {
// //       console.error("Error deleting pharmacies:", error);
// //     }
// //   };

// //   const cancelDelete = () => {
// //     setShowPrompt(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       {/* Search Bar */}
// //       <div className="flex justify-between items-center mb-8">
// //         <input
// //           type="text"
// //           placeholder="Search for a pharmacy..."
// //           value={searchQuery}
// //           onChange={handleSearch}
// //           className="border border-gray-300 rounded-md px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
// //         />
// //       </div>

// //       {/* Pharmacies Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {pharmacies
// //           .filter((pharmacy) =>
// //             pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
// //           )
// //           .map((pharmacy) => (
// //             <div
// //               key={pharmacy._id}
// //               className="relative bg-white border border-gray-200 shadow-md rounded-lg p-4"
// //             >
// //               {/* Pharmacy Info */}
// //               <h2 className="text-lg font-semibold mb-1 text-gray-800">{pharmacy.name}</h2>
// //               <p className="text-sm text-gray-600">{pharmacy.address}</p>
              
// //               {/* Checkbox */}
// //               <div className="absolute bottom-4 right-4">
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedPharmacies.includes(pharmacy._id)}
// //                   onChange={() => handleCheckboxChange(pharmacy._id)}
// //                   className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
// //                 />
// //               </div>
// //             </div>
// //           ))}
// //       </div>

// //       {/* Delete All Button */}
// //       <div className="mt-8 flex justify-end">
// //         <button
// //           onClick={handleDeleteAll}
// //           className="bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
// //         >
// //           Delete All
// //         </button>
// //       </div>

// //       {/* Confirmation Prompt */}
// //       {showPrompt && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //           <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
// //             <p className="mb-4 text-lg font-semibold">Are you sure?</p>
// //             <div className="flex justify-around gap-4">
// //               <button
// //                 onClick={confirmDelete}
// //                 className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
// //               >
// //                 Confirm
// //               </button>
// //               <button
// //                 onClick={cancelDelete}
// //                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManagePharmacy;



// import React, { useState, useEffect } from "react";

// const ManagePharmacy = () => {
//   const [pharmacies, setPharmacies] = useState([]);
//   const [selectedPharmacies, setSelectedPharmacies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showPrompt, setShowPrompt] = useState(false);

//   useEffect(() => {
//     const fetchPharmacies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/pharmacy");
//         const data = await response.json();
//         setPharmacies(data);
//       } catch (error) {
//         console.error("Error fetching pharmacies:", error);
//       }
//     };

//     fetchPharmacies();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCheckboxChange = (id) => {
//     if (selectedPharmacies.includes(id)) {
//       setSelectedPharmacies(selectedPharmacies.filter((pharmacyId) => pharmacyId !== id));
//     } else {
//       setSelectedPharmacies([...selectedPharmacies, id]);
//     }
//   };

//   const handleDeleteAll = () => {
//     setShowPrompt(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await fetch("http://localhost:5000/api/pharmacy", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: selectedPharmacies }),
//       });
//       setPharmacies(pharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
//       setSelectedPharmacies([]);
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
//         {pharmacies
//           .filter((pharmacy) =>
//             pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((pharmacy) => (
//             <div
//               key={pharmacy._id}
//               className="relative bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col"
//             >
//               {/* Pharmacy Info */}
//               <h2 className="text-lg font-semibold mb-1 text-gray-800">{pharmacy.name}</h2>
//               <p className="text-sm text-gray-600 mb-4">{pharmacy.address}</p>
//               {/* Checkbox */}
//               <div className="mt-auto">
//                 <input
//                   type="checkbox"
//                   checked={selectedPharmacies.includes(pharmacy._id)}
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


// import React, { useState, useEffect } from "react";

// const ManagePharmacy = () => {
//   const [pharmacies, setPharmacies] = useState([]); // All pharmacies fetched from the API
//   const [filteredPharmacies, setFilteredPharmacies] = useState([]); // Pharmacies filtered by the search query
//   const [searchQuery, setSearchQuery] = useState(""); // User's search input

//   // Fetch pharmacies from the backend
//   useEffect(() => {
//     const fetchPharmacies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/pharmacy"); // Replace with your API endpoint
//         const data = await response.json();

//         if (data.status === "SUCCESS") {
//           setPharmacies(data.allPharmacies);
//           setFilteredPharmacies(data.allPharmacies);
//         } else {
//           console.error("Failed to fetch pharmacies:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching pharmacies:", error);
//       }
//     };

//     fetchPharmacies();
//   }, []);

//   // Handle search input changes
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = pharmacies.filter((pharmacy) =>
//       pharmacy.name.toLowerCase().includes(query)
//     );
//     setFilteredPharmacies(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Pharmacies</h1>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search for a pharmacy..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Pharmacies List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPharmacies.length > 0 ? (
//           filteredPharmacies.map((pharmacy) => (
//             <div
//               key={pharmacy._id}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
//             >
//               <h2 className="text-lg font-bold text-gray-800">{pharmacy.name}</h2>
//               <p className="text-sm text-gray-600">Address: {pharmacy.address}</p>
//               <p className="text-sm text-gray-600">Contact: {pharmacy.contact}</p>
//               <p className="text-sm text-gray-600">
//                 Emergency: {pharmacy.isEmergency ? "Yes" : "No"}
//               </p>
//               {pharmacy.pharmacist && (
//                 <p className="text-sm text-gray-600">
//                   Pharmacist: {pharmacy.pharmacist.name} ({pharmacy.pharmacist.email})
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             No pharmacies found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagePharmacy;

// import React, { useState, useEffect } from "react";

// const ManagePharmacy = () => {
//   const [pharmacies, setPharmacies] = useState([]); // All pharmacies fetched from the API
//   const [filteredPharmacies, setFilteredPharmacies] = useState([]); // Pharmacies filtered by the search query
//   const [selectedPharmacies, setSelectedPharmacies] = useState([]); // Pharmacies selected for deletion
//   const [searchQuery, setSearchQuery] = useState(""); // User's search input
//   const [showPrompt, setShowPrompt] = useState(false); // Show confirmation prompt
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch pharmacies from the backend
//   useEffect(() => {
//     const fetchPharmacies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/pharmacy"); // Replace with your API endpoint
//         const data = await response.json();

//         if (data.status === "SUCCESS") {
//           setPharmacies(data.allPharmacies);
//           setFilteredPharmacies(data.allPharmacies);
//         } else {
//           setError("Failed to fetch pharmacies.");
//         }
//       } catch (error) {
//         setError("Error fetching pharmacies: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPharmacies();
//   }, []);

//   // Handle search input changes
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = pharmacies.filter((pharmacy) =>
//       pharmacy.name.toLowerCase().includes(query)
//     );
//     setFilteredPharmacies(filtered);
//   };

//   // Handle checkbox toggle
//   const handleCheckboxChange = (id) => {
//     if (selectedPharmacies.includes(id)) {
//       setSelectedPharmacies(selectedPharmacies.filter((pharmacyId) => pharmacyId !== id));
//     } else {
//       setSelectedPharmacies([...selectedPharmacies, id]);
//     }
//   };

//   // Handle "Delete All" button
//   const handleDeleteAll = () => {
//     setShowPrompt(true);
//   };

//   // Confirm deletion
//   const confirmDelete = async () => {
//     try {
//       await fetch("http://localhost:5000/api/pharmacy", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: selectedPharmacies }),
//       });
//       setPharmacies(pharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
//       setFilteredPharmacies(filteredPharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
//       setSelectedPharmacies([]);
//       setShowPrompt(false);
//     } catch (error) {
//       console.error("Error deleting pharmacies:", error);
//     }
//   };

//   // Cancel deletion
//   const cancelDelete = () => {
//     setShowPrompt(false);
//   };

//   if (loading) {
//     return <div>Loading pharmacies...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Pharmacies</h1>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search for a pharmacy..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Pharmacies Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPharmacies.length > 0 ? (
//           filteredPharmacies.map((pharmacy) => (
//             <div
//               key={pharmacy._id}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col"
//             >
//               <h2 className="text-lg font-bold text-gray-800">{pharmacy.name}</h2>
//               <p className="text-sm text-gray-600">Address: {pharmacy.address}</p>
//               <p className="text-sm text-gray-600">Contact: {pharmacy.contact}</p>
//               <p className="text-sm text-gray-600">
//                 Emergency: {pharmacy.isEmergency ? "Yes" : "No"}
//               </p>
//               {pharmacy.pharmacist && (
//                 <p className="text-sm text-gray-600">
//                   Pharmacist: {pharmacy.pharmacist.name} ({pharmacy.pharmacist.email})
//                 </p>
//               )}
//               {/* Checkbox */}
//               <div className="mt-auto">
//                 <input
//                   type="checkbox"
//                   checked={selectedPharmacies.includes(pharmacy._id)}
//                   onChange={() => handleCheckboxChange(pharmacy._id)}
//                   className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No pharmacies found.</p>
//         )}
//       </div>

//       {/* Delete All Button */}
//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={handleDeleteAll}
//           className="bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
//         >
//           Delete Selected
//         </button>
//       </div>

//       {/* Confirmation Prompt */}
//       {showPrompt && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <p className="mb-4 text-lg font-semibold">Are you sure you want to delete the selected pharmacies?</p>
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
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [selectedPharmacies, setSelectedPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pharmacy");
        const data = await response.json();

        if (data.status === "SUCCESS") {
          setPharmacies(data.allPharmacies);
          setFilteredPharmacies(data.allPharmacies);
        } else {
          setError("Failed to fetch pharmacies.");
        }
      } catch (error) {
        setError("Error fetching pharmacies: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = pharmacies.filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(query)
    );
    setFilteredPharmacies(filtered);
  };

  const handleCheckboxChange = (id) => {
    if (selectedPharmacies.includes(id)) {
      setSelectedPharmacies(selectedPharmacies.filter((pharmacyId) => pharmacyId !== id));
    } else {
      setSelectedPharmacies([...selectedPharmacies, id]);
    }
  };

  const handleDeleteAll = () => {
    setShowPrompt(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch("http://localhost:5000/api/pharmacy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedPharmacies }),
      });
      setPharmacies(pharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
      setFilteredPharmacies(filteredPharmacies.filter((pharmacy) => !selectedPharmacies.includes(pharmacy._id)));
      setSelectedPharmacies([]);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error deleting pharmacies:", error);
    }
  };

  const cancelDelete = () => {
    setShowPrompt(false);
  };

  const handleIndividualDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/pharmacy/${id}`, {
        method: "DELETE",
      });
      setPharmacies(pharmacies.filter((pharmacy) => pharmacy._id !== id));
      setFilteredPharmacies(filteredPharmacies.filter((pharmacy) => pharmacy._id !== id));
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
    }
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

      {/* Pharmacies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPharmacies.length > 0 ? (
          filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col relative"
            >
              {/* Pharmacy Details */}
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

              {/* Checkbox (Right-Aligned) */}
              <div className="absolute top-4 right-4">
                <input
                  type="checkbox"
                  checked={selectedPharmacies.includes(pharmacy._id)}
                  onChange={() => handleCheckboxChange(pharmacy._id)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleIndividualDelete(pharmacy._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No pharmacies found.</p>
        )}
      </div>

      {/* Delete All Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
        >
          Delete All
        </button>
      </div>

      {/* Confirmation Prompt */}
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">Are you sure you want to delete the selected pharmacies?</p>
            <div className="flex justify-around gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePharmacy;


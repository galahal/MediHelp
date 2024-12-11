// import React, { useState, useEffect } from "react";
// import { FaEdit } from "react-icons/fa";

// const ManageMedicine = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [filteredMedicines, setFilteredMedicines] = useState([]);
//   const [selectedMedicines, setSelectedMedicines] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/medicine");
//         const data = await response.json();

//         if (data.status === "SUCCESS") {
//           setMedicines(data.allMedicines);
//           setFilteredMedicines(data.allMedicines);
//         } else {
//           setError("Failed to fetch medicines.");
//         }
//       } catch (error) {
//         setError("Error fetching medicines: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = medicines.filter((medicine) =>
//       medicine.name.toLowerCase().includes(query)
//     );
//     setFilteredMedicines(filtered);
//   };

//   const handleCheckboxChange = (id) => {
//     if (selectedMedicines.includes(id)) {
//       setSelectedMedicines(selectedMedicines.filter((medicineId) => medicineId !== id));
//     } else {
//       setSelectedMedicines([...selectedMedicines, id]);
//     }
//   };

//   const handleDeleteAll = () => {
//     setShowPrompt(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await fetch("http://localhost:5000/api/medicine", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: selectedMedicines }),
//       });
//       setMedicines(medicines.filter((medicine) => !selectedMedicines.includes(medicine._id)));
//       setFilteredMedicines(filteredMedicines.filter((medicine) => !selectedMedicines.includes(medicine._id)));
//       setSelectedMedicines([]);
//       setShowPrompt(false);
//     } catch (error) {
//       console.error("Error deleting medicines:", error);
//     }
//   };

//   const cancelDelete = () => {
//     setShowPrompt(false);
//   };

//   const handleIndividualDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/api/medicine/${id}`, {
//         method: "DELETE",
//       });
//       setMedicines(medicines.filter((medicine) => medicine._id !== id));
//       setFilteredMedicines(filteredMedicines.filter((medicine) => medicine._id !== id));
//     } catch (error) {
//       console.error("Error deleting medicine:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading medicines...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Medicines</h1>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search for a medicine..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Medicines Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredMedicines.length > 0 ? (
//           filteredMedicines.map((medicine) => (
//             <div
//               key={medicine._id}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col relative"
//             >
//               {/* Medicine Thumbnail */}
//               <img
//                 src={`/medicines/${medicine.imageUrl || "placeholder-image.jpg"}`} // Construct path to image
//                 alt={medicine.name}
//                 className="w-full h-32 object-contain rounded-lg mb-4"
//               />

//               {/* Medicine Details */}
//               <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
//               <p className="text-sm text-gray-600">Category: {medicine.category}</p>
//               <p className="text-sm text-gray-600">Generics: {medicine.generics || "N/A"}</p>
//               <p className="text-sm text-gray-600">Price: ${medicine.price}</p>
//               <p className="text-sm text-gray-600">Stock: {medicine.stock} units</p>

//               {/* Edit Icon */}
//               <button className="absolute top-4 right-16 text-blue-500 hover:text-blue-700">
//                 <FaEdit size={20} />
//               </button>

//               {/* Checkbox (Right-Aligned) */}
//               <div className="absolute top-4 right-4">
//                 <input
//                   type="checkbox"
//                   checked={selectedMedicines.includes(medicine._id)}
//                   onChange={() => handleCheckboxChange(medicine._id)}
//                   className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
//                 />
//               </div>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleIndividualDelete(medicine._id)}
//                 className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No medicines found.</p>
//         )}
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
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <p className="mb-4 text-lg font-semibold">Are you sure you want to delete the selected medicines?</p>
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

// export default ManageMedicine;

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

const ManageMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    generics: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicine");
        const data = await response.json();

        if (data.status === "SUCCESS") {
          setMedicines(data.allMedicines);
          setFilteredMedicines(data.allMedicines);
        } else {
          setError("Failed to fetch medicines.");
        }
      } catch (error) {
        setError("Error fetching medicines: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query)
    );
    setFilteredMedicines(filtered);
  };

  const handleCheckboxChange = (id) => {
    if (selectedMedicines.includes(id)) {
      setSelectedMedicines(selectedMedicines.filter((medicineId) => medicineId !== id));
    } else {
      setSelectedMedicines([...selectedMedicines, id]);
    }
  };

  const handleDeleteAll = () => {
    setShowPrompt(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch("http://localhost:5000/api/medicine", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedMedicines }),
      });
      setMedicines(medicines.filter((medicine) => !selectedMedicines.includes(medicine._id)));
      setFilteredMedicines(filteredMedicines.filter((medicine) => !selectedMedicines.includes(medicine._id)));
      setSelectedMedicines([]);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error deleting medicines:", error);
    }
  };

  const cancelDelete = () => {
    setShowPrompt(false);
  };

  const handleIndividualDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/medicine/${id}`, {
        method: "DELETE",
      });
      setMedicines(medicines.filter((medicine) => medicine._id !== id));
      setFilteredMedicines(filteredMedicines.filter((medicine) => medicine._id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine._id);
    setEditForm({
      name: medicine.name,
      category: medicine.category,
      generics: medicine.generics,
      price: medicine.price,
      stock: medicine.stock,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/${editingMedicine}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      const data = await response.json();

      if (data.status === "SUCCESS") {
        setMedicines(
          medicines.map((medicine) =>
            medicine._id === editingMedicine ? data.updatedMedicine : medicine
          )
        );
        setFilteredMedicines(
          filteredMedicines.map((medicine) =>
            medicine._id === editingMedicine ? data.updatedMedicine : medicine
          )
        );
        setEditingMedicine(null);
      } else {
        console.error("Failed to update medicine.");
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  if (loading) {
    return <div>Loading medicines...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Medicines</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col relative"
            >
              {editingMedicine === medicine._id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Medicine Name"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    name="generics"
                    value={editForm.generics}
                    onChange={handleEditChange}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Generics"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Stock"
                  />
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingMedicine(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={`/medicines/${medicine.imageUrl || "placeholder-image.jpg"}`}
                    alt={medicine.name}
                    className="w-full h-32 object-contain rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
                  <p className="text-sm text-gray-600">Category: {medicine.category}</p>
                  <p className="text-sm text-gray-600">Generics: {medicine.generics || "N/A"}</p>
                  <p className="text-sm text-gray-600">Price: BDT{medicine.price}</p>
                  <p className="text-sm text-gray-600">Stock: {medicine.stock} units</p>
                  <button
                    onClick={() => handleEditClick(medicine)}
                    className="absolute top-4 right-16 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleIndividualDelete(medicine._id)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
                  >
                    Delete
                  </button>
                  <div className="absolute top-4 right-4">
                    <input
                      type="checkbox"
                      checked={selectedMedicines.includes(medicine._id)}
                      onChange={() => handleCheckboxChange(medicine._id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No medicines found.</p>
        )}
      </div>

      {/* Delete All Button */}
      <button
        onClick={handleDeleteAll}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
      >
        Delete Selected
      </button>

      {showPrompt && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
          <p>Are you sure you want to delete the selected medicines?</p>
          <button
            onClick={confirmDelete}
            className="mr-4 mt-2 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
          >
            Confirm
          </button>
          <button
            onClick={cancelDelete}
            className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageMedicine;

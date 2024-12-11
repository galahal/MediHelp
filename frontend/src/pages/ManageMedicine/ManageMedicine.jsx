import React, { useState, useEffect } from "react";

const ManageMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
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
              {/* Medicine Details */}
              <h2 className="text-lg font-bold text-gray-800">{medicine.name}</h2>
              <p className="text-sm text-gray-600">Category: {medicine.category}</p>
              <p className="text-sm text-gray-600">Price: ${medicine.price}</p>
              <p className="text-sm text-gray-600">Stock: {medicine.stock} units</p>

              {/* Checkbox (Right-Aligned) */}
              <div className="absolute top-4 right-4">
                <input
                  type="checkbox"
                  checked={selectedMedicines.includes(medicine._id)}
                  onChange={() => handleCheckboxChange(medicine._id)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-400 border-gray-300 rounded"
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleIndividualDelete(medicine._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No medicines found.</p>
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
            <p className="mb-4 text-lg font-semibold">Are you sure you want to delete the selected medicines?</p>
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

export default ManageMedicine;

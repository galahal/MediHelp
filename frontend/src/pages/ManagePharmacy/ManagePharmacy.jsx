import React, { useState, useEffect } from "react";

const ManagePharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [selectedPharmacies, setSelectedPharmacies] = useState([]);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    contact: "",
    isEmergency: false,
    area: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [selectedArea, setSelectedArea] = useState("All");
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

  const applyFilters = (query, emergencyFilter, area) => {
    let filtered = pharmacies;

    if (query) {
      filtered = filtered.filter((pharmacy) =>
        pharmacy.name.toLowerCase().includes(query)
      );
    }

    if (emergencyFilter) {
      filtered = filtered.filter((pharmacy) => pharmacy.isEmergency);
    }

    if (area !== "All") {
      filtered = filtered.filter((pharmacy) => pharmacy.area === area);
    }

    setFilteredPharmacies(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, filterEmergency, selectedArea);
  };

  const handleToggleEmergency = () => {
    const newFilter = !filterEmergency;
    setFilterEmergency(newFilter);
    applyFilters(searchQuery, newFilter, selectedArea);
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    applyFilters(searchQuery, filterEmergency, area);
  };

  const handleCheckboxChange = (id) => {
    setSelectedPharmacies((prev) =>
      prev.includes(id) ? prev.filter((pharmacyId) => pharmacyId !== id) : [...prev, id]
    );
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
      const remaining = pharmacies.filter(
        (pharmacy) => !selectedPharmacies.includes(pharmacy._id)
      );
      setPharmacies(remaining);
      setFilteredPharmacies(remaining);
      setSelectedPharmacies([]);
      setShowPrompt(false);
      window.location.reload(); // Add this line
    } catch (error) {
      console.error("Error deleting pharmacies:", error);
    }
  };

  const cancelDelete = () => setShowPrompt(false);

  const handleIndividualDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/pharmacy/${id}`, {
        method: "DELETE",
      });
      const remaining = pharmacies.filter((pharmacy) => pharmacy._id !== id);
      setPharmacies(remaining);
      setFilteredPharmacies(remaining);
      window.location.reload(); // Add this line
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
    }
  };

  const handleEditClick = (pharmacy) => {
    setEditingPharmacy(pharmacy._id);
    setEditForm({
      name: pharmacy.name,
      address: pharmacy.address,
      contact: pharmacy.contact,
      isEmergency: pharmacy.isEmergency,
      area: pharmacy.area,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacy/${editingPharmacy}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedPharmacy = await response.json();
        const updatedList = pharmacies.map((pharmacy) =>
          pharmacy._id === editingPharmacy ? updatedPharmacy : pharmacy
        );
        setPharmacies(updatedList);
        setFilteredPharmacies(updatedList);
        setEditingPharmacy(null);
        window.location.reload(); // Add this line
      } else {
        console.error("Error updating pharmacy");
      }
    } catch (error) {
      console.error("Error updating pharmacy:", error);
    }
  };

  if (loading) return <div>Loading pharmacies...</div>;
  if (error) return <div>Error: {error}</div>;

  const areas = ["All", ...new Set(pharmacies.map((pharmacy) => pharmacy.area))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Pharmacies</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a pharmacy..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={handleToggleEmergency}
          className={`px-4 py-2 rounded text-white ${
            filterEmergency ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {filterEmergency ? "Show All" : "Show Emergency Only"}
        </button>

        <select value={selectedArea} onChange={handleAreaChange} className="p-2 border rounded">
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPharmacies.map((pharmacy) => (
          <div key={pharmacy._id} className="bg-white p-4 rounded shadow">
            {editingPharmacy === pharmacy._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="contact"
                  value={editForm.contact}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Contact"
                />
                <input
                  type="text"
                  name="area"
                  value={editForm.area}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Area"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isEmergency"
                    checked={editForm.isEmergency}
                    onChange={handleEditChange}
                  />
                  Emergency?
                </label>
                <button onClick={handleEditSubmit} className="bg-green-500 text-white mt-2 p-2 rounded">
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold">{pharmacy.name}</h2>
                <p>Address: {pharmacy.address}</p>
                <p>Contact: {pharmacy.contact}</p>
                <p>Emergency: {pharmacy.isEmergency ? "Yes" : "No"}</p>
                <p>Area: {pharmacy.area}</p>
                <button onClick={() => handleEditClick(pharmacy)} className="mt-4 bg-blue-500 text-white p-2 rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleIndividualDelete(pharmacy._id)}
                  className="mt-2 bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white py-2 px-6 rounded"
          disabled={selectedPharmacies.length === 0}
        >
          Delete Selected
        </button>
      </div>

      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded text-center">
            <p>Are you sure you want to delete the selected pharmacies?</p>
            <div className="mt-4 flex justify-around">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={cancelDelete} className="bg-blue-500 text-white px-4 py-2 rounded">
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




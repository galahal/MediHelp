import React from 'react';

export default function Thumbnails({ medicines }) {
  console.log('Medicines passed to Thumbnails:', medicines); // Debugging log

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {medicines.map((medicine) => {
        const imageUrl = `/medicines/${medicine.imageUrl}`;

        return (
          <div key={medicine._id} className="relative p-4 border rounded shadow-md">
            {/* Image with object-fit: contain */}
            <img
              src={imageUrl}
              alt={medicine.name}
              className="w-full h-40 object-contain rounded mb-4"
            />
            
            {/* Medicine Details */}
            <h2 className="text-xl font-semibold">
              {medicine.name}
              <span className="text-sm text-gray-600 ml-2">({medicine.generics})</span>
            </h2>
            <p className="text-gray-600">{medicine.brand}</p>
            <p className="text-gray-800 font-bold">BDT {medicine.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{medicine.description}</p>

            {/* Medicine Tags (bottom-right corner) */}
            <div className="absolute bottom-4 right-4 bg-blue-500 text-white text-xs py-1 px-2 rounded-md">
              {medicine.tags.join(', ')}
            </div>
          </div>
        );
      })}
    </div>
  );
}

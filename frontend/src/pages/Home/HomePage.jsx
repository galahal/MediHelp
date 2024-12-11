// /* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useReducer } from 'react'
// import { getAll } from '../../services/medicineService';
// import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx';

// const initialState = { medicines: [] };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'MEDICINES_LOADED':
//       return { ...state, medicines: action.payload };
//     default:
//       return state;
//   }
// };

// export default function HomePage() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { medicines } = state;

//   useEffect(() => {
//     getAll().then(medicines => dispatch({ type: 'MEDICINES_LOADED', payload: medicines}));
//   }, []);

//   return (<>
//     <Thumbnails medicines={medicines} />
//   </>
//   );
// }

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars


// import React, { useEffect, useReducer } from 'react';
// import { getAll } from '../../services/medicineService'; // Service to fetch medicines
// import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx'; // Component to display medicines

// const initialState = { medicines: [] };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'MEDICINES_LOADED':
//       return { ...state, medicines: action.payload };
//     default:
//       return state;
//   }
// };

// export default function HomePage() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { medicines } = state;

//   useEffect(() => {
//     // Fetch medicines and update the state
//     getAll()
//       .then(medicines => {
//         dispatch({ type: 'MEDICINES_LOADED', payload: medicines });
//       })
//       .catch(error => {
//         console.error('Error fetching medicines:', error);
//       });
//   }, []);

//   return (
//     <div className="homepage-container">
//       <h1 className="text-2xl font-bold text-center my-4">Available Medicines</h1>
//       {medicines.length > 0 ? (
//         <Thumbnails medicines={medicines} /> // Pass medicines to Thumbnails component
//       ) : (
//         <p className="text-center text-gray-500">No medicines available.</p> // Fallback message
//       )}
//     </div>
//   );
// }



import React, { useEffect, useReducer } from 'react';
import { getAll } from '../../services/medicineService'; // Service to fetch medicines
import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx'; // Component to display medicines
import { Link } from 'react-router-dom';

const initialState = { medicines: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'MEDICINES_LOADED':
      return { ...state, medicines: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { medicines } = state;

  useEffect(() => {
    // Fetch medicines and update the state
    getAll()
      .then(medicines => {
        dispatch({ type: 'MEDICINES_LOADED', payload: medicines });
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
      });
  }, []);

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="bg-blue-200 p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-800">MediHelp</div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Medicines Section */}
      <div className="my-8">
        <h1 className="text-2xl font-bold text-center my-4">Available Medicines</h1>
        {medicines.length > 0 ? (
          <Thumbnails medicines={medicines} /> // Pass medicines to Thumbnails component
        ) : (
          <p className="text-center text-gray-500">No medicines available.</p> // Fallback message
        )}
      </div>
    </div>
  );
}

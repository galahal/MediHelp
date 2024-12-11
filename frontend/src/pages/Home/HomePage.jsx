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
import React, { useEffect, useReducer } from 'react';
import { getAll } from '../../services/medicineService'; // Service to fetch medicines
import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx'; // Component to display medicines

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
      <h1 className="text-2xl font-bold text-center my-4">Available Medicines</h1>
      {medicines.length > 0 ? (
        <Thumbnails medicines={medicines} /> // Pass medicines to Thumbnails component
      ) : (
        <p className="text-center text-gray-500">No medicines available.</p> // Fallback message
      )}
    </div>
  );
}

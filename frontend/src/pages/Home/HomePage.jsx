// // /* eslint-disable no-unused-vars */
// // // eslint-disable-next-line no-unused-vars
// // import React, { useEffect, useReducer } from 'react'
// // import { getAll } from '../../services/medicineService';
// // import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx';

// // const initialState = { medicines: [] };

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case 'MEDICINES_LOADED':
// //       return { ...state, medicines: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // export default function HomePage() {
// //   const [state, dispatch] = useReducer(reducer, initialState);
// //   const { medicines } = state;

// //   useEffect(() => {
// //     getAll().then(medicines => dispatch({ type: 'MEDICINES_LOADED', payload: medicines}));
// //   }, []);

// //   return (<>
// //     <Thumbnails medicines={medicines} />
// //   </>
// //   );
// // }

// /* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars


// // import React, { useEffect, useReducer } from 'react';
// // import { getAll } from '../../services/medicineService'; // Service to fetch medicines
// // import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx'; // Component to display medicines

// // const initialState = { medicines: [] };

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case 'MEDICINES_LOADED':
// //       return { ...state, medicines: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // export default function HomePage() {
// //   const [state, dispatch] = useReducer(reducer, initialState);
// //   const { medicines } = state;

// //   useEffect(() => {
// //     // Fetch medicines and update the state
// //     getAll()
// //       .then(medicines => {
// //         dispatch({ type: 'MEDICINES_LOADED', payload: medicines });
// //       })
// //       .catch(error => {
// //         console.error('Error fetching medicines:', error);
// //       });
// //   }, []);

// //   return (
// //     <div className="homepage-container">
// //       <h1 className="text-2xl font-bold text-center my-4">Available Medicines</h1>
// //       {medicines.length > 0 ? (
// //         <Thumbnails medicines={medicines} /> // Pass medicines to Thumbnails component
// //       ) : (
// //         <p className="text-center text-gray-500">No medicines available.</p> // Fallback message
// //       )}
// //     </div>
// //   );
// // }



// import React, { useEffect, useReducer } from 'react';
// import { getAll } from '../../services/medicineService'; // Service to fetch medicines
// import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx'; // Component to display medicines
// import { Link } from 'react-router-dom';

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
//       {/* Navbar */}
//       <nav className="bg-blue-200 p-4 flex justify-between items-center">
//         <div className="text-xl font-semibold text-blue-800">MediHelp</div>
//         <div className="flex space-x-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Register
//           </Link>
//         </div>
//       </nav>

//       {/* Medicines Section */}
//       <div className="my-8">
//         <h1 className="text-2xl font-bold text-center my-4">Available Medicines</h1>
//         {medicines.length > 0 ? (
//           <Thumbnails medicines={medicines} /> // Pass medicines to Thumbnails component
//         ) : (
//           <p className="text-center text-gray-500">No medicines available.</p> // Fallback message
//         )}
//       </div>
//     </div>
//   );
// }

import MediHelpLogo from "../../assets/dddw.jpeg";
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
        {/* Logo with text */}
        <div className="flex items-center space-x-2">
          <img
            src={MediHelpLogo} // Add your logo path here
            alt="MediHelp Logo"
            className="h-8" // Adjust the height as needed
          />
          <span className="text-xl font-semibold text-blue-800">MediHelp</span>
        </div>
        {/* Navbar Links */}
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

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">MediHelp</h2>
            <p>Connect with our specialist doctors anytime, anywhere.</p>
          </div>
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:underline">Return and Refund Policy</Link></li>
            </ul>
          </div>
          {/* Useful Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/account" className="hover:underline">Account</Link></li>
              <li><Link to="/register-pharmacy" className="hover:underline">Register the Pharmacy</Link></li>
              <li><Link to="/special-offers" className="hover:underline">Special Offers</Link></li>
            </ul>
          </div>
          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <p>Address: D/15-1, Road-36, Block-D, Section-10, Mirpur, Dhaka-1216</p>
            <p>Hotline: 09610016778</p>
            <p>Whatsapp: 01810-117100</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-white"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-white"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-white"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-white"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

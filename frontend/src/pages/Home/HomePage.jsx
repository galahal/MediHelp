/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useReducer } from 'react'
import { getAll } from '../../services/medicineService';
import Thumbnails from '../../components/Thumbnails/Thumbnails.jsx';

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
    getAll().then(medicines => dispatch({ type: 'MEDICINES_LOADED', payload: medicines}));
  }, []);

  return (<>
    <Thumbnails medicines={medicines} />
  </>
  );
}

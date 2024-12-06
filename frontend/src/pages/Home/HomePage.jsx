import React, { useEffect, useReducer } from 'react'
import { getAll } from '../../services/medicineService';

const initialState = { foods: [] };

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

  return <div>HomePage</div>;
}

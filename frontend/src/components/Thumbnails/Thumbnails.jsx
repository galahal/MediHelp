import React from 'react';
import { Link } from "react-router-dom";
import classes from "./thumbnails.module.css";
import StarRating from '../StarRating/StarRating';

export default function Thumbnails({ medicines }) {
  return (
    <ul className={classes.list}>
      {medicines.map(medicine => (
        <li key={medicine.id}>
          <Link to={`/medicine/${medicine.id}`}>
            <img 
              className={classes.image}
              src={`/medicines/${medicine.imageUrl}`}
              alt={medicine.name} 
            />
          </Link>
          <div className={classes.content}>
            <div className={classes.name}>{medicine.name}</div>
            <span
              className={`${classes.favorite} ${
                medicine.favorite ? '' : classes.content
              }`}
            >
              ❤
            </span>
            <div className={classes.stars}>
              <StarRating stars={medicines.stars} />
            </div>
            <div className={classes.product_item_footer}>
              <div className={classes.brand}>
                <span>{medicine.brand}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
